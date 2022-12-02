import axios from "axios";

const header = {
  "x-chain-id": "1001",
  Authorization:
    "Basic S0FTS1JKTjk5VFI5TUpZRks5U0FSVDNOOnoyclAyT3I0QTFGUzZ3bU1mWXMxSkt2T3g3VlN6NnFZTGtEWk1FTGk=",
  "Content-Type": "application/json",
};
// klay 잔고 조회
const getBalance = async (account) => {
  let data = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "klay_getBalance",
    params: [account, "latest"],
  });

  let config = {
    method: "post",
    url: "https://node-api.klaytnapi.com/v1/klaytn",
    headers: header,
    data: data,
    json: true,
  };

  const result = await axios(config);
  return result.data.result / 10e17;
};

// klay 잔고 조회
const getKIP7 = async (ca) => {
  let config = {
    method: "GET",
    url: `https://kip7-api.klaytnapi.com/v1/contract/${ca}`,
    headers: header,
    json: true,
  };

  const result = await axios(config);
  return {
    name: result.data.name,
    symbol: result.data.symbol,
    totalSupply: result.data.totalSupply / 10e17,
  };
};

export { getBalance, getKIP7 };
