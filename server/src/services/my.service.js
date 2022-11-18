const db_proc = require("../process/db.process");

exports.getMyDetail = async(address) => {
    // 데이터베이스에서 나의 상세정보 쿼리 함수 구현 필요
    const result = await db_proc.query_MyDetail(address);
    return result;
}

exports.getMyContents = async(address) => {
    // 데이터베이스에서 나의 작성글 목록 쿼리 함수 구현 필요
    const result = await db_proc.query_MyContents(address);
    return result;
}

exports.getMyNFTs = async(address) => {
    // 데이터베이스에서 나의 NFT 목록 쿼리 함수 구현 필요
    const result = await db_proc.query_MyNFTs(address);
    return result;
}

exports.getMyClubs = async(address) => {
    // 데이터베이스에서 나의 Club 목록 쿼리 함수 구현 필요
    const result = await db_proc.query_MyClubs(address);
    return result;
}

exports.getAdminInfo = async(address) => {
    // 데이터베이스에서 운영자의 정보 쿼리 함수 구현 필요 -> 가입을 희망하는 회원리스트 쿼리
    const result = await db_proc.query_AdminInfo(address);
    return result;
}

exports.setAdminAllow = async(address) => {
    // 데이터베이스에서 운영자가 가입허락 쿼리 함수 구현 필요 -> 가입을 허락하는 쿼리
    const result = await db_proc.query_AdminAllow(address);
    return result;
}