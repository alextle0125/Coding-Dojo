const mongoose = require('mongoose'),
	  Product = mongoose.model('Product')

module.exports = {
	allProducts: (req, res) => {
		Product.find({}, (err, data) => {
			return res.json(data);
		});
	},
	createProduct: (req, res) => {
		let product = new Product({title: req.body.title, price: req.body.price, image: req.body.image});
		product.save(function(err){
			if(err){
				validation_data = {}
				for(let key in err.errors) {
					validation_data[err.errors[key]] = err.errors[key].message
				}
				validation_data['status'] = 401
				return res.json(validation_data)
			} else {
				return res.json({status: 200});
			}
		})
	},
	editProduct: (req, res) => {
		let product = Product.findOne({_id: req.params.id}, function (err, data){
			return res.json(data);
		});
	},
	updateProduct: (req, res) => {
		Product.findOne({_id: req.params.id}, function (err, product){
			product.title = req.body.title;
			product.price = req.body.price;
			product.image = req.body.image;
			product.save(function(err){
				if(err) {
					err['status'] = 401;
					return res.json(err);
				} else {
					return res.json({status: 200});
				}
			});
		});
	},
	destroyProduct: (req, res) => {
		Product.remove({_id: req.params.id}, function (err, product) {
			if(err) {
				err['status'] = 401;
				return res.json(err);
			} else {
				return res.json({status: 200});
			}
		});
	}
}