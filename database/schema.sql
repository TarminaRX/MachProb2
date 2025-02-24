DROP SCHEMA IF EXISTS Folio;
CREATE SCHEMA Folio;
USE Folio;


DROP TABLE IF EXISTS Followers;
CREATE TABLE Followers (follower_id bigint unsigned NOT NULL, following_id bigint unsigned NOT NULL, followed_at timestamp DEFAULT CURRENT_TIMESTAMP NULL, PRIMARY KEY (follower_id, following_id), INDEX following_id (following_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Followers (follower_id, following_id, followed_at) VALUES (1, 2, '2025-02-24 09:40:36');
INSERT INTO Followers (follower_id, following_id, followed_at) VALUES (1, 3, '2025-02-24 09:40:36');
INSERT INTO Followers (follower_id, following_id, followed_at) VALUES (2, 3, '2025-02-24 09:40:36');
INSERT INTO Followers (follower_id, following_id, followed_at) VALUES (3, 1, '2025-02-24 09:40:36');
INSERT INTO Followers (follower_id, following_id, followed_at) VALUES (4, 1, '2025-02-24 09:40:36');
DROP TABLE IF EXISTS Posts;
CREATE TABLE Posts (post_id bigint unsigned NOT NULL AUTO_INCREMENT, user_id bigint unsigned NOT NULL, content text NOT NULL, created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL, PRIMARY KEY (post_id), CONSTRAINT post_id UNIQUE (post_id), INDEX user_id (user_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Posts (post_id, user_id, content, created_at, updated_at) VALUES (1, 1, 'Alice\'s first post!', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Posts (post_id, user_id, content, created_at, updated_at) VALUES (2, 2, 'Bob is here!', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Posts (post_id, user_id, content, created_at, updated_at) VALUES (3, 3, 'Charlie\'s insights on life.', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Posts (post_id, user_id, content, created_at, updated_at) VALUES (4, 4, 'Dave writes his first post about admin stuff.', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (user_id bigint unsigned NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, email varchar(100) NOT NULL, password varchar(255) NOT NULL, role enum('user','admin','super_admin') DEFAULT 'user', created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL, updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL, PRIMARY KEY (user_id), CONSTRAINT user_id UNIQUE (user_id), CONSTRAINT username UNIQUE (username), CONSTRAINT email UNIQUE (email)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Users (user_id, username, email, password, role, created_at, updated_at) VALUES (1, 'alice', 'alice@example.com', 'hashed_password_1', 'user', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Users (user_id, username, email, password, role, created_at, updated_at) VALUES (2, 'bob', 'bob@example.com', 'hashed_password_2', 'admin', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Users (user_id, username, email, password, role, created_at, updated_at) VALUES (3, 'charlie', 'charlie@example.com', 'hashed_password_3', 'user', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
INSERT INTO Users (user_id, username, email, password, role, created_at, updated_at) VALUES (4, 'dave', 'dave@example.com', 'hashed_password_4', 'super_admin', '2025-02-24 09:40:36', '2025-02-24 09:40:36');
ALTER TABLE `Followers` ADD FOREIGN KEY (`follower_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;
ALTER TABLE `Followers` ADD FOREIGN KEY (`following_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;
ALTER TABLE `Posts` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE;
