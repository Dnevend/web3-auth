declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        INFURA_API_KEY?: string
        RECEIVE_ADDRESS_ETH?: string
    }
}