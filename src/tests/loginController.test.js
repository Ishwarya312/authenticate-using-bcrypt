const loginController = require('../controllers/loginController');
const bcrypt = require('bcrypt');

jest.mock('../data/data', () => [
    { username: 'user1', passwordHash: '$2b$10$Ae09E91N7Z1BLl6/4cF6s.DaQHuam4w0I6xTOITRlvqI5I5zgLwNi' },
]);

describe('loginController', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 401 status with invalid username', async () => {
        req.body = { username: 'invaliduser', password: 'password' };

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Invalid username or password');
    });

    it('should return 401 status with invalid password', async () => {
        req.body.username = 'user1';
        req.body.password = 'invalidpassword';

        bcrypt.compare = jest.fn().mockImplementation((password, hash, callback) => {
            callback(null, false);
        });

    
        await loginController(req, res);
    
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Invalid credentials');
    });
    

    it('should return "Login successful" with valid credentials', async () => {
        req.body.username = 'user1';
        req.body.password = 'password';

        bcrypt.compare = jest.fn().mockImplementation((password, hash, callback) => {
            callback(null, true);
        });

        await loginController(req, res);

        expect(res.send).toHaveBeenCalledWith('Login successful');
    });

    it('should return 401 status with bcrypt error', async () => {
        req.body.username = 'user1';
        req.body.password = 'password';

        bcrypt.compare = jest.fn().mockImplementation((password, hash, callback) => {
            callback(new Error('Bcrypt error'), false);
        });

        await loginController(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Invalid credentials');
    });
});
