module.exports.checkAuth = function(req,res,next){
    const userUuid = req.session.useruuid

    if(!userUuid){
        res.redirect('/login')
    }

    next()
}