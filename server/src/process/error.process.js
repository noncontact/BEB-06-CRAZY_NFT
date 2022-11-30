exports.return_function = (result) => {
    console.log("result = " , result)
    if(result !== null) {
        const data = {
        msg : "success",
        value : result
        }
        return data
    }
    else {
        const data = {
        msg : "fail",
        value : "database 처리 내용 없음"
        }
        return data
    }
}
  
exports. return_err = (err) => {
    const data = {
        msg : "error",
        value : err
    }
    return data
}