require('dotenv').config();
const { NFT_UPLOAD_PATH, NFT_IMG_WORK_PATH, NFT_BUILD_PATH} = process.env;
const basePath = process.cwd();
const contract_proc = require("../process/contract.process");
const file_proc = require("../process/file.process");
const { startCreating, buildSetup } = require(`${basePath}/hashilip_engine/src/main.js`);
const { updateConfig } = require(`${basePath}/hashilip_engine/src/update_info.js`);

// const express = require("express");
// const path = require("path");
// const app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

file_proc.makeFolder(NFT_IMG_WORK_PATH);

exports.main_get = async(req, res, next) => {

    const result = await contract_proc.kip7_Deploy();
    res.status(200).send(result);
    //res.status(200).send("Hello BEB-06-OPST");

    // await buildSetup();
    // await startCreating(15, "club_1234");

    // let dir_path = `${NFT_BUILD_PATH}/images`;
    // let cid = await file_proc.ipfs_dir_upload(dir_path)
    // console.log(cid);
    // const result = await updateConfig(cid, "jm Lab", "jm Lab NFT");
    // if(result === "success") {
    //     dir_path = `${NFT_BUILD_PATH}/json`;
    //     cid = await file_proc.ipfs_dir_upload(dir_path)
    //     console.log(cid);
    // }
    // res.status(200).send(cid);
 }

 exports.upload_post = async(req, res) => {
    try {
    // console check
    //console.log(req.file);
    req.files.map((data) => {
        console.log(data);
    });
    console.log(req.files);
    const {club_id, dir, total} = await req.body;
    console.log(club_id, dir, total);
    //const json = JSON.parse(req.body.data)
    res.status(201).send({
        message: "이미지 저장 성공",
        fileInfo: req.files
    })

    // const targetDir = `${NFT_IMG_WORK_PATH}/${json.club_id}/layer/${json.dir}`;
    // console.log(targetDir)
    // file_proc.makeFolder(targetDir);

    // const result = await file_proc.filesMove(NFT_UPLOAD_PATH, targetDir);
    // if(result === "success") {
    //     if(json.dir === json.total) {
    //         console.log("process nft");
    //     }
    // }
    //const result = await contract_proc.testKIP17();
    //res.status(200).send(result);
    //res.status(200).send("Hello BEB-06-OPST");
    }
    catch (e) {
        throw Error(e);
    }
 }