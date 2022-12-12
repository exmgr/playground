/* Error handler middleware */
module.exports = function () {
    return function (err, req, res, next) {
        const statusCode = err.statusCode || 500;
        console.error(err);
        res.status(statusCode).json({'message': err.message});

        return;
    }
}
