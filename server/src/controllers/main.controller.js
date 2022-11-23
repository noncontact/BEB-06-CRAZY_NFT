const contract_proc = require("../process/contract.process");

exports.main_get = async(req, res, next) => {

    const result = await contract_proc.testKIP17();
    //res.status(200).send(result);
    res.status(200).send("Hello BEB-06-OPST");
    
}
