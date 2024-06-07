import { Request, Response } from "express";
import prisma from "../config/db";
import { SiweMessage, generateNonce } from "siwe";
import { ethers } from "ethers";
const jwt = require('jsonwebtoken')

const init = async (req: Request, res: Response) => {
    const { address, domain, statement, uri, version, chainId } = req.body

    try {
        const result = await prisma.addresses.findFirst({ where: { address: { equals: address } } })

        const nonce = generateNonce()

        const siweMessage = new SiweMessage({
            domain,
            address,
            statement,
            uri,
            version,
            nonce,
            chainId
        })

        if (result === null) {
            const addressData = {
                address,
                nonce
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
                    nonce
                }
            })
        }

        res.success({ message: siweMessage.prepareMessage() })
    } catch (error) {
        res.error(error as string)
    }
}

const verify = async (req: Request, res: Response) => {
    const { message, signature } = req.body

    try {
        const siweMessage = new SiweMessage(message)
        const recoveredAddress = ethers.verifyMessage(siweMessage.prepareMessage(), signature)
        if (recoveredAddress.toLocaleLowerCase() !== siweMessage.address.toLocaleLowerCase()) {
            return res.error('Invalid signature', 400)
        }

        const token = jwt.sign({ address: siweMessage.address }, process.env.JWT_SECRET, { expiresIn: '2h' })

        res.success({ token })
    } catch (error) {
        res.error('Failed to verify', 400)
    }
}

const me = async (req: Request, res: Response) => {
    try {
        const data = await prisma.addresses.findFirst({ where: { address: { equals: req.address } } })

        res.success({ ...data })
    } catch (error) {
        res.error(error as string)
    }
}

export default { init, verify, me }