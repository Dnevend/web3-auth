import { Request, Response } from "express";
import prisma from "../config/db";

const login = async (req: Request, res: Response) => {
    const { address } = req.query as { address: string }

    const result = await prisma.addresses.findFirst({ where: { address: { equals: address } } })

    const nonce = Math.floor(Math.random() * 10000000)

    if (result === null) {
        const addressData = {
            address,
            is_premium: false,
            nonce: BigInt(nonce)
        }
        await prisma.addresses.create({ data: addressData })
    } else {
        await prisma.addresses.updateMany({
            where: {
                address: {
                    equals: address
                }
            },
            data: {
                nonce: BigInt(nonce)
            }
        })
    }

    res.success({ nonce })
}

const me = async (req: Request, res: Response) => {
    res.send('ok')
}

export default { login, me }