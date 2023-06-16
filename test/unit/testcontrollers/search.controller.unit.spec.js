// const SearchController = require("@controllers/search.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockSearchService = {
//     searchPosts: jest.fn(),
// };

// let mockRequest = {
//     query: jest.fn()
// };

// let mockResponse = {
//     status: jest.fn(),
//     json: jest.fn(),
//     locals: {
//         userId: 1
//     },
// };

// let mockNext = jest.fn();

// let searchController = new SearchController();
// // postsController의 Service를 Mock Service로 변경합니다.
// searchController.searchService = mockSearchService;

// describe('검색 컨트롤러 유닛 테스트', () => {
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

//     // 댕파인더 검색 성공
//     test('검색 컨트롤러 searchPosts 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockRequestQuery = {
//             search: "인천 연수구 연수동"
//         };

//         searchController.searchService = {
//             searchPosts: jest.fn(() => mockRequestQuery),
//         };

//         mockRequest.query = mockRequestQuery

//         await searchController.searchPosts(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockRequestQuery);

//     });
// })