module.exports = (mongoose) => {
	const UserSchema = new mongoose.Schema({
		first_name: { type: String, required: [true, 'First Name is required'], minlength: 2 },
		last_name: { type: String, required: [true, 'Last Name is required'], minlength: 2 },
		email: { type: String, required: [true, 'Email is required'] },
		password: { type: String, required: [true, 'Password is required'] },
		messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
	}, { timestamps: true });

	UserSchema.path('email').validate(function (email) {
   		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   		return emailRegex.test(email);
	}, "Email must be a valid e-mail address.")

	mongoose.model('User', UserSchema); 
}