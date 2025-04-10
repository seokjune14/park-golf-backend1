-- 0. 외래키 체크 해제 (삭제/재생성 방지용)
SET FOREIGN_KEY_CHECKS = 0;

-- 1. 기존 테이블 삭제
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS users;

-- 2. 사용자(users) 테이블 생성
CREATE TABLE users (
  userNum INT AUTO_INCREMENT PRIMARY KEY,        -- 유저 고유번호
  userName VARCHAR(50) NOT NULL,                 -- 이름
  userEmail VARCHAR(100) NOT NULL UNIQUE,        -- 이메일
  userPw VARCHAR(100) NOT NULL,                  -- 비밀번호
  userinfo TEXT,                                 -- 경력 및 자격증 (강사만)
  userImg VARCHAR(255),                          -- 프로필 이미지
  userRole VARCHAR(20) DEFAULT 'user'            -- 역할 (user or instructor)
);

-- 3. 예시 사용자 데이터 삽입
INSERT INTO users (userName, userEmail, userPw, userinfo, userImg, userRole) VALUES
('홍길동', 'hong@gmail.com', '12345678', NULL, NULL, 'user'),
('김강사', 'kang@gmail.com', 'qwer1234', '파크골프 자격증, 대회 수상 경력 있음', 'https://example.com/instructor.jpg', 'instructor');

-- 4. 레슨(lessons) 테이블 생성
CREATE TABLE lessons (
  lesNum INT AUTO_INCREMENT PRIMARY KEY,         -- 레슨 고유번호
  userNum INT NOT NULL,                          -- 강사 번호 (users.userNum)
  lesName VARCHAR(100) NOT NULL,                 -- 레슨 이름
  lesinfo TEXT,                                  -- 레슨 설명
  lesPlace VARCHAR(100),                         -- 장소
  lesPrice INT,                                  -- 가격
  lesTime TIME,                                  -- 시간
  FOREIGN KEY (userNum) REFERENCES users(userNum) ON DELETE CASCADE
);

-- 5. 예시 레슨 데이터 삽입
INSERT INTO lessons (userNum, lesName, lesinfo, lesPlace, lesPrice, lesTime) VALUES
(2, '입문 레슨', '기초부터 배우는 파크골프 입문 과정입니다.', '서울 파크골프장', 20000, '10:00:00'),
(2, '중급 레슨', '실전 중심의 중급자 대상 레슨입니다.', '부산 파크골프장', 30000, '14:00:00');

-- 6. 외래키 체크 다시 활성화
SET FOREIGN_KEY_CHECKS = 1;
