// const UserController = require('@controllers/users.controller.js');
// const UserService = require('@services/users.service.js');
// const { Users } = require('@models');
// const bcrypt = require('bcrypt');

// jest.mock('@services/users.service.js');

// describe('UserController', () => {
//     let userController;
//     let userService;

//     beforeAll(() => {
//     userService = new UserService();
//     userController = new UserController();
//     userController.userService = userService;
//     });

//     afterEach(() => {
//     jest.clearAllMocks();
//     });

//     describe('signup', () => {
//     it('should signup a user and return success message', async () => {
//         const req = { body: { nickname: 'John', password: 'password', phoneNumber: '123456789', position: 'user' }, userPhoto: 'photo.jpg' };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//         await userController.signup(req, res, {});

//         expect(userService.signup).toHaveBeenCalledWith('John', 'password', '123456789', 'user', 'photo.jpg');
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({ message: '회원 가입에 성공하였습니다.' });
//     });
//     });

//     describe('checkNickname', () => {
//     it('should check if nickname exists and return true', async () => {
//         const req = { body: { nickname: 'John' } };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         userService.findNickname.mockResolvedValue(true);

//         await userController.checkNickname(req, res, {});

//         expect(userService.findNickname).toHaveBeenCalledWith('John');
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({ message: true });
//     });
//     });

//     describe('deleteSignup', () => {
//     it('should delete user account and return success message', async () => {
//         const req = { body: { nickname: 'John', password: 'password' }, params: {}, session: { destroy: jest.fn() }, locals: { user: { userId: 1 } } };
//         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//         userService.findNickname.mockResolvedValue(true);
//         userService.usercut.mockResolvedValue(true);
//         userService.deleteSignup.mockResolvedValue();
//         await userController.deleteSignup(req, res, {});

//         expect(userService.findNickname).toHaveBeenCalledWith('John');
//         expect(userService.usercut).toHaveBeenCalledWith(true, 'John', 'password');
//         expect(userService.deleteSignup).toHaveBeenCalledWith(1);
//         expect(req.session.destroy).toHaveBeenCalled();
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({ message: '회원탈퇴에 성공하였습니다.' });
//     });
//     });

// });