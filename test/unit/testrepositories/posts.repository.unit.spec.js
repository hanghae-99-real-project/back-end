const Postsrepository = require("@repositories/posts.repository");
const { Op } = require("sequelize");

// 가상 모델 생성
let mockPostsModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
};

let postsrepository = new Postsrepository(mockPostsModel);

describe("푸댕 댕파인더 유닛 테스트", () => {
    beforeEach(() => {
        // 모든 Mock을 초기화합니다.
        jest.resetAllMocks();
    });

    // // 댕파인더 생성 성공
    // test("푸댕 댕파인더 생성 유닛 테스트", async () => {
    //     mockPostsModel.create = jest.fn(() => {
    //         return "게시글이 생성되었습니다.";
    //     });
    //     const PostsBody = {
    //         UserId: 1,
    //         dogname: "두부",
    //         nickname: "뱅뱅뱅",
    //         title: "댕댕잃어버림",
    //         content: "찾아줘",
    //         losttime: "2023-05-08T15:52:03.000Z",
    //         lostPhotoUrl: "아무거나.jpg",
    //         lostLatitude: "36.2341",
    //         lostLongitude: "127.2341",
    //         views: 1,
    //         commentCount: 4,
    //         status: 0,
    //     };

    //     const createPostsData = await postsrepository.createPost({
    //         UserId: PostsBody.UserId,
    //         dogname: PostsBody.dogname,
    //         nickname: PostsBody.nickname,
    //         title: PostsBody.title,
    //         content: PostsBody.content,
    //         losttime: PostsBody.losttime,
    //         lostPhotoUrl: PostsBody.lostPhotoUrl,
    //         lostLatitude: PostsBody.lostLatitude,
    //         lostLongitude: PostsBody.lostLongitude,
    //         views: PostsBody.views,
    //         commentCount: PostsBody.commentCount,
    //         status: PostsBody.status,
    //     });

    //     expect(mockPostsModel.create).toHaveBeenCalledTimes(1);
    //     expect(createPostsData).toEqual("게시글이 생성되었습니다.");
    //     expect(mockPostsModel.create).toHaveBeenCalledWith({
    //         UserId: PostsBody.UserId,
    //         dogname: PostsBody.dogname,
    //         nickname: PostsBody.nickname,
    //         title: PostsBody.title,
    //         content: PostsBody.content,
    //         losttime: PostsBody.losttime,
    //         lostPhotoUrl: PostsBody.lostPhotoUrl,
    //         lostLatitude: PostsBody.lostLatitude,
    //         lostLongitude: PostsBody.lostLongitude,
    //         views: PostsBody.views,
    //         commentCount: PostsBody.commentCount,
    //         status: PostsBody.status,
    //     });
    // });

    // // 댕파인더 최신순 조회 실패
    // test("getRecentPosts success test", async () => {
    //     mockPostsModel.findAll = jest.fn(() => {
    //         return "findAll";
    //     });
    //     const PostsParam = {
    //         limit: {
    //             UserId: 1,
    //             dogname: "두부",
    //             nickname: "뱅뱅뱅",
    //             title: "댕댕잃어버림",
    //             content: "찾아줘",
    //             losttime: "2023-05-08T15:52:03.000Z",
    //             lostPhotoUrl: "아무거나.jpg",
    //             lostLatitude: "36.2341",
    //             lostLongitude: "127.2341",
    //             views: 1,
    //             commentCount: 4,
    //             status: 0,
    //         },
    //     };


    //     const findAllPostsData = await postsrepository.getRecentPosts({
    //         limit:
    //         {
    //             UserId: PostsParam.UserId,
    //             dogname: PostsParam.dogname,
    //             nickname: PostsParam.nickname,
    //             title: PostsParam.title,
    //             content: PostsParam.content,
    //             losttime: PostsParam.losttime,
    //             lostPhotoUrl: PostsParam.lostPhotoUrl,
    //             lostLatitude: PostsParam.lostLatitude,
    //             lostLongitude: PostsParam.lostLongitude,
    //             views: PostsParam.views,
    //             commentCount: PostsParam.commentCount,
    //             status: PostsParam.status
    //         },
    //     });

    //     expect(mockPostsModel.findAll).toHaveBeenCalledTimes(1);

    //     expect(findAllPostsData).toEqual("findAll");
    //     expect(mockPostsModel.findAll).toHaveBeenCalledWith({
    //         limit:
    //         {
    //             UserId: PostsParam.UserId,
    //             dogname: PostsParam.dogname,
    //             nickname: PostsParam.nickname,
    //             title: PostsParam.title,
    //             content: PostsParam.content,
    //             losttime: PostsParam.losttime,
    //             lostPhotoUrl: PostsParam.lostPhotoUrl,
    //             lostLatitude: PostsParam.lostLatitude,
    //             lostLongitude: PostsParam.lostLongitude,
    //             views: PostsParam.views,
    //             commentCount: PostsParam.commentCount,
    //             status: PostsParam.status
    //         },
    //     });
    // });

    // // 댕파인더 위치순 조회 실패
    // test("getRecentPosts success test", async () => {
    //     mockPostsModel.findAll = jest.fn(() => {
    //         return "findAll";
    //     });
    //     const PostsParam = {
    //         limit: {
    //             UserId: 1,
    //             dogname: "두부",
    //             nickname: "뱅뱅뱅",
    //             title: "댕댕잃어버림",
    //             content: "찾아줘",
    //             losttime: "2023-05-08T15:52:03.000Z",
    //             lostPhotoUrl: "아무거나.jpg",
    //             lostLatitude: "36.2341",
    //             lostLongitude: "127.2341",
    //             views: 1,
    //             commentCount: 4,
    //             status: 0,
    //         },
    //     };


    //     const findAllPostsData = await postsrepository.getRecentPosts({
    //         limit:
    //         {
    //             UserId: PostsParam.UserId,
    //             dogname: PostsParam.dogname,
    //             nickname: PostsParam.nickname,
    //             title: PostsParam.title,
    //             content: PostsParam.content,
    //             losttime: PostsParam.losttime,
    //             lostPhotoUrl: PostsParam.lostPhotoUrl,
    //             lostLatitude: PostsParam.lostLatitude,
    //             lostLongitude: PostsParam.lostLongitude,
    //             views: PostsParam.views,
    //             commentCount: PostsParam.commentCount,
    //             status: PostsParam.status
    //         },
    //     });

    //     expect(mockPostsModel.findAll).toHaveBeenCalledTimes(1);

    //     expect(findAllPostsData).toEqual("findAll");
    //     expect(mockPostsModel.findAll).toHaveBeenCalledWith({
    //         limit:
    //         {
    //             UserId: PostsParam.UserId,
    //             dogname: PostsParam.dogname,
    //             nickname: PostsParam.nickname,
    //             title: PostsParam.title,
    //             content: PostsParam.content,
    //             losttime: PostsParam.losttime,
    //             lostPhotoUrl: PostsParam.lostPhotoUrl,
    //             lostLatitude: PostsParam.lostLatitude,
    //             lostLongitude: PostsParam.lostLongitude,
    //             views: PostsParam.views,
    //             commentCount: PostsParam.commentCount,
    //             status: PostsParam.status
    //         },
    //     });
    // });

    // // 댕파인더 상세조회 실패
    // test("findPostById success test", async () => {
    //     const mockPost = "findOne"
    //     mockPostsModel.findOne = jest.fn(() => {
    //         return mockPost;
    //     });

    //     const postId = 1

    //     const findPostByIdData = await postsrepository.findPostById({ postId });

    //     expect(mockPostsModel.increment).toHaveBeenCalledTimes(1);
    //     expect(mockPostsModel.increment).toHaveBeenCalledWith("views", {
    //         where: { postId },
    //     });
    //     expect(mockPostsModel.findOne).toHaveBeenCalledTimes(1);
    //     expect(mockPostsModel.findOne).toHaveBeenCalledWith({
    //         where: { postId },
    //     });
    //     expect(findPostByIdData).toEqual(mockPost);
    // });

    // // 댕파인더 게시글 수정 실패
    // test("update success test", async () => {
    //     const mockPost = "update"
    //     mockPostsModel.update = jest.fn(() => {
    //         return mockPost;
    //     });
    //     const PostsParam = {
    //         UserId: 1,
    //         dogname: "수정된 강아지 이름",
    //         title: "ㅇㅁㅈㄹ",
    //         content: "ㅇㅁㄴㅇㄹ",
    //         lostPhotoUrl: "lostPhotoUrl.jpg",
    //         lostLatitude: "36.1234",
    //         lostLongitude: "125.2345",
    //         address: "성북동",
    //         postId: 1
    //     };
    //     const updatePostsData = await postsrepository.updatePost({
    //         UserId: PostsParam.UserId,
    //         dogname: PostsParam.dogname,
    //         title: PostsParam.title,
    //         content: PostsParam.content,
    //         lostPhotoUrl: PostsParam.lostPhotoUrl,
    //         lostLatitude: PostsParam.lostLatitude,
    //         lostLongitude: PostsParam.lostLongitude,
    //         address: PostsParam.address,
    //     });

    //     expect(mockPostsModel.update).toHaveBeenCalledTimes(1);
    //     expect(mockPostsModel.update).toHaveBeenCalledWith(
    //         {
    //             UserId: PostsParam.UserId,
    //             dogname: PostsParam.dogname,
    //             title: PostsParam.title,
    //             content: PostsParam.content,
    //             lostPhotoUrl: PostsParam.lostPhotoUrl,
    //             lostLatitude: PostsParam.lostLatitude,
    //             lostLongitude: PostsParam.lostLongitude,
    //             address: PostsParam.address,
    //         },
    //         {
    //             where: {
    //                 postId: PostsParam.postId
    //             },
    //         }
    //     );
    //     expect(updatePostsData).toEqual(mockPost);
    // })

    // // 댕파인더 삭제 실패
    // test("destroy success test", async () => {
    //     mockPostsModel.destroy = jest.fn(() => {
    //         return "destroy";
    //     });
    //     const PostsParam = {
    //         postId: 1,
    //     };

    //     const destroyPostsData = await postsrepository.deletePostById({
    //         postId: PostsParam.postId,

    //     });

    //     expect(mockPostsModel.destroy).toHaveBeenCalledTimes(1);

    //     expect(mockPostsModel.destroy).toHaveBeenCalledWith({
    //         where: { postId: PostsParam.postId },
    //     });
    //     expect(destroyPostsData).toEqual("destroy");

    // });
});