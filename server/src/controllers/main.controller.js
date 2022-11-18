const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

exports.main_get = async(req, res, next) => {
    res.status(200).send("Hello BEB-06-OPST");
}