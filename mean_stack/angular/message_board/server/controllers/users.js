const mongoose = require('mongoose'),
	  bcrypt = require('bcryptjs'),
	  User = mongoose.model('User')

module.exports = {
	// index: (req, res) => {
	// 	if(req.session.user_id) {
	// 		res.render('message_board');
	// 	} else {
	// 		return res.json({ login_messages: req.flash('login'), registeration_messages: req.flash('registeration') });
	// 	}
	// },
	createUser: (req, res) => {
		console.log("POST DATA", req.body);
		bcrypt.hash(req.body.password, 10)
		.then(hashed_password => {
			let user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashed_password});
			user.save(function(err) {
				const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		    	if(err) {
		    		validation_data = {}
		      		for(let key in err.errors) {
		      			validation_data[err.errors[key]] = err.errors[key].message
		      		}
		      		if(!passwordRegex.test(req.body.password)) {
						validation_data["Password is required"] = "Password must be at least 8 characters long. Password must contain an alphabet character, a number character, and a special character '! @ # $ % ^ & * - _ + ='.";
					}
					validation_data["status"] = 401
					return res.json(validation_data);
		    	} else { 
		    		req.session.user_id = user._id;
		      		console.log('Successfully added a user!');
		      		return res.json({status: 200});
		    	}
		  	})
	  	})
	  	.catch(error => {
	  		throw error
	  	})
	},
	login: (req, res) => {
		let user = User.findOne({email: req.body.email}, function (err, doc){
			if (err) {
				console.log(err);
			} else if (doc !== null) {	
				bcrypt.compare(req.body.password, doc.password)
				.then(result => {
					if(result) {					
			    		req.session.user_id = doc._id;
			      		return res.json({"status": 200});			 
					} else {
						validation_data = {"error": "Password is incorrect."}
						return res.json(validation_data);
					}
				})
				.catch(error => {
					throw error
				})
			} else {
				validation_data = {"error": "Email not registered."}
				return res.json(validation_data);
			}
		});

	},
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	getMe: (req, res) => {
		User.find({_id: req.session.user_id}, function (err, doc){
			let user = doc;
			return res.json(user);
		});
	}
}