INSERT INTO categories (id, title, slug, description, parent_id, position, is_active, created_date, updated_date) VALUES 
(1, 'Home', 'home', '홈', NULL, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Daily', 'daily','일상', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Personal', 'personal','비공개', NULL, 3, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO categories (id, title, slug, description, parent_id, position, is_active, created_date, updated_date) VALUES 
(4, 'Development', 'development', '개발', 3, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Projects', 'projects', '프로젝트', 4, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'paper', 'paper', 'kkm-papar project', 5, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(7, 'Draft', 'draft', '초안', 3, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE categories ALTER COLUMN id RESTART WITH 8;

INSERT INTO Article (id, category_id, title, content, is_active, created_date, updated_date) VALUES
(1, 2, 'First Blog Post', '첫 번째 블로그 글 내용', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Second Blog Post', '두 번째 블로그 글 내용', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Private Note', '비공개 노트 내용', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Article ALTER COLUMN id RESTART WITH 4;


INSERT INTO Comment (id, article_id, email, content, is_active, created_date, updated_date) VALUES
(1, 1, 'admin@example.com', '관리자 댓글', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'guest@example.com', '비회원 댓글', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Comment ALTER COLUMN id RESTART WITH 3;

INSERT INTO Member (id, email, password, name, subscription, created_date, updated_date) VALUES
(1, 'admin@example.com', 'password', '관리자', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'user1@example.com', 'password123', '사용자1', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE Member ALTER COLUMN id RESTART WITH 3;