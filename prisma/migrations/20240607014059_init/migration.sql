-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR,
    "is_premium" BOOLEAN,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "nonce" BIGINT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR,
    "chain" VARCHAR,
    "token" VARCHAR,
    "hash" VARCHAR,
    "amount" DOUBLE PRECISION,
    "status" VARCHAR,
    "create_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);
