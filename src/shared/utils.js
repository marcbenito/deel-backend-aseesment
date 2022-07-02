

const manageErrors = (err, res) => {
    console.error(err);
    if (err.statusCode) {
        res.status(err.statusCode).send(err.msg).end();
    } else {
        res.status(500).end();
    }
};
module.exports = manageErrors;