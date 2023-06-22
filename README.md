# 푸댕(pooDaeng)

> 푸댕은 서울시의 반려견 배변 시설 위치와 길 안내, 반려견의 실종 위치와 사용자들의 제보를 제공하는 서비스입니다.

<div style="display: flex">
<img src="https://i.ibb.co/pr223TM/pooDaeng.png">
</div>
<br>



## ⚙️ BE Tech Stack

<div style="display: flex">
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=fff"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=fff"/>
  <img src="https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=fff"/>
  <img src="https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=npm&logoColor=fff"/>
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kakao_Map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black"/>
  <img src="https://img.shields.io/badge/TMap-000000?style=for-the-badge&logo=sktelecom&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_EC2-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_RDS-007BFF?style=for-the-badge&logo=amazon-rds&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS_CodeDeploy-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>

</div>

<br>



## 📒 푸댕 S.A 보러가기

![푸댕 S.A](https://github.com/hanghae-99-real-project/back-end/assets/125964794/e5472469-3da5-4f58-b913-40a43de77010)
[푸댕 S.A](https://www.notion.so/Poo-Daeng-b6a9dfbab28e4295b889bf0040ff1b21)

<br>



## 디자인

![푸댕 S.A](https://github.com/hanghae-99-real-project/back-end/assets/125964794/e5472469-3da5-4f58-b913-40a43de77010)
[푸댕 디자인](https://www.figma.com/file/pBnEtEMaoNtBYKXftbYfKW/%ED%91%B8%EB%8C%95-%EB%94%94%EC%9E%90%EC%9D%B8?type=design&node-id=0-1&mode=design&t=Ik37bQY8HltMvWNF-0)

<br>



## 🛠 Project Architecture

![KakaoTalk_20230622_174339706](https://github.com/hanghae-99-real-project/back-end/assets/125964794/c8d5c614-ae6f-4c1d-9e09-1b1ff691802f)

<br>



## ✨ 프로젝트 기능 정리

1. 회원가입: 유저 위치 동의, 이미지 업로드, 휴대폰 번호 인증

2. 로그인, 로그아웃: Access-token과 Refresh-token을 사용한 로그인 인증, 소셜 로그인(카카오)

3. 메인화면: 푸박스 조회, 댕파인더 조회(로그인 한 유저 중 위치정보 동의한 유저는 반경 5km 내외의 댕파인더 10개 조회, 로그인 하지 않은 유저와 로그인 한 유저 중 위치정보 동의하지 않은 유저는 댕파인더 10개 랜덤 조회)

4. 마이페이지: 조회, 프로필 수정(nickname & password), 유저가 작성한 글 조회, 유저가 등록한 푸박스 조회, 유저가 등록한 북마크 조회

5. 푸박스: 등록(30m 내외에 등록한 푸박스가 있으면 푸박스 등록 X (중복 등록 막기 위해서)), 조회(KAKAO API 지도, 푸박스 정보, 푸박스 상세 정보), 푸박스 신고(5회 신고 시 푸박스 자동 삭제)

6. 푸박스 네비게이션: 등록된 푸박스로 가는 최단 루트 길찾기(주소, 최소 시간, geolocation, TMAP API)

7. 댕파인더 게시글: 반려견 실종 신고 작성, 반려견 실종 신고 최신순으로 조회, 반려견 실종 신고 유저 현위치에서 가까운 순으로 조회, 반려견 실종 신고 조회(찾았어요), 반려견 실종 신고 상세 조회, 반려견 실종 신고 수정, 반려견 실종 신고 삭제, 반려견 실종 신고 북마크(등록, 삭제), 검색, 페이지네이션

8. 댓글, 비밀 댓글: 작성, 조회, 수정, 삭제

9. 대댓글, 비밀 대댓글: 작성, 조회, 삭제

<!-- 9. 알림: 생성(댓글, 대댓글), 조회, 알림 읽음 처리 -->

<br>



## ⚙️ ERD

<div style="display: flex">
<img src="https://i.ibb.co/Dp3wVSg/poo-Daeng-ERD.png">
</div>

<br>



## BE 팀원

| Role | GitHub                                                |
| ---- | ----------------------------------------------------- |
| BE   | [ParkBrianJunSoo](https://github.com/ParkBrianJunSoo) |
| BE   | [김용식](https://github.com/ystar5008)                |
| BE   | [조우상](https://github.com/juster0706)               |

<br>



## 🛠️ BE 트러블 슈팅 🛠️

### 1. 푸박스 post 요청시 아래 에러 코드가 응답으로 반환
```bash
500 Internal Server Error
```
#### 처음 생각한 에러 이유

- 처음 클라이언트와 서버가 통신하는 테스트였기때문에 당연하게도 데이터를 주고받는 형식에 문제가 있을거라고 생각하여 서버와 클라이언트의 데이터 송수신 부분 코드를 확인했고 , 클라이언트 요청에서 잘못된 key로 데이터를 넘겨주는것 확인 , 수정 후 재요청

#####수정후 post 요청시 토큰 검증 미들웨어 에서 설정한 419 에러 발생
```javacript
if (!isRefreshTokenValidate) {
            return res.status(419).json({ errorMessage: "Refresh Token이 만료되었습니다." });
        }
```
#### 의심된 부분
- 데이터 형식은 정상적으로 전달이 되었으나 그 사실을 알지 못하고 계속해서 데이터 형식과 경로에 문제가 있다고 생각하여 서버와 클라이언트 각자 데이터를 주고받는 코드를 계속해서 수정하고 테스트함

#### 문제된 부분
- 클라이언트에서 서버로 `accesstoken`과 `refreshtoken`을 보내주는 형식이 맞지 않아 서버에서 토큰을 제대로 받지 못하는 문제
- 클라이언트에는 `refreshtoken`에 `bearer` 타입을 명시하지않고 전송함
- 서버에서는 `refreshtoken`에 `bearer`타입과 토큰을 구조분해 하는 코드를 작성했음

```javascript
res.cookie("accesstoken", Bearer ${accessToken});
res.cookie("refreshtoken", Bearer ${refreshToken});
```

#### 해결방법
- 라이언트에서 토큰 전송시 `bearer` 타입을 제외하고 전송
- 서버에서도 `accesstoken` 만 `bearer` 타입을 작성하고 `refreshtoken`에는 타입을 작성하지 않음

```javascript
res.cookie("accesstoken", Bearer ${accessToken});
res.cookie("refreshtoken", ${refreshToken});
```



### 2. 댓글, 대댓글, 비밀 댓글, 비밀 대댓글 조회 로그인 하지 않은 유저 설정
- 비밀 댓글은 로그인 한 유저만 볼 수 있다.
- 일반 댓글은 로그인을 하지 않은 유저도 볼 수 있다.
- 비밀 대댓글은 로그인 한 유저만 볼 수 있다.
- 일반 대댓글은 로그인을 하지 않은 유저도 볼 수 있다.
`{userId}= res.locals.user`으로 하면 로그인을 하지 않은 유저는 아무것도 볼 수 없기에 `authmiddleware`에서 가짜 사용자 객체를 추가 해주었다.

```javascript
// refreshtoken이 없거나 accesstoken의 형식이 올바르지 않을 때
if ((!refreshtoken) || (authAccessType !== "Bearer" || !authAccessToken)) {
   // 로컬에 사용자 정보를 null로 설정 // 가짜 사용자 객체를 만듬
   res.locals.user = { userId: null };
   // 다음 미들웨어로 진행
   return next();
}
```
```javascript
const { userId } = res.locals.user
```
이 부분을 밑과 같이 바꿈
```javascript
// 로그인을 했을 때와 로그인을 하지 않았을 때의 사용자 구분
const userId = res.locals.user ? res.locals.user.userId : null; 
```
- `user` 객체가 `res.locals`에 존재하는지 확인
- `? res.locals.user.userId : null;` 만약 `res.locals.user`가 존재하면 `true`, `res.locals.user.userId`가 `userId` 변수에 할당
- `? res.locals.user.userId : null;` 만약 `res.locals.user`가 존재하면 `false`, 
`null`이 `userId` 변수에 할당

이렇게 바꿔서 로그인을 한 유저는 댓글, 비밀 댓글, 대댓글, 비밀 대댓글을 조회할 수 있고, 
로그인을 하지 않은 유저는 댓글, 대댓글만 조회가 가능하게 끔 설정을 해 두었다.

1. 일반 댓글 작성 - 로그인한 유저는 게시물에 일반 댓글을 작성 가능
    일반 댓글 조회 - 일반 댓글은 모든 유저가 조회 가능. 로그인 하지 않은 유저도 조회 가능
2. 일반 댓글에 일반 대댓글 작성 - 로그인한 유저는 일반 댓글에 일반 대댓글 작성 가능
    일반 댓글에 일반 대댓글 조회 - 일반 대댓글은 모든 유저가 조회 가능. 로그인 하지 않은 유저도 조회 가능
3. 일반 댓글에 비밀 대댓글 작성 - 로그인한 유저는 일반 댓글에 비밀 대댓글 작성 가능
    일반 댓글에 비밀 대댓글 조회 - 비밀 대댓글 작성자와 상위 댓글 작성자만 조회 가능 -- OR -- 비밀 대댓글 작성자, 상위 댓글 작성자, 게시물 작성자도 조회 되게끔 가능 -- 둘 중 후자 선택
4. 비밀 댓글 작성 - 로그인한 유저는 게시물에 비밀 댓글을 작성 가능
    비밀 댓글 조회 - 비밀 댓글 작성자와 게시물 작성자만 조회 가능
5. 비밀 댓글에 일반 대댓글 작성 - 불가능하도록 설정 
    비밀 댓글에 일반 대댓글 조회 - 불가능하도록 설정. 비밀 댓글에는 비밀 대댓글만 작성 가능
6. 비밀 댓글에 비밀 대댓글 작성 - 게시물 작성자와 비밀 댓글 작성자만 비밀 댓글에 비밀 대댓글 작성 가능
    비밀 댓글에 비밀 대댓글 조회 - 게시물 작성자와 비밀 댓글 작성자만 비밀 대댓글 조회 가능



### 3. Error Handler 실패
```javascript
// ./middlewares/error-handler.js
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
try {

} catch (error) {
  error.failedApi = "알림 읽음 or 안읽음"
  throw error;
}
```
이런식으로 `error`을 `throw`를 해주면 `error handler`이 작동하지 않는다.

#### 시도
`app.js`에 `app.use(errorHandler)`을 제일 마지막에 있던 것을 살짝 위로도 올려보았고 다른 파일들도 확인해보았다.

#### 해결
```javascript
try {
} catch (error) {
  error.failedApi = "알림 읽음 or 안읽음"
  next(error);
}
```
비동기 함수에서 `throw` 문을 사용하면 예외는 해당 함수에서 즉시 잡히지 않고, 프로미스 체인에 전파된다.
`throw` 문은 비동기 함수에서 에러를 던지는 데 사용할 수 없다.
미들웨어와 라우터는 항상 `next` 함수를 호출하여 에러를 전달함. `throw error`를 사용하면 에러가 `error-handler`에 전달되지 않는다.
비동기 함수에서는 항상 `next(error)` 사용해야 한다.
`throw new Error("403/해당 알림을 확인할 수 없습니다.");`
이부분은 되는 이유는 `try catch` 문 내에서 `throw`문을 사용하면, `catch` 문이 이 에러를 잡고 `next`로 에러핸들러에 던져줄 수 있다.`

#### 몰랐던 부분
`app.js`에 `require("express-async-errors");` 이부분을 추가해주면 `throw error`을 써도 `app.js`를 거쳐 에러핸들러해 던져준다.
`express-async-errors`라는 모듈을 가져오는 `Node.js` 문이다.
이 모듈이 없으면 비동기 경로 및 미들웨어 내부에서 발생하는 오류가 처리되지 않아 서버 충돌이 발생하거나 서버가 무기한 중단될 수 있다. 이 모듈을 사용하면 비동기 함수에서 발생하는 모든 오류가 미들웨어로 전달된다.



### 4. 조회 부분 테스트 코드를 작성하던 중, 조회, 상세조회 부분의 날짜가 맞지 않는다.
```javascript
test('댕파인더 컨트롤러 getPostById 메소드 유닛 테스트 성공 케이스', async () => {
        const mockGetPostsData =
        {
            postId: 3,
            UserId: 1,
            nickname: "조형민",
            dogname: "양성",
            title: '양성',
            content: "<p>양성</p>",
            lostPhotoUrl: [
                "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-15-7-40-4_2472548"
            ],
            losttime: null,
            lostLatitude: "37.17342092960466",
            lostLongitude: "128.47409107526380",
            address: "강원특별자치도 영월군 영월읍 덕포리 797",
            views: 16,
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            BookMarks: []
        };

        const mockRequestParams = {
            postId: 3,
        }

        postController.postControllerService = {
            getPostById: jest.fn(() => mockGetPostsData),
        };

        mockRequest.params = mockRequestParams;

        await postController.getPostById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockGetPostsData);
    });
```
밑 부분은 테스트 코드 실패
```bash
● 댕파인더 컨트롤러 유닛 테스트 › 댕파인더 컨트롤러 getPostById 메소드 유닛 테스트 성공 케이스

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    - Expected
    + Received

    @@ -1,11 +1,11 @@
      Object {
        "BookMarks": Array [],
        "UserId": 1,
        "address": "강원특별자치도 영월군 영월읍 덕포리 797",
        "content": "<p>양성</p>",
		-   "createdAt": 2023-06-16T05:54:26.289Z,
    +   "createdAt": 2023-06-15T07:40:04.000Z,
        "dogname": "양성",
        "lostLatitude": "37.17342092960466",
        "lostLongitude": "128.47409107526380",
        "lostPhotoUrl": Array [
          "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-15-7-40-4_2472548",
    @@ -13,8 +13,8 @@
        "losttime": null,
        "nickname": "조형민",
        "postId": 3,
        "status": false,
        "title": "양성",
		-   "updatedAt": 2023-06-16T05:54:26.289Z,
    +   "updatedAt": 2023-06-16T05:54:26.000Z,
        "views": 7,
      },

    Number of calls: 1

      160 |         expect(mockResponse.status).toHaveBeenCalledTimes(1);
      161 |         expect(mockResponse.status).toHaveBeenCalledWith(200);
    > 162 |         expect(mockResponse.json).toHaveBeenCalledWith(mockGetPostsData);
          |                                   ^
      163 |     });
      164 |
      165 |

      at Object.toHaveBeenCalledWith (test/unit/testcontrollers/posts.controller.unit.spec.js:162:35)
```
이 부분이 맞지 않아 테스트 코드가 실패하였다고 뜬다. 
```bash
		-   "createdAt": 2023-06-16T05:54:26.289Z,
    +   "createdAt": 2023-06-15T07:40:04.000Z,
		-   "updatedAt": 2023-06-16T05:54:26.289Z,
    +   "updatedAt": 2023-06-16T05:54:26.000Z,
```
날짜의 시간이 맞지 않는다.

#### 시도 
- `new Date()`로 했더니 날짜와 시간이 맞지 않아 실패
- `new Date().toISOString()`로 했더니 날짜와 시간이 맞지 않을 뿐더러 string 값이 나와 실패
- `new Date().toISOString()`을 빼고 `“2023-06-16T05:54:26.289Z”` string 값으로 넣어보았지만 날짜가 string으로 나와서 Received와 다르다고 실패
- 밑과 같은 부분을 추가하여 `updatedAt`은 밀리 초 단위로 끊어 똑같이 만들어 주었다. 성공

```javascript
const dateWithoutMilliseconds = new Date();
dateWithoutMilliseconds.setMilliseconds(0);
const specificDate = new Date('2023-06-15T07:40:04Z');
```
하지만 `createdAt`을 `new Date`으로 똑같이 맞춰줬는데 실패

#### 해결
생성을 할 때 createdAt을 임의로 지정하고 조회 때 임의로 지정된 createdAt과 updatedAt을 써준다.



### 5. Jest에서 Module Alias 인식 실패
`module-alias` 모듈을 설치하여 ../를 사용하여 폴더를 위로 올릴 필요 없이 `@controller, @services,…` 로 상위 폴더를 갖고 올 수 있다.
`package.json` 설정

```package.json
"_moduleAliases": {
    "@root": ".",
    "@controllers": "controllers",
    "@services": "services",
    "@repositories": "repositories",
    "@models": "models",
    "@middlewares": "middlewares",
    "@modules": "modules"
  },
```

이렇게 `@`로 지정을 하여 상위 폴더를 갖고 올 수 있는데, `Jest` 테스트 코드를 하려고 하던 와중
`const PostController = require("@controllers/posts.controller");`를 `Jest`에서 인식할 수 없다고 나왔다.
`Jest`는 `package.json`의 `_moduleAliases` 섹션에서 별칭을 자동으로 바꿔주지 않는다.
`Node.js`는 런타임을 구성하기 때문에 `module-alias`를 쓸 수 있지만 `Jest`는 그렇지 않다.
변환 프로세스를 통해 `module-alias`를 `Jest`에서 사용해 보았다.
변환 프로세스인 `babel-plugin-module-resolver`를 설치하여 Jest를 동일한 방식으로 모듈 경로를 확인할 수 있도록 설정했다.
`.babelrc` 혹은 `babel.config.json` 파일을 만들어 다음과 같은 코드를 작성하였다.
`package.json` 파일이 복잡해지는 것을 방지하기 위해 바벨 파일을 따로 만들었다.

```javascript
{
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "@root": "./",
          "@controllers": "./controllers",
          "@services": "./services",
          "@repositories": "./repositories",
          "@models": "./models",
          "@middlewares": "./middlewares",
          "@modules": "./modules"
        }
      }
    ]
  ]
}
```

바벨을 사용하도록 `package.json`에 `Jest`를 재구성을 해주었다.

```package.json
"jest": {
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "^@root/(.*)$": "<rootDir>/$1",
    "^@controllers/(.*)$": "<rootDir>/controllers/$1",
    "^@services/(.*)$": "<rootDir>/services/$1",
    "^@repositories/(.*)$": "<rootDir>/repositories/$1",
    "^@models$": "<rootDir>/models",
    "^@middlewares/(.*)$": "<rootDir>/middlewares/$1",
    "^@modules/(.*)$": "<rootDir>/modules/$1"
  }
}
```

여기서 사용되는 기호들은  `Jest` 설정에 사용되는 JSON 구문이다. 이 구문은 `Jest`가 테스트를 수행하는 방식을 정의한다.

```package.json
"transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
```

이부분은 Jest가 모듈을 가져오기 전 변환한다. 
`babel-jest` 변환기는 Jest가 `ES6+` 문법과 `JSX`를 이해할 수 있게 한다.
이는 `.js` 또는 `.jsx` 확장자를 가진 파일에 적용된다.

```package.json
"moduleNameMapper": {
    "^@root/(.*)$": "<rootDir>/$1",
    "^@controllers/(.*)$": "<rootDir>/controllers/$1",
    "^@services/(.*)$": "<rootDir>/services/$1",
    "^@repositories/(.*)$": "<rootDir>/repositories/$1",
    "^@models$": "<rootDir>/models",
    "^@middlewares/(.*)$": "<rootDir>/middlewares/$1",
    "^@modules/(.*)$": "<rootDir>/modules/$1"
  }
```

`moduleNameMapper`은 모듈 경로를 가상의 경로로 대체할 수 있게 해준다.
`<rootDir>`는 Jest가 실행되는 디렉토리인데 `@controllers/post.controller.js`의 형태로 모듈을 가져오고 싶다면 이를 실제 경로인 `<rootDir>/controllers/post.controller.js`로 매핑하도록 설정할 수 있다.
이렇게 바벨을 설치하여 설정해두면 `Jest`에서도 `module-alias`를 사용할 수 있다.



### 6. 테스트 코드를 위해 DB를 복제하던 중 에러 발생
`DB`를 복제하는 방법은 다음과 같다.

#### 테스트용 DB 생성
1. 먼저 `cmd`를 키고 `MySQL` 인터페이스에 로그인을 한다.

```bash
mysql -h [hostname] -u [username] -p
```

1. 밀번호 입력
2. 명령어를 사용하여 새 데이터베이스 생성

```bash
CREATE DATABASE [database];
```

`;` 까지 입력
이렇게 하면 `DB`가 생성된 걸 볼 수 있다.
참고로 DB가 생성된 것을 보려면 다음과 같이 명령어를 입력해야 한다.

```bash
SHOW DATABASES;
```

#### DB data 복사
1. 커멘드를 키고 다음과 같이 입력하여 `DB` 안에 있는 모든 `data`를 복사한다.

```bash
mysqldump -h [hostname] -u [username] -p [database] > [output_file]
```

예시

```bash
mysqldump -h 어쩌구저쩌구.어쩌구저쩌구.amazonaws.com -u 어쩌구저쩌구 -p 어쩌구저쩌구 > 어쩌구저쩌구.sql
```

1. 비밀번호 입력
어쩌구저쩌구.sql 파일이 생성된다.
윈도우 창에서 검색을 해보면 파일이 생성된걸 볼 수 있다.

#### DB data 붙여넣기
1. 복사한 `data`를 새로 생성한 테스트용 `DB`에 붙여넣는다.

```bash
mysql -h [hostname] -u [username] -p [new database] < [output_file]
```

1. 비밀번호 입력
이렇게 하면 복사된 데이터가 새로 생성한 테스트용 `DB`에 붙여넣어 져야하는데 다음과 같은 에러가 뜬다.

```bash
뭐시기저시기어쩌구저쩌구
Enter password: ********
ERROR 1227 (42000) at line 18: Access denied; you need (at least one of) 
the SUPER, SYSTEM_VARIABLES_ADMIN or SESSION_VARIABLES_ADMIN privilege(s) 
for this operation
```

이 오류는 사용 중인 `MySQL` 사용자에게 스크립트에서 특정 작업을 실행하는데 필요한 권한이 없음을 나타낸다.
18번째 줄에서 막힌다고 뜨는 것을 볼 수 있다.
1. 생선된 `SQL` 파일을 윈도우 창에서 검색을 하여 파일을 열어준다.
2. 18번째 줄을 주석처리 해주고 위에 붙여넣기를 입력했던 부분을 다시 입력해준다.

```bash
mysql -h [hostname] -u [username] -p [new database] < [output_file]
```

그러면 다음과 같은 에러가 나타나는 것을 볼 수 있다.

```bash
뭐시기저시기어쩌구저쩌구
Enter password: ********
ERROR 1227 (42000) at line 24: Access denied; you need (at least one of) 
the SUPER, SYSTEM_VARIABLES_ADMIN or SESSION_VARIABLES_ADMIN privilege(s) 
for this operation
```

1. 24번째 줄을 주석처리 해주고 또 똑같이 위에 붙여넣기를 입력했던 부분을 다시 입력해준다.
그러면 다음과 같은 에러가 나타나는 것을 볼 수 있다.

```bash
뭐시기저시기어쩌구저쩌구
Enter password: ********
ERROR 1227 (42000) at line 352: Access denied; you need (at least one of) 
the SUPER, SYSTEM_VARIABLES_ADMIN or SESSION_VARIABLES_ADMIN privilege(s) 
for this operation
```

1. 352번째 줄을 주석처리 해주고 또 똑같이 위에 붙여넣기를 입력했던 부분을 다시 입력해준다.
이 과정을 거치고 나면 새로 생성한 `DB`에 `SQL` 파일이 붙여넣어지는 것을 볼 수 있다.

### 오류 발생 이유

```javascript
// 18번 줄
SET @@SESSION.SQL_LOG_BIN= 0;

//24번 줄
SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

//352번 줄
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
```

바이너리 로깅을 비활성화하거나 활성화하는데 특정 관리 권한이 필요하기 때문이다(바이너리 로깅 -  `MySQL` 의 기능으로 데이터베이스에 대한 변경 사항을 바이너리 로그 파일에 기록). `AWS RDS` 및 기타 관리형 데이터베이스 서비스에서는 이러한 관리 권한이 일반적으로 사용자에게 부여되지 않는다. 왜냐하면 동일한 서버의 다른 데이터베이스에 영향을 줄 수 있기 때문이다.
`dump`는 새 데이터베이스에 가져올 때 복제나 복구가 수행되지 않으며 바이너리 로깅을 비활성화할 필요가 없다.
보통 데이터 무결성을 유지하는데 중요해서 비활성화하려는 경우는 별로 없다.
18, 24, 352번째 줄은 특정 변경 사항이 복제되는 것을 방지하거나 바이너리 로그를 작성하면 오버헤드가 추가될 수 있어서 규모가 큰 데이터 변경 속도를 높이기 위해 수행할 수 있다.
보통은 복제 또는 복구에 이진 로깅이 필요하지 않다고 확신하지 않는 한 이진 로깅을 비활성화하지 않는 것이 좋다고 하는데 테스트 코드용으로만 쓰는 것이라면 괜찮아 보인다.
따라서 18, 24, 352번째 줄을 삭제하거나 주석 처리를 하면 된다.




<br>

