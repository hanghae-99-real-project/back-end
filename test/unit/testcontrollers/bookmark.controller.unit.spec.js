// const BookmarkController = require("@controllers/bookmark.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockbookmarkService = {
//     postBookmark: jest.fn(),
//     createBookmark: jest.fn(),
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

// let bookmarkController = new BookmarkController();
// // postsController의 Service를 Mock Service로 변경합니다.
// bookmarkController.bookmarkService = mockbookmarkService;

// describe('북머크 컨트롤러 유닛 테스트', () => {
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

//     // 북마크 등록 성공
//     test('북마크 등록 컨트롤러 postBookmark 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockBookMarkreturnValue = { message: "게시글 북마크를 등록했습니다." }

//         const mockRequestUser = {
//             userId: 1
//         };

//         const mockRequestParams = {
//             postId: 1
//         }

//         bookmarkController.bookmarkService = {
//             postBookmark: jest.fn(() => mockBookMarkreturnValue),
//             createBookmark: jest.fn(() => mockBookMarkreturnValue),

//         };

//         mockResponse.locals.user = mockRequestUser
//         mockRequest.params = mockRequestParams


//         await bookmarkController.postBookmark(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockBookMarkreturnValue);
//     });

//     // 북마크 취소 성공
//     test('북마크 취소 컨트롤러 postBookmark 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockBookMarkCancelreturnValue = { message: "게시글 북마크를 취소했습니다." }

//         const mockRequestUser = {
//             userId: 1
//         };

//         const mockRequestParams = {
//             postId: 1
//         }

//         bookmarkController.bookmarkService = {

//             postBookmark: jest.fn(() => mockBookMarkCancelreturnValue),
//             createBookmark: jest.fn(() => mockBookMarkCancelreturnValue)
//         };

//         mockResponse.locals.user = mockRequestUser
//         mockRequest.params = mockRequestParams


//         await bookmarkController.postBookmark(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockBookMarkCancelreturnValue);
//     });
// })