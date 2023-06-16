// const PostController = require("@controllers/posts.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockPostsService = {
//     createPost: jest.fn(),
//     getPosts: jest.fn(),
//     getPostById: jest.fn(),
//     updatePost: jest.fn(),
//     deletePost: jest.fn(),
//     endPost: jest.fn(),
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

// let postController = new PostController();
// // postsController의 Service를 Mock Service로 변경합니다.
// postController.postControllerService = mockPostsService;

// // const dateWithoutMilliseconds = new Date();
// // dateWithoutMilliseconds.setMilliseconds(0);
// // const specificDate = new Date('2023-06-15T07:40:04Z');

// describe('댕파인더 컨트롤러 유닛 테스트', () => {
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


    // // 댕파인더 작성 성공
    // test('댕파인더 컨트롤러 createPost 메소드 유닛 테스트 성공 케이스', async () => {
    //     const mockcreatePostsreturnValue = { message: '게시글 작성에 성공하였습니다.' };
    //     const mockRequestBody = {
    //         dogname: '¯ᴥ¯',
    //         title: '¯ᴥ¯',
    //         content: '¯ᴥ¯',
    //         lostLatitude: 36.322141,
    //         lostLongitude: 126.323492,
    //         losttime: 2020.09,
    //         lostPhotoUrl: "아무 url"
    //     };
    //     const mockResponseUser = {
    //         userId: 1
    //     }
    //     postController.postControllerService = {
    //         createPost: jest.fn(() => mockcreatePostsreturnValue),
    //     };

    //     mockRequest.body = mockRequestBody;
    //     mockResponse.locals.user = mockResponseUser;

    //     await postController.createPost(mockRequest, mockResponse, mockNext);

    //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //     expect(mockResponse.status).toHaveBeenCalledWith(201);
    //     expect(mockResponse.json).toHaveBeenCalledWith(mockcreatePostsreturnValue);

    // });

    // 댕파인더 조회 실패
    // test('댕파인더 컨트롤러 getPosts 메소드 유닛 테스트 성공 케이스', async () => {
    //     const mockGetPostsData = [
    //         {
    //             dogname: "두부",
    //             postId: 3,
    //             nickname: "조형민",
    //             lostPhotoUrl: ["아무 url"],
    //             title: 'ㅇㅁ',
    //             status: false,
    //             content: 'URL for user photo',
    //             lostLatitude: "36.32214100000000",
    //             lostLongitude: "126.32349200000000",
    //             createdAt: new Date().toString(),
    //             updatedAt: new Date().toString(),
    //         },
    //         {
    //             dogname: "¯ᴥ¯",
    //             postId: 23,
    //             nickname: null,
    //             lostPhotoUrl: ["아무 url"],
    //             title: '뭐꼬이거',
    //             status: false,
    //             content: '강아지 잃어버림',
    //             lostLatitude: "36.32214100000000",
    //             lostLongitude: "126.32349200000000",
    //             createdAt: new Date().toISOString(),
    //             updatedAt: new Date().toISOString(),
    //             userId: undefined
    //         },
    //     ];
    //     const mockResponseUser = {
    //         userId: null
    //     }

    //     postController.postControllerService = {
    //         getPosts: jest.fn(() => mockGetPostsData),
    //     };

    //     mockResponse.locals.user = mockResponseUser;


    //     await postController.getPosts(mockRequest, mockResponse);

    //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //     expect(mockResponse.status).toHaveBeenCalledWith(200);
    //     expect(mockResponse.json).toHaveBeenCalledWith({ lostPostsData: mockGetPostsData });
    // });

    // // 댕파인더 상세 조회 실패
    // test('댕파인더 컨트롤러 getPostById 메소드 유닛 테스트 성공 케이스', async () => {
    //     const mockGetPostsData =
    //     {
    //         postId: 3,
    //         UserId: 1,
    //         nickname: "조형민",
    //         dogname: "양성",
    //         title: '양성',
    //         content: "<p>양성</p>",
    //         lostPhotoUrl: [
    //             "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-15-7-40-4_2472548"
    //         ],
    //         losttime: null,
    //         lostLatitude: "37.17342092960466",
    //         lostLongitude: "128.47409107526380",
    //         address: "강원특별자치도 영월군 영월읍 덕포리 797",
    //         views: 33,
    //         status: false,
    //         createdAt: new Date().toISOString(),
    //         updatedAt: new Date().toISOString(),
    //         BookMarks: []
    //     };

    //     const mockRequestParams = {
    //         postId: 3,
    //     }

    //     postController.postControllerService = {
    //         getPostById: jest.fn(() => mockGetPostsData),
    //     };

    //     mockRequest.params = mockRequestParams;

    //     await postController.getPostById(mockRequest, mockResponse);

    //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //     expect(mockResponse.status).toHaveBeenCalledWith(200);
    //     expect(mockResponse.json).toHaveBeenCalledWith(mockGetPostsData);
    // });

    // // 댕파인더 수정 성공
    // test('댕파인더 컨트롤러 updatePost 메소드 유닛 테스트 성공 케이스', async () => {
    //     const mockfixPostreturnValue = { message: '게시글을 수정하였습니다.' };
    //     const mockRequestBody = {
    //         dogname: '빠암',
    //         title: '안녕',
    //         content: '헬로',
    //         lostLatitude: 36.322141,
    //         lostLongitude: 126.323492,
    //         losttime: 2020.09,
    //         lostPhotoUrl: "아무 url"
    //     };
    //     const mockResponseUser = {
    //         userId: 1
    //     }
    //     const mockRequestParams = {
    //         postId: 4,
    //     }

    //     postController.postControllerService = {
    //         updatePost: jest.fn(() => mockfixPostreturnValue),
    //     };

    //     mockRequest.body = mockRequestBody;
    //     mockRequest.params = mockRequestParams;
    //     mockResponse.locals.user = mockResponseUser;

    //     await postController.updatePost(mockRequest, mockResponse, mockNext);

    //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //     expect(mockResponse.status).toHaveBeenCalledWith(200);
    //     expect(mockResponse.json).toHaveBeenCalledWith(mockfixPostreturnValue);
    // });

    // // 댕파인더 삭제 성공
    // test('푸박스 컨트롤러 deletePost 메소드 유닛 테스트 성공 케이스', async () => {
    //     const mockdeletePostreturnValue = { message: "게시글을 삭제하였습니다." };

    //     const mockResponseUser = {
    //         userId: 1
    //     }
    //     const mockRequestParams = {
    //         postId: 43,
    //     }

    //     postController.postControllerService = {
    //         deletePost: jest.fn(() => mockdeletePostreturnValue),
    //     };

    //     mockRequest.params = mockRequestParams;
    //     mockResponse.locals.user = mockResponseUser;

    //     await postController.deletePost(mockRequest, mockResponse, mockNext);

    //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
    //     expect(mockResponse.status).toHaveBeenCalledWith(200);
    //     expect(mockResponse.json).toHaveBeenCalledWith(mockdeletePostreturnValue);
    // });

// })