const Mypagerepository = require("@repositories/mypage.repository");
const BookMarkrepository = require("@repositories/bookMark.repository");


// 가상 모델 생성
let mockMypageModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
};

let mockBookMarkModel = {
    findAll: jest.fn()
}

let mypagerepository = new Mypagerepository(mockMypageModel);
let bookMarksrepository = new BookMarkrepository(mockBookMarkModel);

describe("마이페이지 레포지토리 Unit Test", () => {
    beforeEach(() => {
        // 모든 Mock을 초기화합니다.
        jest.resetAllMocks();
    });

    test("내정보 조회", async () => {
        mockMypageModel.findOne = jest.fn(() => {
            return "내정보 조회";
        });
        const MypageBody = {
            UserId: 1,
        };

        const mypageData = await mypagerepository.getMyInfo(
            MypageBody.UserId
        );

        expect(mockMypageModel.findOne).toHaveBeenCalledTimes(1);
        expect(mypageData).toEqual("내정보 조회");
        expect(mockMypageModel.findOne).toHaveBeenCalledWith({
            where: { userId: MypageBody.UserId },
            attributes: ["userId", "phoneNumber", "nickname", "userPhoto", "position"]
        });
    });
    test("내가 등록한 게시글 조회", async () => {
        const expectedData = "내가 등록한 게시글 조회";
        mockMypageModel.findAll = jest.fn(() => {
            return expectedData;
        });

        const userId = 1;

        const mypageData = await mypagerepository.getMyPost(userId);

        expect(mockMypageModel.findAll).toHaveBeenCalledTimes(1);
        expect(mypageData).toEqual(expectedData);
        expect(mockMypageModel.findAll).toHaveBeenCalledWith({
            where: { UserId: userId },
            attributes: ["postId", "title", "content", "lostPhotoUrl", "createdAt", "updatedAt"],
        });
    });

    test("findOne success test", async () => {
        mockCommentsModel.findOne = jest.fn(() => {
            return "findOne";
        });
        const CommentsParam = {
            comment_id: 1,
        };

        const findOneCommentData = await commentsRepository.findOneComment(
            CommentsParam.comment_id
        );

        expect(mockCommentsModel.findOne).toHaveBeenCalledTimes(1);

        expect(findOneCommentData).toEqual("findOne");
        expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
            where: { comment_id: CommentsParam.comment_id },
        });
    });

    test("update success test", async () => {
        mockCommentsModel.update = jest.fn(() => {
            return "update";
        });
        const CommentsParam = {
            comment: "수정된 댓글",
            comment_id: 1,
            worldcup_id: 12,
        };

        const updateCommentData = await commentsRepository.updateComment(
            CommentsParam.comment,
            CommentsParam.worldcup_id,
            CommentsParam.comment_id
        );

        expect(mockCommentsModel.update).toHaveBeenCalledTimes(1);

        expect(updateCommentData).toEqual("update");
        expect(mockCommentsModel.update).toHaveBeenCalledWith(
            { comment: CommentsParam.comment },
            {
                where: {
                    [Op.and]: [
                        { worldcup_id: CommentsParam.worldcup_id },
                        { comment_id: CommentsParam.comment_id },
                    ],
                },
            }
        );
    });

    test("destroy success test", async () => {
        mockCommentsModel.destroy = jest.fn(() => {
            return "destroy";
        });
        const CommentsParam = {
            comment_id: 1,
            worldcup_id: 12,
            user_id: 4,
        };

        const destroyCommentData = await commentsRepository.deleteComment(
            CommentsParam.worldcup_id,
            CommentsParam.comment_id,
            CommentsParam.user_id
        );

        expect(mockCommentsModel.destroy).toHaveBeenCalledTimes(1);

        expect(destroyCommentData).toEqual("destroy");
        expect(mockCommentsModel.destroy).toHaveBeenCalledWith({
            where: {
                [Op.and]: [
                    { worldcup_id: CommentsParam.worldcup_id },
                    { comment_id: CommentsParam.comment_id },
                    { user_id: CommentsParam.user_id },
                ],
            },
        });
    });
});