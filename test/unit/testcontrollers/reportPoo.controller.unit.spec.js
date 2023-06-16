// const ReportPooController = require("@controllers/reportPoo.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockreportPooService = {
//     postReportPoo: jest.fn(),
// };

// let mockRequest = {
//     params: jest.fn(),
//     body: jest.fn(),
// };

// let mockResponse = {
//     status: jest.fn(),
//     json: jest.fn(),
//     locals: {
//         userId: 1
//     },
// };

// // let mockNext = jest.fn();

// let reportPooController = new ReportPooController();
// // postsController의 Service를 Mock Service로 변경합니다.
// reportPooController.reportPooService = mockreportPooService;

// describe('푸박스 신고 컨트롤러 유닛 테스트', () => {
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

//     // 푸박스 신고 성공
//     test('푸박스 신고 컨트롤러 postReportPoo 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockReportPooreturnValue = { msg: "신고 완료" };

//         const mockRequestUser = {
//             userId: 6
//         };

//         const mockRequestParams = {
//             pooId: 3
//         }

//         const mockRequestBody = {
//             reportContent: "여기가 신고"
//         }

//         reportPooController.reportPooService = {
//             postReportPoo: jest.fn(() => mockReportPooreturnValue),
//         };

//         mockResponse.locals.user = mockRequestUser
//         mockRequest.params = mockRequestParams
//         mockRequest.body = mockRequestBody

//         await reportPooController.postReportPoo(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockReportPooreturnValue);

//     });
// })