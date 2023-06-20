// const NotificationService = require("@services/notification.service");

// let mocknotificationRepository = {
//     getNotificationsByUserId: jest.fn(),
//     getCommentNotificationsByUserId: jest.fn(),
// };

// let notificationService = new NotificationService();
// // postService의 Repository를 Mock Repository로 변경합니다.
// notificationService.notificationRepository = mocknotificationRepository;

// describe("알림 서비스 유닛 테스트", () => {
//     // 각 test가 실행되기 전에 실행됩니다.
//     beforeEach(() => {
//         jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
//     });

//     // 알림 전체 조회 실패
//     test("알림 서비스 getNotificationsByUserId 메소드", async () => {
//         const getNotificationsByUserIdReturnValue = [
//             {
//                 notificationId: 1,
//                 UserId: 3,
//                 PostId: 7,
//                 CommentId: 9,
//                 ChildCommentId: 5,
//                 isRead: false,
//                 createdAt: "2022-07-25T07:45:56.000Z",
//                 updatedAt: "2022-07-25T07:45:56.000Z",
//                 userPhoto: "any URL",
//                 content: "Comment notifications",
//                 User: {
//                     get: () => ({
//                         nickname: "Junsu Park",
//                         // Any other necessary properties here
//                     })
//                 },
//                 get: () => ({
//                     notificationId: 1,
//                     nickname: "Junsu Park",
//                     userPhoto: "any URL",
//                     content: "Comment notifications",
//                     createdAt: "2022-07-25T07:45:56.000Z",
//                     // Any other necessary properties here
//                 })
//                 // More notifications here if needed
//             },
//             {
//                 notificationId: 1,
//                 UserId: 4,
//                 PostId: 5,
//                 CommentId: 3,
//                 ChildCommentId: 5,
//                 isRead: false,
//                 createdAt: "2022-07-25T07:45:56.000Z",
//                 updatedAt: "2022-07-25T07:45:56.000Z",
//                 userPhoto: "any URL",
//                 content: "Comment notifications",
//                 User: {
//                     get: () => ({
//                         nickname: "Junsu Park",
//                         // Any other necessary properties here
//                     })
//                 },
//                 get: () => ({
//                     notificationId: 1,
//                     nickname: "Junsu Park",
//                     userPhoto: "any URL",
//                     content: "Comment notifications",
//                     createdAt: "2022-07-25T07:45:56.000Z",
//                     // Any other necessary properties here
//                 })
//             }
//         ]


//         const notificationParams = {
//             userId: 1,
//         };

//         mocknotificationRepository.getCommentNotificationsByUserId = jest.fn(() => {
//             return getNotificationsByUserIdReturnValue;
//         });

//         const notificationMessage = await notificationService.getNotificationsByUserId(
//             notificationParams.userId
//         );

//         expect(notificationMessage).toEqual([
//             {
//                 notificationId: 1,
//                 UserId: 3,
//                 PostId: 7,
//                 CommentId: 9,
//                 ChildCommentId: 5,
//                 isRead: false,
//                 createdAt: "2022-07-25T07:45:56.000Z",
//                 updatedAt: "2022-07-25T07:45:56.000Z",
//                 userPhoto: "any URL",
//                 content: "Comment notifications",
//                 User: {
//                     get: () => ({
//                         nickname: "Junsu Park",
//                         // Any other necessary properties here
//                     })
//                 },
//                 get: () => ({
//                     notificationId: 1,
//                     nickname: "Junsu Park",
//                     userPhoto: "any URL",
//                     content: "Comment notifications",
//                     createdAt: "2022-07-25T07:45:56.000Z",
//                     // Any other necessary properties here
//                 })
//             },
//             {
//                 notificationId: 1,
//                 UserId: 4,
//                 PostId: 5,
//                 CommentId: 3,
//                 ChildCommentId: 5,
//                 isRead: false,
//                 createdAt: "2022-07-25T07:45:56.000Z",
//                 updatedAt: "2022-07-25T07:45:56.000Z",
//                 userPhoto: "any URL",
//                 content: "Comment notifications",
//                 User: {
//                     get: () => ({
//                         nickname: "Junsu Park",
//                         // Any other necessary properties here
//                     })
//                 },
//                 get: () => ({
//                     notificationId: 1,
//                     nickname: "Junsu Park",
//                     userPhoto: "any URL",
//                     content: "Comment notifications",
//                     createdAt: "2022-07-25T07:45:56.000Z",
//                     // Any other necessary properties here
//                 })
//             }
//         ],
//         );

//         expect(mocknotificationRepository.getCommentNotificationsByUserId).toHaveBeenCalledTimes(1);
//     });

//     // test("알림 서비스 findOneComment 메소드", async () => {
//     //     const findOneCommentReturnValue = {
//     //         comments: {
//     //             comment_id: 1,
//     //             comment: "댓글 내용",
//     //             user_id: 1,
//     //             nickname: "kim_cool",
//     //             createdAt: "2022-07-25T07:45:56.000Z",
//     //             updatedAt: "2022-07-25T07:52:09.000Z",
//     //         },
//     //     };

//     //     const findOneCommentParams = {
//     //         comment_id: 1,
//     //     };

//     //     mockCommentsRepository.findOneComment = jest.fn(() => {
//     //         return findOneCommentReturnValue;
//     //     });

//     //     const findOneCommentData = await commentsService.findOneComment(
//     //         findOneCommentParams.comment_id
//     //     );

//     //     expect(findOneCommentData).toEqual({
//     //         comments: {
//     //             comment_id: 1,
//     //             comment: "댓글 내용",
//     //             user_id: 1,
//     //             nickname: "kim_cool",
//     //             createdAt: "2022-07-25T07:45:56.000Z",
//     //             updatedAt: "2022-07-25T07:52:09.000Z",
//     //         },
//     //     });

//     //     expect(mockCommentsRepository.findOneComment).toHaveBeenCalledTimes(1);
//     // });
// });

// // __tests__/unit/posts.service.unit.spec.js

// // try {
// //     const deletePost = await postService.deletePost(8888, "1234");
// // } catch (error) {
// //     // 1. postId를 이용해 게시글을 찾고 (PostRepository.findPostById)
// //     expect(mockPostsRepository.findPostById).toHaveBeenCalledTimes(1);
// //     expect(mockPostsRepository.findPostById).toHaveBeenCalledWith(8888);

// //     // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("Post doesn't exist");
// //     expect(error.message).toEqual("Post doesn't exist");
// // }