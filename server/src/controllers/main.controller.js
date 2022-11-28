const contract_proc = require("../process/contract.process");
const file_proc = require("../process/file.process"); 

exports.main_get = async(req, res, next) => {
    try {
        console.log(process.env.NFT_WORK_FLAG)
        // 시작시 작업을 위한 폴더를 생성
        if(process.env.NFT_WORK_FLAG !== "debug") {
            await file_proc.makeFolder(process.env.NFT_IMG_WORK_PATH);
            await file_proc.makeFolder(process.env.NFT_UPLOAD_PATH);
            await file_proc.makeFolder(process.env.NFT_BUILD_PATH);
            // 시작시 kip-7 토큰 발행
            const result = await contract_proc.kip7_Deploy();
            return res.status(200).send(result);
        }
        else {
            return res.status(200).send("Hello BEB-06-Crazy NFT");
        }
    }
    catch (err) {
        return res.status(404).send(err);
    }
 }