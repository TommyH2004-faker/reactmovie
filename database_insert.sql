-- SQL Commands để thêm dữ liệu phim vào cơ sở dữ liệu
-- Dựa trên mock data từ HomePage

-- Tạo bảng movies nếu chưa có
CREATE TABLE IF NOT EXISTS movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    poster_url VARCHAR(500),
    backdrop_url VARCHAR(500),
    release_date DATE,
    duration INT,
    rating DECIMAL(3,1),
    slug VARCHAR(255) UNIQUE,
    trailer_url VARCHAR(500),
    status VARCHAR(50),
    type VARCHAR(50),
    country VARCHAR(100),
    director VARCHAR(255),
    cast TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng genres nếu chưa có
CREATE TABLE IF NOT EXISTS genres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng movie_genres (many-to-many relationship)
CREATE TABLE IF NOT EXISTS movie_genres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    genre_id INT,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE,
    UNIQUE KEY unique_movie_genre (movie_id, genre_id)
);

-- Thêm các thể loại phim
INSERT INTO genres (name, slug) VALUES
('Hành động', 'hanh-dong'),
('Khoa học viễn tưởng', 'khoa-hoc-vien-tuong'),
('Phiêu lưu', 'phieu-luu'),
('Tâm lý', 'tam-ly'),
('Siêu anh hùng', 'sieu-anh-hung'),
('Hài kịch', 'hai-kich'),
('Kinh dị', 'kinh-di'),
('Lãng mạn', 'lang-man'),
('Chiến tranh', 'chien-tranh'),
('Tội phạm', 'toi-pham'),
('Gia đình', 'gia-dinh'),
('Hoạt hình', 'hoat-hinh');

-- Thêm dữ liệu phim từ HomePage
INSERT INTO movies (
    id, title, description, poster_url, backdrop_url, release_date, 
    duration, rating, slug, trailer_url, status, type, country, director, cast
) VALUES
(1, 'Avatar: The Way of Water', 
 'Jake Sully và gia đình Navi phải đối mặt với những thách thức mới khi họ tìm cách bảo vệ hành tinh Pandora khỏi những kẻ xâm lược.',
 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
 '2022-12-16', 192, 8.5, 'avatar-the-way-of-water',
 'https://www.youtube.com/watch?v=d9MyW72ELq0',
 'released', 'movie', 'USA', 'James Cameron',
 'Sam Worthington, Zoe Saldana, Sigourney Weaver'),

(2, 'Black Panther: Wakanda Forever',
 'Sau cái chết của Vua T''Challa, Wakanda phải đối mặt với những thách thức mới và bảo vệ đất nước khỏi các thế lực bên ngoài.',
 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
 '2022-11-11', 161, 8.2, 'black-panther-wakanda-forever',
 'https://www.youtube.com/watch?v=_Z3QKkl1WyM',
 'released', 'movie', 'USA', 'Ryan Coogler',
 'Letitia Wright, Angela Bassett, Lupita Nyong''o'),

(3, 'Top Gun: Maverick',
 'Pete ''Maverick'' Mitchell phải đối mặt với quá khứ và huấn luyện một thế hệ phi công mới cho một nhiệm vụ nguy hiểm.',
 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
 '2022-05-27', 130, 9.1, 'top-gun-maverick',
 'https://www.youtube.com/watch?v=qSqVVswa420',
 'released', 'movie', 'USA', 'Joseph Kosinski',
 'Tom Cruise, Miles Teller, Jennifer Connelly'),

(4, 'Spider-Man: No Way Home',
 'Peter Parker phải đối mặt với hậu quả khi danh tính Spider-Man bị tiết lộ.',
 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
 '2021-12-17', 148, 8.8, 'spider-man-no-way-home',
 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
 'released', 'movie', 'USA', 'Jon Watts',
 'Tom Holland, Zendaya, Benedict Cumberbatch'),

(5, 'The Batman',
 'Bruce Wayne trong những năm đầu làm Batman, truy tìm kẻ giết người hàng loạt ở Gotham City.',
 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
 '2022-03-04', 176, 8.3, 'the-batman',
 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
 'released', 'movie', 'USA', 'Matt Reeves',
 'Robert Pattinson, Zoë Kravitz, Paul Dano'),

