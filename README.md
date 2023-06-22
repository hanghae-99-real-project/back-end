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
  ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</div>

<br>

## 📒 푸댕 S.A 보러가기

https://www.notion.so/Poo-Daeng-b6a9dfbab28e4295b889bf0040ff1b21

<br>

## 디자인

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

## ✅ BE 트러블 슈팅

##### 1.

```
=>
```

<br>

## BE 팀원

| Role | Name            | GitHub                                                |
| ---- | --------------- | ----------------------------------------------------- |
| BE   | ParkBrianJunSoo | [ParkBrianJunSoo](https://github.com/ParkBrianJunSoo) |
| BE   | 김용식          | [김용식](https://github.com/ystar5008)                |
| BE   | 조우상          | [조우상](https://github.com/juster0706)               |

<br>
