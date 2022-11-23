require('dotenv').config();
const fs = require("fs")
const path = require("path")
const env = require('./env.process')

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

const { SERVER_ACCOUNT, ACCOUNT_SECRET_KEY, KIP7_CONTRACT_ADDRESS, CHAIN_ID, ACCESS_KEY_ID, SECRECT_ACCESS_KEY, KIP17_CONTRACT_ADDRESS} = process.env;

const KIP7_jsonFile = fs.readFileSync(path.join(__dirname, '..', '..', '/build/contracts/KIP7Token.json'), 'utf8'); // 변경 필요
const KIP7_jsonData = JSON.parse(KIP7_jsonFile);

const CaverExtKAS = require('caver-js-ext-kas')
const caver_kas = new CaverExtKAS(Number(CHAIN_ID), ACCESS_KEY_ID, SECRECT_ACCESS_KEY)

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

    const account_info = await caver.klay.accounts.wallet.getAccount(SERVER_ACCOUNT)
    if(typeof account_info === 'undefined')
    {
       const result = await caver.klay.accounts.wallet.add(ACCOUNT_SECRET_KEY, SERVER_ACCOUNT);
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

    const kip7Instance = await new caver.klay.KIP7(KIP7_CONTRACT_ADDRESS)
    const balance = await kip7Instance.balanceOf(SERVER_ACCOUNT)
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

    const account_info = await caver.klay.accounts.wallet.getAccount(SERVER_ACCOUNT)
    if(typeof account_info === 'undefined')
    {
       const result = await caver.klay.accounts.wallet.add(ACCOUNT_SECRET_KEY, SERVER_ACCOUNT);
       console.log(result.privateKey);     
    }

    // const result = await caver.klay.KIP17.deploy({
    //     name: 'JM LEB',
    //     symbol: 'JMB',
    // }, SERVER_ACCOUNT);

    const kip17Instance = new caver.klay.KIP17(KIP17_CONTRACT_ADDRESS)
    //console.log(kip17Instance);

    // const num = await kip17Instance.totalSupply()
    // console.log(num);
    // const tokenURI = `ipfs://QmPEskugK8WPMBnRDGxF9qxppNChFZmFPxXM6RNfAKFcDN/${Number(num)+1}.json`;
    // console.log(tokenURI);
    // const res = await kip17Instance.mintWithTokenURI('0x723c3659772Fe80284793C6a20bff9071bc683F6', Number(num)+1, tokenURI, { from: SERVER_ACCOUNT });
    // console.log(res);

    const token_uri = await kip17Instance.tokenURI(9);
    console.log(token_uri);
}

exports.transmit_Token = async(address) => {

}

exports.DeployNFT = async(club_id, meta_cid, deploy_count) => {
    return "success" 
}

exports.MintNFT = async(address) => {
    
}