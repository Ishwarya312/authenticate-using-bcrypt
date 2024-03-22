const registerController = require('../controllers/registerController');
const bcrypt = require('bcrypt');
const workFactor = 10;

jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

describe('registerController', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
    });

    it('should generate salt and hash password', async () => {
        const mockSalt = 'mocked-salt';
        const mockHash = 'mocked-hash';
        const password = 'testpassword';

        bcrypt.genSalt.mockImplementation((workFactor, callback) => {
            callback(null, mockSalt);
        });

        bcrypt.hash.mockImplementation((password, salt, callback) => {
            callback(null, mockHash);
        });

        req.body.username = 'testuser';
        req.body.password = password;

        await registerController(req, res);

        expect(bcrypt.genSalt).toHaveBeenCalledWith(workFactor, expect.any(Function));
        expect(bcrypt.hash).toHaveBeenCalledWith(password, mockSalt, expect.any(Function));
        expect(res.send).toHaveBeenCalledWith(mockHash);
    });

    it('should handle bcrypt errors', async () => {
        const password = 'testpassword';

        bcrypt.genSalt.mockImplementation((workFactor, callback) => {
            callback(new Error('Bcrypt error'));
        });

        req.body.username = 'testuser';
        req.body.password = password;

        await registerController(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).not.toHaveBeenCalled();
    });

});
