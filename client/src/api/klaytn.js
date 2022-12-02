import axios from "axios";

export default test = () => {
  var data = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "klay_getBalance",
    params: ["0x844C94873CC246D572d0fA89cf873146D81885eB", "latest"],
  });

  var config = {
    method: "post",
    url: "https://node-api.klaytnapi.com/v1/klaytn",
    headers: {
      "x-chain-id": "1001",
      Authorization:
        "Basic S0FTS1JKTjk5VFI5TUpZRks5U0FSVDNOOnoyclAyT3I0QTFGUzZ3bU1mWXMxSkt2T3g3VlN6NnFZTGtEWk1FTGk=",
      "Content-Type": "application/json",
    },
    data: data,
    json: true,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
