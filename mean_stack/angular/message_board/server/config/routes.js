const userController = require('../controllers/users.js')
const messageController = require('../controllers/messages.js')

module.exports = (app) => {
	// app.get('/', userController.index)
	app.post('/register', userController.createUser)
	app.post('/login', userController.login)
	app.get('/logout', userController.logout)
	app.get('/me', userController.getMe)
	app.get('/api/messages', messageController.allMessages)
	app.post('/message/post', messageController.postMessage)
}
