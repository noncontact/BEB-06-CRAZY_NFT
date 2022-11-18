const db_proc = require("../process/db.process");
const contract_proc = require("../process/contract.process");

exports.setNFTDeploy = async(club_id, meta_cid, deploy_count) => {
    // NFT 발행 함수 구현 필요
    const result = contract_proc.DeployNFT(club_id, meta_cid, deploy_count);
    return result;
}

exports.setNFTMint = async(address) => {
    // NFT mint 함수 구현 필요
    const result = contract_proc.MintNFT(address);
    if (result !== "error") {
        // 데이터베이스에서 NFT 후 회원이 소유한 NFT 정보를 추가하는 쿼리 함수 구현 필요
        const db_result = db_proc.setMintNFT(address, result.token_URI);
        if(db_result !== "error")
            return db_result;
    }
    return "error";
}