(6, 'Doctor Strange in the Multiverse of Madness',
 'Doctor Strange khám phá đa vũ trụ và đối mặt với những phiên bản khác của chính mình.',
 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg',
 '2022-05-06', 126, 7.9, 'doctor-strange-multiverse-of-madness',
 'https://www.youtube.com/watch?v=aWzlQ2N6qqg',
 'released', 'movie', 'USA', 'Sam Raimi',
 'Benedict Cumberbatch, Elizabeth Olsen, Chiwetel Ejiofor');

-- Liên kết phim với thể loại
-- Avatar: The Way of Water - Khoa học viễn tưởng, Phiêu lưu, Hành động
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1, 2), (1, 3), (1, 1);

-- Black Panther: Wakanda Forever - Hành động, Siêu anh hùng, Tâm lý
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(2, 1), (2, 5), (2, 4);

-- Top Gun: Maverick - Hành động, Phiêu lưu, Chiến tranh
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(3, 1), (3, 3), (3, 9);

-- Spider-Man: No Way Home - Siêu anh hùng, Hành động, Khoa học viễn tưởng
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(4, 5), (4, 1), (4, 2);

-- The Batman - Hành động, Tội phạm, Tâm lý
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(5, 1), (5, 10), (5, 4);

-- Doctor Strange - Siêu anh hùng, Khoa học viễn tưởng, Hành động
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(6, 5), (6, 2), (6, 1);

-- Cập nhật view count cho các phim (random)
UPDATE movies SET views = CASE 
    WHEN id = 1 THEN 2500000
    WHEN id = 2 THEN 1800000
    WHEN id = 3 THEN 3200000
    WHEN id = 4 THEN 4100000
    WHEN id = 5 THEN 2900000
    WHEN id = 6 THEN 2200000
END WHERE id IN (1,2,3,4,5,6);

-- Thêm một số phim bổ sung để có đủ dữ liệu
INSERT INTO movies (
    title, description, poster_url, backdrop_url, release_date, 
    duration, rating, slug, trailer_url, status, type, country, director, cast, views
) VALUES
('John Wick: Chapter 4',
 'John Wick khám phá ra một con đường để đánh bại High Table. Nhưng trước khi anh có thể giành được tự do, anh phải đối mặt với một kẻ thù mới.',
 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/fgXmW86iTR5iOLNPp5UJLxu0YUQ.jpg',
 '2023-03-24', 169, 8.7, 'john-wick-chapter-4',
 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
 'released', 'movie', 'USA', 'Chad Stahelski',
 'Keanu Reeves, Donnie Yen, Bill Skarsgård', 1900000),

('Dune',
 'Paul Atreides, một chàng trai thông minh và tài năng sinh ra để làm những điều vĩ đại, phải du hành đến hành tinh nguy hiểm nhất trong vũ trụ.',
 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/s1FjEdgFWSSELBKw8KRQoRsQ6Q6.jpg',
 '2021-10-22', 155, 8.0, 'dune',
 'https://www.youtube.com/watch?v=8g18jFHCLXk',
 'released', 'movie', 'USA', 'Denis Villeneuve',
 'Timothée Chalamet, Rebecca Ferguson, Oscar Isaac', 2100000),

('Oppenheimer',
 'Câu chuyện về J. Robert Oppenheimer, nhà vật lý lý thuyết người đã giúp phát triển bom nguyên tử trong Thế chiến II.',
 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
 '2023-07-21', 180, 8.4, 'oppenheimer',
 'https://www.youtube.com/watch?v=uYPbbksJxIg',
 'released', 'movie', 'USA', 'Christopher Nolan',
 'Cillian Murphy, Emily Blunt, Matt Damon', 1600000);

-- Liên kết các phim mới với thể loại
INSERT INTO movie_genres (movie_id, genre_id) VALUES
-- John Wick 4 - Hành động, Tội phạm
(7, 1), (7, 10),
-- Dune - Khoa học viễn tưởng, Phiêu lưu, Hành động
(8, 2), (8, 3), (8, 1),
-- Oppenheimer - Tâm lý, Chiến tranh
(9, 4), (9, 9);

-- Kiểm tra dữ liệu đã thêm
SELECT 
    m.id, 
    m.title, 
    m.rating, 
    m.release_date,
    m.views,
    GROUP_CONCAT(g.name SEPARATOR ', ') as genres
FROM movies m
LEFT JOIN movie_genres mg ON m.id = mg.movie_id
LEFT JOIN genres g ON mg.genre_id = g.id
GROUP BY m.id, m.title, m.rating, m.release_date, m.views
ORDER BY m.views DESC;
