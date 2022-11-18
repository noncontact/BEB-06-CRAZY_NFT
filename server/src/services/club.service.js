const db_proc = require("../process/db.process");
const contract_proc = require("../process/contract.process");

exports.getAllclub = async() => {
    // 데이터베이스에서 모든 클럽정보를 쿼리하는 함수 구현 필요 
    const result = db_proc.query_Allclub();
    return result;
}

exports.getContentIndex = async(club_id, category_id) => {
    // 데이터베이스에서 카테고리에 따라 모든 작성글 목록 정보를 쿼리하는 함수 구현 필요 
    const result = db_proc.query_ContentIndex(club_id, category_id);
    return result;
}

exports.getContentDetail = async(post_id) => {
    // 데이터베이스에서 post_id 에 따른 작성글 내용을 쿼리하는 함수 구현 필요 
    const result = db_proc.query_ContentDetail(post_id);
    return result;
}

exports.setContentWrite = async(address, title, content, club_id, category_id) => {
    // 데이터베이스에서 작성글 내용을 추가하는 쿼리 함수 구현 필요 
    const result = await db_proc.query_ContentWrite(address, title, content, club_id, category_id);
    if(result !== "error") { 
        // 회원에게 보상토큰을 전송하는 함수 구현 필요 
        const contract_result = contract_proc.transmit_Token(address);

        return result;
    }
}

exports.setCommentWrite = async(address, post_id, content, club_id, category_id) => {
    // 데이터베이스에서 댓글 내용을 추가하는 쿼리 함수 구현 필요 
    const result = await db_proc.query_CommentWrite(address, post_id, content, club_id, category_id);
    if(result !== "error") { 
        // 회원에게 보상토큰을 전송하는 함수 구현 필요 
        const contract_result = contract_proc.transmit_Token(address);

        return result;
    }
}

exports.setCommentLike = async(address, post_id) => {
    // 데이터베이스에서 좋아요 반응을 추가하는 쿼리 함수 구현 필요
    const result = await db_proc.query_CommentLike(address, post_id);
    if(result !== "error") { 
        // 회원에게 보상토큰을 전송하는 함수 구현 필요 
        const contract_result = contract_proc.transmit_Token(address);

        return result;
    }
}