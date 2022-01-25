const sendResponse = (res, statusCode, isError, title, data = null) => {
    return res.status(statusCode).json({
        error: isError,
        title,
        data
    })
}
module.exports = { sendResponse }