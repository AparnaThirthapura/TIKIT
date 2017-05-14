var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render("signup");
}
exports.login = function(req, res){
  res.render("login");
}
exports.index = function(req, res){
  res.render("index", {userName:req.user.userName});
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}
