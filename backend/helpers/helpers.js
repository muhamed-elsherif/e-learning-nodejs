class Helpers {
    static resApi = (res, apiStatus , data , message)=>{
        const statusCode = apiStatus ? 200:500
        res.status(statusCode).send({apiStatus ,data, message})
    }
}

module.exports = Helpers