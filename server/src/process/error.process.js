exports.return_function = (result, type = true) => {
    //console.log("result = " , result)
    if(type) {
        if(result !== null) {
            const data = { 
                msg : "success",
                value : result
            }
            return data;
        }
    }
    else {
        if(Array.isArray(result) && result.length > 0) {
            const data = {
                msg : "success",
                value : result
            }
            return data;
        }
    }

    const data = {
        msg : "fail",
        value : "database 처리 내용 없음"
    }
    return data
}
  
exports. return_err = (err) => {
    const data = {
        msg : "error",
        value : err
    }
    return data
}