const productsController = require('../controllers/products.js')

module.exports = (app) => {
	app.get('/api/products', productsController.allProducts)
	app.post('/products/add', productsController.createProduct)
	app.get('/products/edit/:id/retrieve', productsController.editProduct)
	app.put('/products/:id/update', productsController.updateProduct)
	app.delete('/products/:id/delete', productsController.destroyProduct)
}
