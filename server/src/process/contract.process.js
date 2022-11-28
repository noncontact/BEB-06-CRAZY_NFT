const env = require('./env.process')
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

//const { SERVER_ACCOUNT, ACCOUNT_SECRET_KEY, KIP7_CONTRACT_ADDRESS, CHAIN_ID, ACCESS_KEY_ID, SECRECT_ACCESS_KEY, KIP17_CONTRACT_ADDRESS} = process.env;

const CaverExtKAS = require('caver-js-ext-kas')
const caver_kas = new CaverExtKAS(Number(process.env.CHAIN_ID), process.env.ACCESS_KEY_ID, process.env.SECRECT_ACCESS_KEY)

exports.testFunction = async()=> {

    // Read keystore json file
    //const keystore = await fs.readFileSync(ACCOUNT_KEY_STORE_PATH, 'utf8')

    // Decrypt keystore
    //console.log(keystore)
    //const keyring = await caver.wallet.keyring.decrypt(keystore, KEY_STORE_PWD)
    //const keyring = await caver.wallet.keyring.createFromPrivateKey(ACCOUNT_SECRET_KEY)
    //console.log(keyring)

    // const contractInstance = await caver.contract.create(KIP7_jsonData.abi, KIP7_CONTRACT_ADDRESS)
    // console.log(contractInstance)
    // console.log(contractInstance.options.address)

    // You can also generate a private key directly via
    // const keyring = caver.wallet.keyring.generate()

    //// Add to caver.wallet
    //caver.wallet.add(keyring)

    // //return keyring;
    // // Create value transfer transaction
    // const vt = caver.transaction.valueTransfer.create({
    //     from: keyring.address,
    //     to: '0x723c3659772Fe80284793C6a20bff9071bc683F6',
    //     value: caver.utils.toPeb(10, 'KLAY'),
    //     gas: 25000,
    // })

    // // Sign to the transaction
    // const signed = await caver.wallet.sign(keyring.address, vt)

    // // Send transaction to the Klaytn blockchain platform (Klaytn)
    // const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    // console.log(receipt)

    //const deployer = await caver.wallet.keyring.createFromPrivateKey(ACCOUNT_SECRET_KEY)

    const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
    if(typeof account_info === 'undefined')
    {
       const result = await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
       console.log(result.privateKey);     
    }


    // const contractInstance = await caver.contract.create(KIP7_jsonData.abi)
    //    console.log(contractInstance) 
    // const deployedInstance = await contractInstance.deploy({
    //     name: "jm lab token",
    //     symbol: 'JLT',
    //     decimals: 18,
    //     initialSupply:20
    // }, KIP7_jsonData.bytecode)

    // console.log(deployedInstance)
    // console.log(deployedInstance.options.address)

    //return deployedInstance.options.address;

    // const deployedInstance = await caver.klay.KIP7.deploy({
    //     name: 'Jasmine',
    //     symbol: 'JQS',
    //     decimals: 18,
    //     initialSupply: '100000000000000000000000',
    // }, SERVER_ACCOUNT);

    //setEnvValue('KIP7_CONTRACT_ADDRESS', deployedInstance.options.address)
    console.log(env.getEnvValue('KIP7_CONTRACT_ADDRESS'));

    //parsedFile.NEW_VAR = 'newVariableValue'
    //fs.writeFileSync('./.env', envfile.stringifySync(parsedFile)) 

    const kip7Instance = await new caver.klay.KIP7(process.env.KIP7_CONTRACT_ADDRESS)
    const balance = await kip7Instance.balanceOf(process.env.SERVER_ACCOUNT)
    console.log(balance);

    const result_ = await caver_kas.kas.tokenHistory.getTransferHistoryByTxHash(
        "0x42fa4522425f2384ffad520226318df645d8a4144cc2c744937286dae432036c"
      );
      console.log(result_);
      console.log(result_.items[0].value);
    var dec = parseInt(result_.items[0].value, 16);
    console.log(dec);
    // const name = await kip7Instance.symbol();
    // console.log(name);
    //let tx_hash = await kip7Instance.transfer('0x723c3659772Fe80284793C6a20bff9071bc683F6', 10000000000000000000, { from: SERVER_ACCOUNT })
    // //let tx_hash_  = await kip7Instance.mint('0x723c3659772Fe80284793C6a20bff9071bc683F6', 1000000000000000000000, { from: SERVER_ACCOUNT })
    // //tx_hash_  = await kip7Instance.burn(1000000000000000000000, { from: SERVER_ACCOUNT })
    //console.log(tx_hash);
    // const hash = await caver.klay.getTransactionBySenderTxHash(tx_hash.senderTxHash);
    // console.log(hash);
    // const hash_ = await caver.klay.getTransactionReceipt(tx_hash.transactionHash)
    // console.log(hash_);

    //const caver_ = new CaverExtKAS();
    //caver_.initKASAPI(CHAIN_ID, ACCESS_KEY_ID, SECRECT_ACCESS_KEY);
    //const data = await caver_.rpc.klay.getAccount("0x723c3659772Fe80284793C6a20bff9071bc683F6");
    //var dec = parseInt(data.account.balance, 16);
    //console.log(balance);
}

