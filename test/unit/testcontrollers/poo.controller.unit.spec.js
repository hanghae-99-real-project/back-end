// const PooController = require("@controllers/poo.controller");
// const PooService = require("@services/poo.service");


// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockPooService = {
//     postPoo: jest.fn(),
//     findAllPoo: jest.fn(), // 수정된 부분
//     cashingPoo: jest.fn(),
// };

// let mockRequest = {
//     params: jest.fn(),
//     body: jest.fn()
// };

// let mockResponse = {
//     status: jest.fn(),
//     json: jest.fn(),
//     locals: {
//         userId: 1
//     },
// };

// let mockNext = jest.fn();

// let pooController = new PooController();

// let pooService = new PooService();
// // postsController의 Service를 Mock Service로 변경합니다.
// pooController.pooService = mockPooService;

// describe('푸박스 컨트롤러 유닛 테스트', () => {
//     // 각 test가 실행되기 전에 실행됩니다.
//     beforeEach(() => {
//         jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
//         mockResponse.status.mockClear();
//         mockResponse.json.mockClear();

//         // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
//         mockResponse.status = jest.fn(() => {
//             return mockResponse;
//         });
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('postPoo method should call poosService.postPoo and return the response', async () => {
//         const mockPostPooData = { message: '푸박스 등록 성공' };
//         const mockRequestBody = {
//             content: '푸박스 내용',
//             pooLatitude: 35.123456,
//             pooLongitude: 127.654321,
//             pooPhotoUrl: 'https://example.com/photo.jpg',
//         };
//         const mockResponseUser = {
//             userId: 1
//         }

//         pooController.poosService = {
//             postPoo: jest.fn(() => mockPostPooData),
//         };

//         mockRequest.body = mockRequestBody;
//         mockResponse.locals.user = mockResponseUser

//         await pooController.postPoo(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockPostPooData);

//     });
//     test('푸박스 컨트롤러 findAllPoo 메소드 유닛 테스트 성공케이스 테스트', async () => {

//         const mockGetPooData = [
//             {
//                 pooId: 1,
//                 UserId: 9,
//                 content: 'ㅇㅁ',
//                 pooPhotoUrl: '대충 이미지 url',
//                 pooLatitude: '37.56551583208476',
//                 pooLongitude: '127.03017607753534',
//                 address: '대충 주소',
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             },
//             {
//                 pooId: 2,
//                 UserId: 10,
//                 content: 'ㅇㅁ',
//                 pooPhotoUrl: '대충 이미지 url',
//                 pooLatitude: '37.56551583208476',
//                 pooLongitude: '127.03017607753534',
//                 address: '대충 주소',
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             },
//         ];

//         pooController.poosService = {
//             findAllPoo: jest.fn(() => mockGetPooData),
//         };

//         await pooController.findAllPoo(mockRequest, mockResponse, mockNext);


//         expect(mockResponse.status).toHaveBeenCalledWith(201);
//         expect(mockResponse.json).toHaveBeenCalledWith({ getPooData: mockGetPooData });
//         expect(pooController.poosService.findAllPoo).toHaveBeenCalledWith(mockRequest.originalUrl);
//     });


// })