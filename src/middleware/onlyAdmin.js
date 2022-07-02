


const onlyAdmin = async (req, res, next) => {

    const isAdmin = req.get('im_admin' ) || false
    if (!isAdmin) return res.status(401).end();
    next();
};
module.exports = { onlyAdmin };
