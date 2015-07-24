/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	authenticate: function(req, res){
		var email = req.param('email');
		var password = req.param('password');

		if(!email || !password){
			return res.json(401,{err: 'Nombre de usuario y contraseña requeridos.'});
		}

		User.findOneByEmail(email, function(err, user){
			if(!user){
				return res.json(401, {err:'Nombre de usuario o contraseña invalidos.'});
			}
			User.validPassword(password, user, function(err,valid){
				if(err){
					return res.json(403,{err:'Prohibido.'});
				}

				if(!valid){
					return res.json(401,{err:'Nombre de usuario o contraseña invalidos'});
				}else{
					res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
				}
			});
		})
	},

	register: function(req, res) {
    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }

    User.create({name: req.body.name, email: req.body.email, password: req.body.password}).exec(function(err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
      }
    });
  }


};