exports.testKIP17 = async()=> {

    const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
    if(typeof account_info === 'undefined')
    {
       const result = await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
       console.log(result.privateKey);     
    }

    // const result = await caver.klay.KIP17.deploy({
    //     name: 'JM LEB',
    //     symbol: 'JMB',
    // }, SERVER_ACCOUNT);

    const kip17Instance = new caver.klay.KIP17(process.env.KIP17_CONTRACT_ADDRESS)
    //console.log(kip17Instance);

    let num = await kip17Instance.totalSupply()
    console.log(num);
    num = Number(num);
    //const tokenURI = `ipfs://QmPEskugK8WPMBnRDGxF9qxppNChFZmFPxXM6RNfAKFcDN/${Number(num)+1}.json`;
    const tokenURI = `ipfs://bafybeiegj3f5akt7xr7sp3ql57djvs2owwcmrdnqj2oc4d6hrd6xgnirca/1.json`;
    
    console.log(tokenURI);
    const res = await kip17Instance.mintWithTokenURI('0x723c3659772Fe80284793C6a20bff9071bc683F6', Number(num)+1, tokenURI, { from: process.env.SERVER_ACCOUNT });
    console.log(res);

    const token_uri = await kip17Instance.tokenURI(9);
    console.log(token_uri);
}

exports.kip7_Deploy = async() => {
    try {
        // 현재 서버의 지갑에 계정이 등록이 되었는지 확인하고 그렇지 않으면 계정을 등록한다
        const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
        if(typeof account_info === 'undefined')
        {
           await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
        }

        // 환경 설정 파일에 KIP7 의 Contract Address 가 없으면 아직 발행을 하지 않은것으로 판단하여 토큰을 발행
        const result = env.getEnvValue('KIP7_CONTRACT_ADDRESS')
        if(typeof result === "undefined") {
            // 플렛폼 내부에서 통용되는 PCT 토큰을 서버계정을 통해 발행한다. 발행량은 10,000,000 PCT
            const deployedInstance = await caver.klay.KIP7.deploy({
                name: 'Project Crazy Token',
                symbol: 'PCT',
                decimals: 18,
                initialSupply: '10000000000000000000000000',
            }, process.env.SERVER_ACCOUNT);

            // 발행한 KIP 7 token(PCT) 에 대해 .env 환경 설정 파일에 저장한다.
            env.setEnvValue('KIP7_CONTRACT_ADDRESS', deployedInstance.options.address)
            console.log(env.getEnvValue('KIP7_CONTRACT_ADDRESS'));
            return deployedInstance.options.address;
        }
        else {
            // KIP7 Instance 에 연결하고 해당 서버 계정에 PCT 토큰의 잔고를 확인한다. 
            const kip7Instance = await new caver.klay.KIP7(process.env.KIP7_CONTRACT_ADDRESS)
            var balance = await kip7Instance.balanceOf(process.env.SERVER_ACCOUNT)
            console.log(balance);
            // 잔고가 100 PCT 이하이면 서버 계정으로 추가 민팅 
            if(balance <= 100000000000000000000) {
                await kip7Instance.mint(process.env.SERVER_ACCOUNT, 1000000000000000000000000, { from: process.env.SERVER_ACCOUNT })
                balance = await kip7Instance.balanceOf(process.env.SERVER_ACCOUNT)
                console.log(balance);
            }
            return process.env.KIP7_CONTRACT_ADDRESS;
        }
    }
    catch(err) {
        return err;
    }
}

exports.transmit_Token = async(address) => {
    try {
        // 현재 서버의 지갑에 계정이 등록이 되었는지 확인하고 그렇지 않으면 계정을 등록한다
        const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
        if(typeof account_info === 'undefined')
        {
           await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
        }
        // 클라이언트에게 보상으로 발행하는 토큰(PCT)으로 100PCT를 전송한다.
        const kip7Instance = await new caver.klay.KIP7(process.env.KIP7_CONTRACT_ADDRESS)
        let tx_hash  = await kip7Instance.mint(address, 100000000000000000000, { from: process.env.SERVER_ACCOUNT })
        const data = {
            msg : "success",
            value : tx_hash
        }
        return data;
    }
    catch(err) {
        const data = {
            msg : "fail",
            value : err
        }
        return data;
    }
}

