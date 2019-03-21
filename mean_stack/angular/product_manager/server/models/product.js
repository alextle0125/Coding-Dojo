module.exports = (mongoose) => {
	const ProductSchema = new mongoose.Schema({
		title: { type: String, required: [true, 'Title is required'], minlength: 2 },
		price: { type: Number, required: [true, 'Price is required'], default: 0.00 },
		image: { type: String, required: [true, 'Image is required'] },
	}, { timestamps: true });

	mongoose.model('Product', ProductSchema); 
}