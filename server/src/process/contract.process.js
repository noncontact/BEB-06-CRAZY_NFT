require('dotenv').config();
const path = require("path")
const fs = require("fs")
const os = require("os");
const envfile = require('envfile')
const sourcePath = path.join(__dirname, '..', '..', '/.env');

const { SERVER_ACCOUNT, ACCOUNT_SECRET_KEY, KIP7_CONTRACT_ADDRESS} = process.env;
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')


const KIP7_jsonFile = fs.readFileSync(path.join(__dirname, '..', '..', '/build/contracts/KIP7Token.json'), 'utf8'); // 변경 필요
const KIP7_jsonData = JSON.parse(KIP7_jsonFile);

// const CaverExtKAS = require('caver-js-ext-kas')
// const caver_kas = new CaverExtKAS(1001, 'KASK4UC529N23IT0BUGXOXRS', 'z-r02cIl3QfFW_mIq-1LUFjVoWJrRXs3gTYCoGWI')

const CaverExtKAS = require('caver-js-ext-kas');
const caver_kas = new CaverExtKAS();
const accessKey = '';
const secretKey = '';
caver_kas.initKASAPI(1001, accessKey, ACCOUNT_SECRET_KEY);
console.log(accessKey);

const readEnvVars = () => fs.readFileSync(sourcePath, "utf-8").split(os.EOL);



const getEnvValue = (key) => {
    
    // find the line that contains the key (exact match)
    const matchedLine = readEnvVars().find((line) => line.split("=")[0] === key);
    console.log(matchedLine);
    // split the line (delimiter is '=') and return the item at index 2
    return matchedLine !== undefined ? matchedLine.split("=")[1] : null;
  };

function setEnvValue(key, value) {

    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync(sourcePath, "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `${key}=${value}`);

    // write everything back to the file system
    fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));

}

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
       const result = caver.klay.accounts.wallet.add(ACCOUNT_SECRET_KEY, SERVER_ACCOUNT);
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
    //console.log(getEnvValue('KIP7_CONTRACT_ADDRESS'));

    //parsedFile.NEW_VAR = 'newVariableValue'
    //fs.writeFileSync('./.env', envfile.stringifySync(parsedFile)) 

    const kip7Instance = await new caver.klay.KIP7(KIP7_CONTRACT_ADDRESS)
    const balance = await kip7Instance.balanceOf(SERVER_ACCOUNT)
    console.log(balance);
    const name = await kip7Instance.symbol();
    console.log(name);
    let tx_hash = await kip7Instance.transfer('0x723c3659772Fe80284793C6a20bff9071bc683F6', 100000000000000000000, { from: SERVER_ACCOUNT })
    //let tx_hash_  = await kip7Instance.mint('0x723c3659772Fe80284793C6a20bff9071bc683F6', 1000000000000000000000, { from: SERVER_ACCOUNT })
    //tx_hash_  = await kip7Instance.burn(1000000000000000000000, { from: SERVER_ACCOUNT })
    console.log(tx_hash);
    const hash = await caver.klay.getTransactionBySenderTxHash(tx_hash.senderTxHash);
    console.log(hash);
    const hash_ = await caver.klay.getTransactionReceipt(tx_hash.transactionHash)
    console.log(hash_);
}


exports.transmit_Token = async(address) => {

}

exports.DeployNFT = async(club_id, meta_cid, deploy_count) => {

}

exports.MintNFT = async(address) => {
    
}