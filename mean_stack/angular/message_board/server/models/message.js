module.exports = (mongoose) => {
	const MessageSchema = new mongoose.Schema({
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		message: { type: String, required: [true, 'Message is required'], minlength: 2 }
	}, { timestamps: true });

	mongoose.model('Message', MessageSchema); 
}