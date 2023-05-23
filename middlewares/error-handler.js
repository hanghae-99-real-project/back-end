const util = require('util');

const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const consoleError = console.error;

console.error = (...args) => {
  consoleError(yellow + util.format(...args) + reset);
};

module.exports = async (error, req, res, next) => {
  // 400번 에러는 여기서 한꺼번에 처리
  if (!error.message) {
    error.message = `400/${error.failedApi}에 실패했습니다.`;
  }

  const [status, errorMessage] = error.message.split("/");
  console.error(error);
  // status를 넘버로 형변환
  return res.status(status).json({ errorMessage });
};
  
  
  
  // 예시 코드
  // ../controllers/posts.controller.js
    // 게시물 수정
    // updatePost = async (req, res, next) => {
    //   console.log("UPDATE");
    //   try {
    //     const { userId } = res.locals.user;
    //     const { postId } = req.params;
    //     const { content } = req.body;
  
    //     const post = await this.postService.findPostById(postId);
    //     if (!post) {
    //       throw new Error("412/게시글이 존재하지 않습니다.");
    //     }
  
    //     if (userId !== post.UserId) {
    //       throw new Error("414/게시글 수정의 권한이 존재하지 않습니다.");
    //     }
  
    //     await this.postService.updatePost(postId, content);
  
    //     return res.status(200).json({ message: "게시물을 수정하였습니다." });
    //   } catch (error) {
    //     error.failedApi = "게시물 수정";
    //     throw error;
    //   }
    // };