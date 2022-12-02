const club = require("#src/services/club.service.js")
const user = require("#src/services/user.service.js")
const forum = require("#src/services/forum.service.js")
const nft = require("#src/services/nft.service.js")

exports.initUser = async (address, password, nickname, profileurl) => {
    try {
        const result_user = await user.getUserId(address);
        if(result_user.msg === "success")
            return "found"

        const result = await user.createUser(address, password, nickname, profileurl);
        if(result.msg !== "success") 
            return "fail"
        else 
            return "success"
    }
    catch (err) {
        return err
    }
}

exports.initClub = async (address, title, img) => { 
    try {
        const data = await club.getAllClub();
        if(data.msg === "success") {
            return "found"
        }
        console.log(address)
        const result_user = await user.getUserId(address);
        console.log("result_user = " , result_user)    
        if(result_user.msg !== "success")
            return "fail"

        const result = await club.createClub(result_user.value.dataValues.id, title, img)
        if(result.msg !== "success") 
            return "fail"
        else 
            return "success"
    }
    catch (err) {
        return err
    }
}

exports.initForum = async () => {
    try {
        const result_user = await forum.getForumAll();
        if(result_user.msg === "success")
            return "found"

        await forum.setForumValue("공지사항", 1,1,1);
        await forum.setForumValue("Q&A", 1,1,1);
        await forum.setForumValue("자유게시판", 1,1,1);
        await forum.setForumValue("클럽활동", 1,1,1);
        await forum.setForumValue("레어글", 1,1,1);
        await forum.setForumValue("슈퍼레어글", 1,1,1);

        return "success"
       
    }
    catch (err) {
        return err
    }
}

exports.setDeploy = async(Club_id, use) => {
    console.log("setDeploy ---------------")
    await nft.setDeploy(Club_id, use);
}