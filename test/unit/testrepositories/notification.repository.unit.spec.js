// const Commentsrepository = require("../../../repositories/comments.repository");
// const { Op } = require("sequelize");

// // 가상 모델 생성
// let mockCommentsModel = {
//     create: jest.fn(),
//     findAll: jest.fn(),
//     findOne: jest.fn(),
//     update: jest.fn(),
//     destroy: jest.fn(),
// };

// let commentsRepository = new Commentsrepository(mockCommentsModel);

// describe("WorldcupRepository Unit Test", () => {
//     beforeEach(() => {
//         // 모든 Mock을 초기화합니다.
//         jest.resetAllMocks();
//     });

//     test("create success test", async () => {
//         mockCommentsModel.create = jest.fn(() => {
//             return "created";
//         });
//         const CommentsBody = {
//             comment: "comment",
//             worldcup_id: 1,
//             user_id: 1,
//         };

//         const createCommentData = await commentsRepository.createComment(
//             CommentsBody.comment,
//             CommentsBody.worldcup_id,
//             CommentsBody.user_id
//         );

//         expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

//         expect(createCommentData).toEqual("created");
//         expect(mockCommentsModel.create).toHaveBeenCalledWith({
//             comment: CommentsBody.comment,
//             worldcup_id: CommentsBody.worldcup_id,
//             user_id: CommentsBody.user_id,
//         });
//     });

//     test("findAll success test", async () => {
//         mockCommentsModel.findAll = jest.fn(() => {
//             return "findAll";
//         });
//         const CommentsParam = {
//             worldcup_id: 1,
//         };

//         const findAllCommentData = await commentsRepository.findAllComments(
//             CommentsParam.worldcup_id
//         );

//         expect(mockCommentsModel.findAll).toHaveBeenCalledTimes(1);

//         expect(findAllCommentData).toEqual("findAll");
//         expect(mockCommentsModel.findAll).toHaveBeenCalledWith({
//             where: { worldcup_id: CommentsParam.worldcup_id },
//         });
//     });

//     test("findOne success test", async () => {
//         mockCommentsModel.findOne = jest.fn(() => {
//             return "findOne";
//         });
//         const CommentsParam = {
//             comment_id: 1,
//         };

//         const findOneCommentData = await commentsRepository.findOneComment(
//             CommentsParam.comment_id
//         );

//         expect(mockCommentsModel.findOne).toHaveBeenCalledTimes(1);

//         expect(findOneCommentData).toEqual("findOne");
//         expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
//             where: { comment_id: CommentsParam.comment_id },
//         });
//     });

//     test("update success test", async () => {
//         mockCommentsModel.update = jest.fn(() => {
//             return "update";
//         });
//         const CommentsParam = {
//             comment: "수정된 댓글",
//             comment_id: 1,
//             worldcup_id: 12,
//         };

//         const updateCommentData = await commentsRepository.updateComment(
//             CommentsParam.comment,
//             CommentsParam.worldcup_id,
//             CommentsParam.comment_id
//         );

//         expect(mockCommentsModel.update).toHaveBeenCalledTimes(1);

//         expect(updateCommentData).toEqual("update");
//         expect(mockCommentsModel.update).toHaveBeenCalledWith(
//             { comment: CommentsParam.comment },
//             {
//                 where: {
//                     [Op.and]: [
//                         { worldcup_id: CommentsParam.worldcup_id },
//                         { comment_id: CommentsParam.comment_id },
//                     ],
//                 },
//             }
//         );
//     });

//     test("destroy success test", async () => {
//         mockCommentsModel.destroy = jest.fn(() => {
//             return "destroy";
//         });
//         const CommentsParam = {
//             comment_id: 1,
//             worldcup_id: 12,
//             user_id: 4,
//         };

//         const destroyCommentData = await commentsRepository.deleteComment(
//             CommentsParam.worldcup_id,
//             CommentsParam.comment_id,
//             CommentsParam.user_id
//         );

//         expect(mockCommentsModel.destroy).toHaveBeenCalledTimes(1);

//         expect(destroyCommentData).toEqual("destroy");
//         expect(mockCommentsModel.destroy).toHaveBeenCalledWith({
//             where: {
//                 [Op.and]: [
//                     { worldcup_id: CommentsParam.worldcup_id },
//                     { comment_id: CommentsParam.comment_id },
//                     { user_id: CommentsParam.user_id },
//                 ],
//             },
//         });
//     });
// });