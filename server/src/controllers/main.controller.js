const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const contract_proc = require("../process/contract.process");

exports.main_get = async(req, res, next) => {

    const result = await contract_proc.testFunction();
    //res.status(200).send("Hello BEB-06-OPST");
    res.status(200).send(result);
}