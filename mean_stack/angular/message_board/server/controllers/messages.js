const mongoose = require('mongoose'),
	  bcrypt = require('bcryptjs'),
	  Message = mongoose.model('Message'),
	  User = mongoose.model('User')

module.exports = {
	allMessages: (req, res) => {
		Message.find({}, (err, data) => {
			return res.json(data);
		});
	},
	postMessage: (req, res) => {
		User.findOne({_id: req.session.user_id}, function (err, doc){
			if(err) {
				console.log("Error finding user.");
			} else {
				if(doc !== null) {				
					let user = doc;
					let message = new Message({message: req.body.message});
					message.user = user
					user.messages.push(message);
					message.save();
					return res.json({status: 200})
				} else {
					return res.json({status: 403})
				}			
			}
		});
	}
}