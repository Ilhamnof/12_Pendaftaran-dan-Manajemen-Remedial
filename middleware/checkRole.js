function checkRole(role) {

return function(req, res, next) {
    if (req.userRole === role) {
    next(); // Lanjut ke rute berikutnya jika peran sesuai
    } else {
    res.redirect ('/not-found')
    }
};
}

module.exports = checkRole;