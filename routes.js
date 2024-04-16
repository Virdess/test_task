const AuthenticationController = require('./controllers/AuthController');
const RecordsController = require('./controllers/RecordsController');
const authenticate = require('./middleware/authenticate');

module.exports = (app) => {
    app.post('/register', AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
  
    app.get('/records', authenticate, RecordsController.getAll);
    app.get('/records/:recordId', authenticate, RecordsController.getOne);
    app.post('/records', authenticate, RecordsController.create);
    app.put('/records/:recordId', authenticate, RecordsController.update);
    app.delete('/records/:recordId', authenticate, RecordsController.del);
  };