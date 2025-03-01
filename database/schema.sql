CREATE DATABASE FolioRevised;
USE FolioRevised;

-- Table to store account details
CREATE TABLE account (
    user_name VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin', 'super_admin') NOT NULL
);

-- Table to store posts
CREATE TABLE posts (
    user_name VARCHAR(50) NOT NULL,
    post1 VARCHAR(200),
    post2 VARCHAR(200),
    post3 VARCHAR(200),
    post4 VARCHAR(200),
    post5 VARCHAR(200),
    FOREIGN KEY (user_name) REFERENCES account(user_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- Table to store user following relationships
CREATE TABLE follows (
    user_name VARCHAR(50) NOT NULL,
    follow1 VARCHAR(50),
    follow2 VARCHAR(50),
    follow3 VARCHAR(50),
    FOREIGN KEY (user_name) REFERENCES account(user_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (follow1) REFERENCES account(user_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (follow2) REFERENCES account(user_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (follow3) REFERENCES account(user_name) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- Insert test data for accounts
INSERT INTO account (user_name, password, user_role) VALUES
('john_doe', 'hash123', 'user'),
('jane_smith', 'hash456', 'user'),
('bob_wilson', 'hash789', 'user'),
('alice_brown', 'hashABC', 'user'),
('sarah_lee', 'hashDEF', 'user'),
('admin_mike', 'hashXYZ', 'admin'),
('admin_lisa', 'hash999', 'admin'),
('super_james', 'hash000', 'super_admin'),
('emma_white', 'hash111', 'user'),
('tom_green', 'hash222', 'user');

-- Insert test data for posts
INSERT INTO posts (user_name, post1, post2, post3, post4, post5) VALUES
('john_doe', 'Hello world!', 'Having a great day!', 'Love this platform', NULL, NULL),
('jane_smith', 'New to this platform', 'Making friends here', NULL, NULL, NULL),
('bob_wilson', 'Check out my new photo', 'Weekend vibes', 'Party time!', 'Good morning everyone', NULL),
('alice_brown', 'First post here', NULL, NULL, NULL, NULL),
('sarah_lee', 'Cooking new recipe', 'Food pics coming soon', 'Restaurant review', NULL, NULL),
('emma_white', 'Travel diary day 1', 'Beautiful sunset', 'Missing home', 'New adventures', 'Last day of vacation'),
('tom_green', 'Sports fan here', 'Game day!', NULL, NULL, NULL);

-- Insert test data for follows (only for users)
INSERT INTO follows (user_name, follow1, follow2, follow3) VALUES
('john_doe', 'jane_smith', 'bob_wilson', 'alice_brown'),
('jane_smith', 'john_doe', 'sarah_lee', 'emma_white'),
('bob_wilson', 'john_doe', 'tom_green', NULL),
('alice_brown', 'sarah_lee', NULL, NULL),
('sarah_lee', 'emma_white', 'alice_brown', 'jane_smith'),
('emma_white', 'sarah_lee', 'jane_smith', NULL),
('tom_green', 'bob_wilson', 'john_doe', NULL);
