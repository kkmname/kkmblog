INSERT INTO category (id, name, description, parent_id, display_order, is_active, created_at, updated_at) VALUES 
(1, 'Home', '메인 홈 페이지 카테고리', NULL, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Journal', '공개 블로그 아티클 카테고리', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Private', '비공개 아티클 카테고리', NULL, 3, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO category (id, name, description, parent_id, display_order, is_active, created_at, updated_at) VALUES 
(4, 'kwangminkim', '개인 카테고리', 3, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'draft', '초안', 3, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'api', 'API 관련 노트', 3, 3, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'git', 'Git 관련 노트', 3, 4, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'java', 'Java 개발 노트', 3, 5, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'linux', 'Linux 관련 노트', 3, 6, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'projects', '프로젝트 관련 노트', 3, 7, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'vscode', 'VSCode 관련 노트', 3, 8, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'windows', 'Windows 관련 노트', 3, 9, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Category ALTER COLUMN id RESTART WITH 13;

INSERT INTO Article (id, category_id, title, content, is_active, created_date, updated_date) VALUES
(1, 2, 'First Blog Post', '첫 번째 블로그 글 내용', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Second Blog Post', '두 번째 블로그 글 내용', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Private Note', '비공개 노트 내용', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Article ALTER COLUMN id RESTART WITH 4;


INSERT INTO Comment (id, article_id, email, content, is_active, created_date, updated_date) VALUES
(1, 1, 'admin@example.com', '관리자 댓글', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'guest@example.com', '비회원 댓글', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Comment ALTER COLUMN id RESTART WITH 3;


INSERT INTO Member (id, email, password, name, subscription) VALUES
(1, 'admin@example.com', 'password123', '관리자', TRUE),
(2, 'user1@example.com', 'password123', '사용자1', TRUE);


ALTER TABLE Member ALTER COLUMN id RESTART WITH 3;