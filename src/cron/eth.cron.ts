import pc from 'picocolors'
import { ethers } from 'ethers'
import cron from 'node-cron'
import dotenv from 'dotenv'
dotenv.config()

import { AcceptToken, OrderStatusEnum } from '../types/order';
import prisma from '../config/db';

const { RECEIVE_ADDRESS_ETH, INFURA_API_KEY } = process.env

if (!INFURA_API_KEY) {
    console.log(pc.red('Please config your INFURA_API_KEY in .env file !'))
}

const provider = new ethers.JsonRpcProvider(INFURA_API_KEY ? `https://sepolia.infura.io/v3/${INFURA_API_KEY}` : undefined);

const cronJob = cron.schedule('*/3 * * * * *', async () => {

    if (!RECEIVE_ADDRESS_ETH) {
        console.log(pc.red('Please config your RECEIVE_ADDRESS_ETH in .env file !'))
        return
    }

    try {
        const orders = await prisma.order.findMany({ where: { status: { equals: OrderStatusEnum.Pending } } })
        orders.forEach(async order => {
            if (!order.hash) return

            console.log(pc.green(`Process order: ${order.hash}`))

            const transaction = await provider.getTransaction(order.hash);
            if (!transaction) return

            const acceptToken = order.token as AcceptToken
            if (acceptToken === 'usdt-eth') {
                // const erc20Interface = getErc20Interface()

                // const parsedTransaction = erc20Interface.parseTransaction({
                //     data: transaction?.data,
                //     value: transaction?.value
                // })

                // const [toAddress, amount] = parsedTransaction?.args || []
                // TODO:
            }

            if (acceptToken === 'eth') {

                // 校验交易信息
                if (transaction?.from !== order.address || transaction.to !== RECEIVE_ADDRESS_ETH) {
                    await prisma.order.updateMany({
                        where: {
                            hash: order.hash,
                            address: order.address
                        }, data: {
                            status: OrderStatusEnum.Failed
                        }
                    })
                    return
                }

                const receipt = await provider.getTransactionReceipt(order.hash);
                if (receipt?.status === 1) {
                    await prisma.order.updateMany({
                        where: {
                            address: order.address,
                            hash: order.hash
                        },
                        data: {
                            status: OrderStatusEnum.Successful
                        }
                    })
                    await prisma.addresses.updateMany({
                        where: {
                            address: receipt.from
                        },
                        data: {
                            is_premium: true
                        }
                    })
                }
            }

        })

    } catch (error) {
        console.error(`Error fetching block: ${error}`);
    }
}, {
    // 初始时不启动
    scheduled: false
});

export default cronJob;
