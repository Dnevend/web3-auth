import { Request, Response } from "express";
import { HttpsProxyAgent } from "https-proxy-agent";
import axios from "axios";
import fakeUa from "fake-useragent";

const getEigenlayerAmounts = async (req: Request, res: Response) => {
  const { address } = req.query;

  try {
    const response = await axios.get(
      `https://checkeigen.byzantine.fi/api/getAmounts?address=${address}`
    );

    const data = response.data;

    res.success(data);
  } catch (error) {
    res.error(String(error));
  }
};

const getEigenlayerCredentials = async (req: Request, res: Response) => {
  const { address } = req.query;

  try {
    const proxyUrl = process.env.PROXY_URL;
    const proxyAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : undefined;

    const response = await axios.get(
      `https://claims.eigenfoundation.org/clique-eigenlayer-api-v2/campaign/eigenlayer/credentials?walletAddress=${address}`,
      {
        headers: {
          "user-agent": fakeUa(),
        },
        httpAgent: proxyAgent,
        httpsAgent: proxyAgent,
      }
    );

    const data = response.data;

    res.success(data);
  } catch (error) {
    res.error(String(error));
  }
};

export default { getEigenlayerAmounts, getEigenlayerCredentials };