exports.DeployNFT = async(nft_name, nft_symbol) => {
    try {
        // 현재 서버의 지갑에 계정이 등록이 되었는지 확인하고 그렇지 않으면 계정을 등록한다.
        const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
        if(typeof account_info === 'undefined')
        {
            await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
        }

        // nft 를 발행(deploy)한다. 각 클럽에 정의한 name, symbol을 적용한다.
        const result = await caver.klay.KIP17.deploy({
            name: nft_name,
            symbol: nft_symbol,
        }, process.env.SERVER_ACCOUNT);

        // caver.klay.KIP17.deploy({
        //     name: nft_name,
        //     symbol: nft_symbol,
        // }, process.env.SERVER_ACCOUNT)
        // .on('error', function(error) { return error; })
        // .on('transactionHash', function(transactionHash) { result_Obj.tx_hash = transactionHash })
        // .on('receipt', function(receipt) {
        //     console.log(receipt.contractAddress) // contains the new token contract address
        //     result_Obj.contract_add = receipt.contractAddress;
        // })
        // .then(function(newKIP17Instance) {
        //     console.log(newKIP17Instance.options.address) // instance with the new token contract address
        // })
        const data = {
            msg : "success",
            value : result._address
        }
        return data
    }
    catch (err) {
        const data = {
            msg : "fail",
            value : err
        }
        return data;
    }
}

exports.getTokenTransCheck = async (address, tx_hash, nft_price) => {
    try {
        // 전송이력을 확인하기 위하여 KAS 를 사용한다. 클라이언트로 부터 수신받은 hash 로 트랜젝션을 추적한다.
        const result = await caver_kas.kas.tokenHistory.getTransferHistoryByTxHash(tx_hash);
    
        // 클라이언트에서 전송한 토큰량을 확인
        const dec = parseInt(result.items[0].value, 16);
        // 클라이언트의 계정을 확인
        const from = result.items[0].from;
        console.log(result.items[0].formattedValue, from);
        // 계정과 토큰량이 맞는지 확인
        if(address = from && result.items[0].formattedValue >= nft_price ) {
            console.log("ok")
            return "ok";
        }
        else {
            return "발행 조건에 맞지 않음"
        }
    }
    catch (err) {
        return err;
    }
}

exports.getNFTDeployCheck = async (contract_add, deploy_count) => {
    try {
        // 해당 클럽의 NFT Contract address 를 가져와 klay init 
        console.log(contract_add, deploy_count);
        const kip17Instance = new caver.klay.KIP17(contract_add)
        console.log(kip17Instance);
    
        // 전체 발행량을 조사
        let num = await kip17Instance.totalSupply()
        console.log(num);
        num = Number(num);

        // 발행량이 초과 되었는지 확인
        if(num <= deploy_count) {
            console.log("getNFTDeployCheck = ok")
            return "ok"
        }
        else 
        {
            return "발행량 초과"
        }
    }
    catch (err) {
        return err;
    }
}

exports.MintNFT = async(address, contract_add, tokenURI) => {
    try {
        // 현재 서버의 지갑에 계정이 등록이 되었는지 확인하고 그렇지 않으면 계정을 등록한다.
        const account_info = await caver.klay.accounts.wallet.getAccount(process.env.SERVER_ACCOUNT)
        if(typeof account_info === 'undefined')
        {
           const result = await caver.klay.accounts.wallet.add(process.env.ACCOUNT_SECRET_KEY, process.env.SERVER_ACCOUNT);
           console.log(result.privateKey);     
        }
    
        // 해당 nft contract address 에 대해 전체 발행량을 체크하고 민팅을 요청한 회원의 계정에 nft를 민팅한다
        const kip17Instance = new caver.klay.KIP17(contract_add)
        console.log(kip17Instance);
        const num = await kip17Instance.totalSupply()
        const res = await kip17Instance.mintWithTokenURI(address, Number(num)+1, tokenURI, { from: process.env.SERVER_ACCOUNT });
        console.log(res);
        // const token_uri = await kip17Instance.tokenURI(Number(num)+1);
        // console.log(token_uri);
        const data = {
            mag : "success",
            value : Number(num)+1
        }
        return data;
    }
    catch (err) {
        const data = {
            mag : "fail",
            value : err
        }
        return data;
    }
}