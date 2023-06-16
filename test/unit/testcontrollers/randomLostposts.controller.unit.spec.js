// const RandomLostpostsController = require("@controllers/randomLostposts.controller");

// // poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
// let mockrandomLostpostsService = {
//     getNearbyRandomPosts: jest.fn(),
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

// let randomLostpostsController = new RandomLostpostsController();
// // postsController의 Service를 Mock Service로 변경합니다.
// randomLostpostsController.randomLostpostsService = mockrandomLostpostsService;

// describe('메인 페이지 랜덤 게시글 조회 컨트롤러 유닛 테스트', () => {
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
//     test('메인 페이지 랜덤 게시글 조회, 메인 페이지 5km 이내 게시글 랜덤 조회 컨트롤러 getNearbyRandomPosts 메소드 유닛 테스트 성공 케이스', async () => {
//         const mockGetRandomLostPosts = [
//             {
//                 dogname: "ㅇㅁ",
//                 postId: 1,
//                 nickname: "박준수박준수박준수박준수박준수박준수박준수",
//                 lostPhotoUrl: [
//                     "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-15-16-42-50_1444016"
//                 ],
//                 title: '아ㅇ메리카노~ 쥬아 쥬아 쥬아',
//                 address: "강원특별자치도 속초시 도문동 462",
//                 content: '똒땅햬',
//                 lostLatitude: 38.17101700000000,
//                 lostLongitude: 128.56198000000000,
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             },
//             {
//                 dogname: "오이",
//                 postId: 2,
//                 nickname: "박준수박준수박준수박준수박준수박준수박준수",
//                 lostPhotoUrl: [
//                     "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-15-16-42-50_1444016"
//                 ],
//                 title: '아ㅇ메리카노~ 쥬아 쥬아 쥬아',
//                 address: "강원특별자치도 속초시 도문동 462",
//                 content: '똒땅햬',
//                 lostLatitude: 36.17101700000000,
//                 lostLongitude: 126.56198000000000,
//                 createdAt: new Date().toString(),
//                 updatedAt: new Date().toString(),
//             },
//         ];


//         const mockRequestUser = {
//             userId: null
//         };

//         randomLostpostsController.randomLostpostsService = {
//             getNearbyRandomPosts: jest.fn(() => mockGetRandomLostPosts),
//         };

//         mockResponse.locals.user = mockRequestUser


//         await randomLostpostsController.getNearbyRandomPosts(mockRequest, mockResponse);

//         expect(mockResponse.status).toHaveBeenCalledTimes(1);
//         expect(mockResponse.status).toHaveBeenCalledWith(200);
//         expect(mockResponse.json).toHaveBeenCalledWith({ lostPostsData: mockGetRandomLostPosts });

//     });
// })