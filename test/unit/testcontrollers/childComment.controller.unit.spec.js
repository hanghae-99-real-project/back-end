const ChildCommentController = require("@controllers/childComment.controller");

// poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
let mockchildCommentService = {
    createChildComment: jest.fn(),
    getChildComments: jest.fn(),
    findChildCommentsByCommentId: jest.fn(),
    deleteChildComment: jest.fn(),
};

let mockRequest = {
    params: jest.fn(),
    body: jest.fn()
};

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    locals: {
        userId: 1
    },
};

let mockNext = jest.fn();

let childCommentController = new ChildCommentController();
// postsController의 Service를 Mock Service로 변경합니다.
childCommentController.childCommentControllerService = mockchildCommentService;

describe('대댓글 컨트롤러 유닛 테스트', () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();

        // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('대댓글 컨트롤러 createChildComment 메소드 유닛 테스트 성공 케이스', async () => {
        const mockcreateChildCommmentreturnValue = { message: '대댓글을 작성하였습니다.' };
        const mockRequestBody = {
            childComment: '비밀 대댓글',
            isPrivate: true,
        };
        const mockResponseUser = {
            userId: 1
        }
        const mockRequestParams = {
            postId: 3,
            commentId: 1
        }
        childCommentController.childCommentControllerService = {
            createChildComment: jest.fn(() => mockcreateChildCommmentreturnValue),
        };

        mockRequest.body = mockRequestBody;
        mockRequest.params = mockRequestParams;
        mockResponse.locals.user = mockResponseUser;

        await childCommentController.createChildComment(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockcreateChildCommmentreturnValue);

    });
    test('Unit test for getChildComments method in Child Comment Controller (successful case)', async () => {
        const mockGetChildCommentData = [{ childCommentId: 1, CommentId: 3, UserId: 1, PostId: 2, childComment: 'ㅇㅁ', nickname: 'jsp_brian', userPhoto: 'URL for user photo', isPrivate: true, createdAt: new Date().toString(), updatedAt: new Date().toString(), }, { childCommentId: 2, CommentId: 12, UserId: 1, PostId: 2, childComment: 'ㅇㅁ', nickname: 'jsp_brian', userPhoto: 'URL for user photo', isPrivate: true, createdAt: new Date().toString(), updatedAt: new Date().toString(), }];
        const mockRequestParams = {
            postId: 3,
            commentId: 1
        }

        childCommentController.childCommentControllerService = {
            getChildComments: jest.fn(() => mockGetChildCommentData),
            findChildCommentsByCommentId: jest.fn(() => mockGetChildCommentData),
        };

        mockRequest.params = mockRequestParams;
        // mockResponse.locals.user = mockResponseUser;

        mockRequest.params = mockRequestParams;

        await childCommentController.getChildComments(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGetChildCommentData);
    });

    test('대댓글 컨트롤러 deleteComment 메소드 유닛 테스트 성공 케이스', async () => {
        const mockdeleteChildCommentreturnValue = { message: "대댓글을 삭제하였습니다." };

        const mockResponseUser = {
            userId: 1
        }
        const mockRequestParams = {
            postId: 2,
            commentId: 1,
            childCommentId: 1
        }

        childCommentController.childCommentControllerService = {
            deleteChildComment: jest.fn(() => mockdeleteChildCommentreturnValue),
        };

        mockRequest.params = mockRequestParams;
        mockResponse.locals.user = mockResponseUser;

        await childCommentController.deleteChildComment(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockdeleteChildCommentreturnValue);
    });

})