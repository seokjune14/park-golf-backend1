-- 0. 외래키 체크 해제 (삭제/재생성 방지용)
SET FOREIGN_KEY_CHECKS = 0;

-- 1. 기존 테이블 삭제
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS users;

-- 2. 사용자(users) 테이블 생성
CREATE TABLE users (
  userNum INT AUTO_INCREMENT PRIMARY KEY,
  userEmail VARCHAR(45) NOT NULL,
  userPw VARCHAR(45) NOT NULL,
  userName VARCHAR(45) NOT NULL,
  userinfo VARCHAR(100) DEFAULT NULL,
  userRole VARCHAR(20) DEFAULT '수강생',
  userImg VARCHAR(255) DEFAULT 'default_userImg.png',
  userlocation1 VARCHAR(45) DEFAULT NULL,
  userlocation2 VARCHAR(45) DEFAULT NULL
);

-- 3. 사용자 예시 데이터 삽입
INSERT INTO users VALUES 
(1,'master1@gmail.com','1111','박강사','박강사의 소개','강사','default_userImg.png',NULL,NULL),
(2,'master2@gmail.com','2222','이강사','이강사의 소개','강사','default_userImg.png',NULL,NULL),
(3,'master3@gmail.com','3333','김강사','김강사의 소개','강사','default_userImg.png',NULL,NULL),
(4,'master4@gmail.com','4444','염강사','염강사의 소개','강사','default_userImg.png',NULL,NULL),
(5,'user1@gmail.com','user1','김수강생',NULL,'수강생','default_userImg.png',NULL,NULL),
(6,'user2@gmail.com','user2','구수강생',NULL,'수강생','default_userImg.png',NULL,NULL),
(7,'user3@gmail.com','user3','원수강생',NULL,'수강생','default_userImg.png',NULL,NULL);

-- 4. 레슨(lessons) 테이블 생성
CREATE TABLE lessons (
  lesNum INT AUTO_INCREMENT PRIMARY KEY,
  userNum INT NOT NULL,
  lesName VARCHAR(100) NOT NULL,
  lesinfo VARCHAR(255) NOT NULL,
  lesPlace VARCHAR(45) NOT NULL,
  lesDetailPlace VARCHAR(45) NOT NULL,
  lesPrice INT NOT NULL,
  lesTime VARCHAR(100) NOT NULL,
  lesThumbImg VARCHAR(255) DEFAULT 'default_lesThumbImg.png',
  lesBackgroundImg VARCHAR(255) DEFAULT 'default_background.png',
  rating DECIMAL(2,1) DEFAULT 0.0,
  CONSTRAINT chk_rating CHECK (rating >= 0.0 AND rating <= 5.0),
  FOREIGN KEY (userNum) REFERENCES users(userNum) ON DELETE CASCADE
);

-- 5. 레슨 예시 데이터 삽입
INSERT INTO lessons VALUES
(1,1,'초보자 달서구 파크골프 레슨','달서구에서 진행하는 초보자 파크골프 레슨','달서구','달서구 파크골프장',100000,'월 1A-1B','default_lesThumbImg.png','default_background.png',5.0),
(2,2,'초보자 달성군 파크골프 레슨','달성군에서 진행하는 초보자 파크골프 레슨','달성군','달성군 파크골프장',110000,'화 2A-2B','default_lesThumbImg.png','default_background.png',4.8),
(3,3,'초보자 수성구 파크골프 레슨','수성구에서 진행하는 초보자 파크골프 레슨','수성구','수성구 파크골프장',120000,'수 3A-3B','default_lesThumbImg.png','default_background.png',3.2),
(4,4,'초보자 중구 파크골프 레슨','중구에서 진행하는 초보자 파크골프 레슨','중구','중구 파크골프장',130000,'목 4A-4B','default_lesThumbImg.png','default_background.png',3.3),
(5,1,'초보자 남구 파크골프 레슨','남구에서 진행하는 파크골프 레슨','남구','남구 파크골프장',140000,'금 5A-5B','default_lesThumbImg.png','default_background.png',4.5),
(6,2,'초보자 북구 파크골프 레슨','북구에서 진행하는 파크골프 레슨','북구','북구 파크골프장',150000,'토 6A-6B','default_lesThumbImg.png','default_background.png',1.3),
(7,3,'초보자 동구 파크골프 레슨','동구에서 진행하는 파크골프 레슨','동구','동구 파크골프장',160000,'일 7A-7B','default_lesThumbImg.png','default_background.png',2.4),
(8,4,'초보자 서구 파크골프 레슨','서구에서 진행하는 파크골프 레슨','서구','서구 파크골프장',170000,'월 8A-8B','default_lesThumbImg.png','default_background.png',2.0),
(9,1,'초보자 군위군 파크골프 레슨','군위군에서 진행하는 파크골프 레슨','군위군','군위군 파크골프장',180000,'화 9A-9B','default_lesThumbImg.png','default_background.png',4.1),
(10,2,'즐거운 파크골프 레슨','부담 없이 즐기며 배우는 파크골프! 초보자도 편하게 시작할 수 있어요.','동구','동구 파크골프장',190000,'수 1A-1B','default_lesThumbImg.png','default_background.png',3.9),
(11,3,'처음 만나는 파크골프','파크골프가 처음인 분들을 위한 입문 레슨입니다. 규칙부터 스윙까지 차근차근 배워보세요.','북구','북구 파크골프장',200000,'목 2A-2B','default_lesThumbImg.png','default_background.png',3.6),
(12,4,'나도 할 수 있다! 파크골프 기초','스윙, 자세, 기본 규칙까지 쉽게 따라할 수 있는 기초 중심 레슨입니다.','서구','서구 파크골프장',210000,'금 3A-3B','default_lesThumbImg.png','default_background.png',0.0),
(13,1,'파크골프 첫걸음','파크골프의 A부터 Z까지! 누구나 쉽게 따라할 수 있는 친절한 기초 입문반입니다.','군위군','군위군 파크골프장',220000,'토 4A-4B','default_lesThumbImg.png','default_background.png',1.7),
(14,1,'초보 탈출 파크골프','기본기를 마스터하고 한 단계 실력 업! 초보자에서 중급자로 성장하는 시간.','달서구','달서구 파크골프장',230000,'일 5A-5B','default_lesThumbImg.png','default_background.png',4.8);

-- 6. 레슨 신청(applications) 테이블 생성
CREATE TABLE applications (
  appId INT AUTO_INCREMENT PRIMARY KEY,
  userNum INT NOT NULL,
  lesNum INT NOT NULL,
  status ENUM('대기', '승인', '거절', '취소') DEFAULT '대기',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userNum) REFERENCES users(userNum) ON DELETE CASCADE,
  FOREIGN KEY (lesNum) REFERENCES lessons(lesNum) ON DELETE CASCADE
);

-- 7. 예시 신청 데이터 삽입
INSERT INTO applications (userNum, lesNum, status) VALUES
(5, 1, '대기'),
(5, 2, '승인');

-- 8. 찜(cart) 테이블 생성
CREATE TABLE cart (
  cartId INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  lessonId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userNum) ON DELETE CASCADE,
  FOREIGN KEY (lessonId) REFERENCES lessons(lesNum) ON DELETE CASCADE
);

-- 9. 외래키 체크 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;
