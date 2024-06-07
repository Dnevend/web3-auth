import { NextFunction, Request, Response } from 'express'

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {

    res.success = (data: any, code = 200, msg = 'Success') => {
        res.status(code).json({ code, msg, data })
    }

    res.error = (code = 500, msg = 'Internal Server Error', data = null) => {
        res.status(code).json({ code, msg, data })
    }

    next()
}

declare global {
    namespace Express {
        interface Response {
            success: (data: any, code?: number, msg?: string) => void;
            error: (code?: number, msg?: string, data?: any) => void;
        }
    }
}

export default responseMiddleware;