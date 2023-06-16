// const CommentController = require("@controllers/comment.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockCommentService = {
//     createComment: jest.fn(),
//     readComments: jest.fn(), // 수정된 부분
//     findCommentsByPostId: jest.fn(),
//     fixComment: jest.fn(),
//     updateComment: jest.fn(),
//     deleteComment: jest.fn()
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

// let commentController = new CommentController();
// // postsController의 Service를 Mock Service로 변경합니다.
// commentController.commentService = mockCommentService;

// describe('코멘트 컨트롤러 유닛 테스트', () => {
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

//     test('코멘트 컨트롤러 createComment 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockcreateCommmentreturnValue = { message: '댓글을 작성하였습니다.' };
//         const mockRequestBody = {
//             comment: '비밀 댓글',
//             isPrivate: true,
//         };
//         const mockResponseUser = {
//             userId: 1
//         }

//         commentController.commentService = {
//             createComment: jest.fn(() => mockcreateCommmentreturnValue),
//         };

//         mockRequest.body = mockRequestBody;
//         mockResponse.locals.user = mockResponseUser

//         await commentController.createComment(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(201);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockcreateCommmentreturnValue);

//     });
//     test('코멘트 컨트롤러 readComments 메소드 유닛 테스트 성공 케이스', async () => {

//         const mockGetCommentData = [
//             {
//                 commentId: 1,
//                 UserId: 9,
//                 PostId: 3,
//                 comment: 'ㅇㅁ',
//                 commentPhotoUrl: '대충 이미지 url',
//                 nickname: 'jsp_brian',
//                 userPhoto: '대충 이미지 url',
//                 isPrivate: true,
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             },
//             {
//                 commentId: 2,
//                 UserId: 3,
//                 PostId: 4,
//                 comment: 'ㅇㅁ',
//                 commentPhotoUrl: '대충 이미지 url',
//                 nickname: 'jsp_brian',
//                 userPhoto: '대충 이미지 url',
//                 isPrivate: true,
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             }
//         ];

//         commentController.commentService = {
//             readComments: jest.fn(() => mockGetCommentData),
//             findCommentsByPostId: jest.fn(() => mockGetCommentData),
//         };

//         await commentController.readComments(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith({ commentsData: mockGetCommentData });
//     });

//     test('코멘트 컨트롤러 fixComment 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockfixCommmentreturnValue = { message: '댓글을 수정하였습니다.' };
//         const mockRequestBody = {
//             comment: '비밀비밀비밀 댓글',
//             isPrivate: true,
//         };
//         const mockResponseUser = {
//             userId: 1
//         }
//         const mockRequestParams = {
//             postId: 3,
//             commentId: 4
//         }

//         commentController.commentService = {
//             fixComment: jest.fn(() => mockfixCommmentreturnValue),
//             updateComment: jest.fn(() => mockfixCommmentreturnValue),
//         };

//         mockRequest.body = mockRequestBody;
//         mockRequest.params = mockRequestParams;
//         mockResponse.locals.user = mockResponseUser;

//         await commentController.fixComment(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockfixCommmentreturnValue);
//     });

//     test('코멘트 컨트롤러 deleteComment 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockdeleteCommentreturnValue = { message: '댓글을 지웠습니다.' };

//         const mockResponseUser = {
//             userId: 1
//         }
//         const mockRequestParams = {
//             postId: 3,
//             commentId: 4
//         }

//         commentController.commentService = {
//             deleteComment: jest.fn(() => mockdeleteCommentreturnValue),
//         };

//         mockRequest.params = mockRequestParams;
//         mockResponse.locals.user = mockResponseUser;

//         await commentController.deleteComment(mockRequest, mockResponse, mockNext);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith(mockdeleteCommentreturnValue);
//     });

// })