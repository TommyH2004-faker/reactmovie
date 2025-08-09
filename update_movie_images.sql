-- Cập nhật poster_url, banner_url và thông tin phim cho database thực tế
-- Sử dụng ảnh chất lượng cao từ TMDB và cập nhật tên + mô tả chuẩn

-- Phim 1: Avengers: Endgame
UPDATE movie SET 
    title = 'Avengers: Endgame',
    description = 'Sau những sự kiện tàn khốc của Infinity War, vũ trụ đang trong tình trạng hỗn loạn. Với sự giúp đỡ của các đồng minh còn lại, các Avengers phải tập hợp một lần nữa để đảo ngược hành động của Thanos và khôi phục lại trật tự vũ trụ.',
    poster_url = 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg'
WHERE id = 1;

-- Phim 2: Spider-Man: No Way Home
UPDATE movie SET 
    title = 'Spider-Man: No Way Home',
    description = 'Lần đầu tiên trong lịch sử điện ảnh của Spider-Man, danh tính của người nhện thân thiện đã bị tiết lộ, khiến Peter Parker không còn có thể tách biệt cuộc sống bình thường với việc làm siêu anh hùng đầy trách nhiệm.',
    poster_url = 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg'
WHERE id = 2;

-- Phim 3: Top Gun: Maverick
UPDATE movie SET 
    title = 'Top Gun: Maverick',
    description = 'Sau hơn ba thập kỷ phục vụ như một trong những phi công hàng đầu của Hải quân, Pete "Maverick" Mitchell đang ở nơi anh thuộc về, vượt qua giới hạn như một phi công thử nghiệm dũng cảm và né tránh sự thăng tiến có thể khiến anh phải nghỉ hưu.',
    poster_url = 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg'
WHERE id = 3;

-- Phim 4: Avatar: The Way of Water
UPDATE movie SET 
    title = 'Avatar: The Way of Water',
    description = 'Bộ phim kể về câu chuyện của gia đình Sully (Jake, Neytiri và các con của họ), những rắc rối theo đuổi họ, những gì họ phải làm để giữ an toàn cho nhau, các cuộc chiến họ phải chiến đấu để sống sót, và những bi kịch họ phải chịu đựng.',
    poster_url = 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg'
WHERE id = 4;

-- Phim 5: Black Panther: Wakanda Forever
UPDATE movie SET 
    title = 'Black Panther: Wakanda Forever',
    description = 'Nữ hoàng Ramonda, Shuri, M\'Baku, Okoye và Dora Milaje chiến đấu để bảo vệ quốc gia họ khỏi các thế lực can thiệp sau cái chết của Vua T\'Challa. Khi người Wakanda cố gắng nắm bắt chương tiếp theo của họ, các anh hùng phải đoàn kết với sự giúp đỡ của War Dog Nakia và Everett Ross.',
    poster_url = 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg'
WHERE id = 5;

-- Phim 6: The Batman
UPDATE movie SET 
    title = 'The Batman',
    description = 'Khi kẻ giết người hàng loạt Riddler bắt đầu giết chóc những nhân vật chủ chốt ở Gotham, Batman phải điều tra tham nhũng của thành phố và đặt câu hỏi về sự liên quan của gia đình mình.',
    poster_url = 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg'
WHERE id = 6;

-- Phim 7: Doctor Strange in the Multiverse of Madness
UPDATE movie SET 
    title = 'Doctor Strange in the Multiverse of Madness',
    description = 'Doctor Strange, với sự giúp đỡ của các đồng minh thần bí cả cũ và mới, đi khắp những thực tại thay đổi và nguy hiểm của Đa vũ trụ để đối mặt với một kẻ thù bí ẩn mới.',
    poster_url = 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg'
WHERE id = 7;

-- Phim 8: Thor: Love and Thunder
UPDATE movie SET 
    title = 'Thor: Love and Thunder',
    description = 'Thor bắt đầu một hành trình không giống bất kỳ điều gì anh từng đối mặt - một nhiệm vụ tìm kiếm sự bình yên nội tâm. Nhưng việc nghỉ hưu của Thor bị gián đoạn bởi một kẻ giết người thiên hà được biết đến với cái tên Gorr the God Butcher.',
    poster_url = 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/p1F51Lvj3sMopG948F5HsBbl43C.jpg'
WHERE id = 8;

-- Phim 9: Minions: The Rise of Gru
UPDATE movie SET 
    title = 'Minions: The Rise of Gru',
    description = 'Năm 1970, trong thời kỳ hoàng kim của funk, Gru đang lớn lên ở vùng ngoại ô và là một fan hâm mộ lớn của một nhóm siêu ác nhân được biết đến với cái tên Vicious 6.',
    poster_url = 'https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/uoT3MmdlhZWrbzJqK7Aaw8Q0cNp.jpg'
WHERE id = 9;

-- Phim 10: Jurassic World Dominion
UPDATE movie SET 
    title = 'Jurassic World Dominion',
    description = 'Bốn năm sau khi Isla Nublar bị phá hủy, khủng long hiện đang sống và săn mồi cùng với con người trên khắp thế giới. Sự cân bằng mong manh này sẽ định hình lại tương lai và xác định, một lần và mãi mãi, liệu con người có tiếp tục là những kẻ săn mồi hàng đầu trên hành tinh mà họ giờ chia sẻ với những sinh vật đáng sợ nhất trong lịch sử.',
    poster_url = 'https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/9485L4kNllXCvEQOCBJQvdIKv4N.jpg'
WHERE id = 10;

-- Phim 11: Fast X
UPDATE movie SET 
    title = 'Fast X',
    description = 'Trong Fast X, Dom Toretto và gia đình của anh phải đối mặt với kẻ thù nguy hiểm nhất mà họ từng gặp: Một mối đe dọa khủng khiếp nổi lên từ bóng tối của quá khứ, được thúc đẩy bởi sự báo thù đẫm máu và quyết tâm phá vỡ gia đình này.',
    poster_url = 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg'
WHERE id = 11;

-- Phim 12: John Wick: Chapter 4
UPDATE movie SET 
    title = 'John Wick: Chapter 4',
    description = 'John Wick khám phá ra một con đường để đánh bại High Table. Nhưng trước khi anh có thể giành được tự do, Wick phải đối mặt với một kẻ thù mới với những liên minh mạnh mẽ trên khắp thế giới và những lực lượng biến những người bạn cũ thành kẻ thù.',
    poster_url = 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/h7dZpJDORYs5c56dydbrLFkEXpE.jpg'
WHERE id = 12;

-- Phim 13: The Super Mario Bros. Movie
UPDATE movie SET 
    title = 'The Super Mario Bros. Movie',
    description = 'Bộ phim hoạt hình theo dõi Mario và Luigi, hai anh em thợ sửa ống nước, khi họ bị cuốn vào một cuộc phiêu lưu kỳ thú để cứu một công chúa bị bắt cóc.',
    poster_url = 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg'
WHERE id = 13;

-- Phim 14: Scream VI
UPDATE movie SET 
    title = 'Scream VI',
    description = 'Sau các vụ giết người gần đây, các chị em Carpenter rời Woodsboro để bắt đầu một chương mới. Ở New York, họ lại một lần nữa phải đối mặt với quá khứ khi một kẻ giết người mới bắt đầu một chuỗi giết chóc đẫm máu.',
    poster_url = 'https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/a8tQ4DNSjhTci9LDNtddbKzXTaX.jpg'
WHERE id = 14;

-- Phim 15: Guardians of the Galaxy Vol. 3
UPDATE movie SET 
    title = 'Guardians of the Galaxy Vol. 3',
    description = 'Peter Quill, vẫn đang chấn động vì việc mất đi Gamora, phải tập hợp đội của mình xung quanh để bảo vệ vũ trụ cùng với việc bảo vệ một trong số họ - một nhiệm vụ có thể có nghĩa là kết thúc của Guardians nếu không thành công.',
    poster_url = 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/5YZbUmjbMa3ClvSW1Wj3Ga9fZLn.jpg'
WHERE id = 15;

-- Phim 16: Indiana Jones and the Dial of Destiny
UPDATE movie SET 
    title = 'Indiana Jones and the Dial of Destiny',
    description = 'Nhà khảo cổ học huyền thoại Indiana Jones sắp nghỉ hưu khi anh thấy mình trong một thế giới dường như đã vượt qua anh. Đối mặt với việc trở lại một người quen cũ, Indy phải đội chiếc mũ fedora một lần cuối cùng để hoàn thành một nhiệm vụ cuối cùng.',
    poster_url = 'https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/1HdUABPWbh8A20vHAicSJOLQkzr.jpg'
WHERE id = 16;

-- Phim 17: Transformers: Rise of the Beasts
UPDATE movie SET 
    title = 'Transformers: Rise of the Beasts',
    description = 'Quay trở lại hành động và phiêu lưu của Transformers, bộ phim sẽ đưa khán giả vào một cuộc phiêu lưu toàn cầu thập niên 90 và giới thiệu Maximals, Predacons và Terrorcons.',
    poster_url = 'https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/bz66a19bR6BKsbY8gSZCM4etJiK.jpg'
WHERE id = 17;

-- Phim 18: Spider-Man: Across the Spider-Verse
UPDATE movie SET 
    title = 'Spider-Man: Across the Spider-Verse',
    description = 'Miles Morales tái xuất trong Spider-Verse tiếp theo, một cuộc phiêu lưu hoành tráng sẽ đưa Spider-Man thân thiện của Brooklyn qua Đa vũ trụ để hợp tác với Gwen Stacy và một đội ngũ Spider-People mới.',
    poster_url = 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg'
WHERE id = 18;

-- Phim 19: The Flash
UPDATE movie SET 
    title = 'The Flash',
    description = 'Barry sử dụng siêu tốc độ của mình để du hành ngược thời gian nhằm thay đổi các sự kiện trong quá khứ. Nhưng khi nỗ lực cứu gia đình của mình vô tình thay đổi tương lai, Barry bị kẹt trong một thực tại mà General Zod đã trở lại.',
    poster_url = 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/yF1eOkaYvwiORauRCPWznV9xVvi.jpg'
WHERE id = 19;

-- Phim 20: Oppenheimer
UPDATE movie SET 
    title = 'Oppenheimer',
    description = 'Câu chuyện về nhà vật lý lý thuyết người Mỹ J. Robert Oppenheimer, người đứng đầu phòng thí nghiệm Los Alamos trong Thế chiến II, và vai trò của ông trong việc phát triển bom nguyên tử.',
    poster_url = 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg'
WHERE id = 20;

-- Phim 21: Barbie
UPDATE movie SET 
    title = 'Barbie',
    description = 'Barbie và Ken đang có một ngày tuyệt vời trong thế giới đầy màu sắc và dường như hoàn hảo của Barbie Land. Tuy nhiên, khi họ có cơ hội đi đến thế giới thực, họ sớm khám phá ra niềm vui và nguy hiểm của việc sống giữa những con người.',
    poster_url = 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ctmxGCy4pDNFEZdWXZBL4DwU5hm.jpg'
WHERE id = 21;

-- Phim 22: Mission: Impossible – Dead Reckoning Part One
UPDATE movie SET 
    title = 'Mission: Impossible – Dead Reckoning Part One',
    description = 'Ethan Hunt và nhóm IMF của anh ấy bắt tay vào nhiệm vụ nguy hiểm nhất của họ: Truy tìm một vũ khí mới đáng sợ đe dọa toàn nhân loại trước khi nó rơi vào tay kẻ xấu.',
    poster_url = 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/628Dep6AxEtDxjZoGP78TsOxYbK.jpg'
WHERE id = 22;

-- Phim 23: Ant-Man and the Wasp: Quantumania
UPDATE movie SET 
    title = 'Ant-Man and the Wasp: Quantumania',
    description = 'Scott Lang và Hope Van Dyne cùng với Hank Pym và Janet Van Dyne khám phá Quantum Realm, nơi họ tương tác với những sinh vật kỳ lạ và bắt đầu một cuộc phiêu lưu vượt qua giới hạn của những gì họ nghĩ là có thể.',
    poster_url = 'https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg'
WHERE id = 23;

-- Phim 24: Cocaine Bear
UPDATE movie SET 
    title = 'Cocaine Bear',
    description = 'Lấy cảm hứng từ sự kiện có thật năm 1985, bộ phim kể về một con gấu đen 175 pound đã ăn phải một lượng lớn cocaine sau một vụ rơi máy bay buôn lậu ma túy.',
    poster_url = 'https://image.tmdb.org/t/p/w500/gOnmaxHo0OhNlCDx2Y4PEy1WmBy.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/mMIBcKg7lzq4nYMR6fHTsGzT3E8.jpg'
WHERE id = 24;

-- Phim 25: Creed III
UPDATE movie SET 
    title = 'Creed III',
    description = 'Sau khi thống trị thế giới quyền anh, Adonis Creed đã phát triển mạnh mẽ cả trong sự nghiệp lẫn cuộc sống gia đình. Khi một người bạn thời thơ ấu và cựu vô địch quyền anh thần đồng Damian Anderson tái xuất sau khi ra tù dài hạn, anh ta háo hức chứng minh rằng mình xứng đáng được trở lại võ đài.',
    poster_url = 'https://image.tmdb.org/t/p/w500/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/tTnGO1W9P8m6DKPB6o1r8L0cLOL.jpg'
WHERE id = 25;

-- Phim 26: Dungeons & Dragons: Honor Among Thieves
UPDATE movie SET 
    title = 'Dungeons & Dragons: Honor Among Thieves',
    description = 'Một tên trộm quyến rũ và một nhóm những kẻ phiêu lưu khó có thể xảy ra bắt tay vào một vụ trộm hoành tráng để lấy lại một di vật bị mất, nhưng mọi thứ trở nên nguy hiểm một cách khủng khiếp khi họ chạy trúng những người sai.',
    poster_url = 'https://image.tmdb.org/t/p/w500/A7AoNT06aRAc4SV89Dwxj3EYAgC.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/v28T5F1IygM8vXWZIycfNEm3xcL.jpg'
WHERE id = 26;

-- Phim 27: Evil Dead Rise
UPDATE movie SET 
    title = 'Evil Dead Rise',
    description = 'Một câu chuyện xoay quanh hai chị em xa cách, cuộc đoàn tụ của họ bị cắt ngắn bởi sự trỗi dậy của những con quỷ sở hữu thịt, đẩy họ vào một cuộc chiến sinh tồn nguyên thủy khi họ phải đối mặt với phiên bản ác mộng nhất của gia đình.',
    poster_url = 'https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/56RHPyK5uZhK3jJwNRrZ4sRrQ7T.jpg'
WHERE id = 27;

-- Phim 28: Air
UPDATE movie SET 
    title = 'Air',
    description = 'Kể về câu chuyện đằng sau sự hợp tác cách mạng giữa Michael Jordan và Nike\'s Air Jordan sneaker brand năm 1984.',
    poster_url = 'https://image.tmdb.org/t/p/w500/76OSX1lROpOVNNSpQDl7EqzMEbC.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/d3nVZE4VaNgfgqwWtKABKuMdUNL.jpg'
WHERE id = 28;

-- Phim 29: The Little Mermaid
UPDATE movie SET 
    title = 'The Little Mermaid',
    description = 'Phiên bản live-action của câu chuyện cổ tích Disney yêu thích kể về nàng tiên cá Ariel, một nàng tiên cá trẻ tuổi tràn đầy tò mò và gan dạ, con gái của Vua Triton và cô em gái thích phiêu lưu nhất trong số các chị em.',
    poster_url = 'https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7ZP8HtgOIDaBs12krXgUIygqEsy.jpg'
WHERE id = 29;

-- Phim 30: Puss in Boots: The Last Wish
UPDATE movie SET 
    title = 'Puss in Boots: The Last Wish',
    description = 'Puss in Boots khám phá ra rằng niềm đam mê phiêu lưu của anh đã có cái giá: anh đã đốt cháy tám trong số chín mạng sống của mình, khiến Puss mất đi khả năng bất tử. Với chỉ một mạng sống còn lại, Puss phải khiêm tốn yêu cầu sự giúp đỡ từ người bạn đồng hành cũ Kitty Paws.',
    poster_url = 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/r9PkFnRUIthgBp2JZZzD380MWZy.jpg'
WHERE id = 30;

-- Phim 33: The Hunger Games: The Ballad of Songbirds & Snakes
UPDATE movie SET 
    title = 'The Hunger Games: The Ballad of Songbirds & Snakes',
    description = 'Trở lại với thế giới của Panem 64 năm trước các sự kiện trong The Hunger Games, bộ phim theo dõi Coriolanus Snow 18 tuổi khi anh được chọn làm mentor cho các tribute từ District 12.',
    poster_url = 'https://image.tmdb.org/t/p/w500/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg'
WHERE id = 33;

-- Phim 34: Killers of the Flower Moon
UPDATE movie SET 
    title = 'Killers of the Flower Moon',
    description = 'Khi dầu được phát hiện trong đất của quốc gia Osage vào thập niên 1920, người Osage trong Oklahoma trở nên vô cùng giàu có gần như qua đêm. Sự giàu có này thu hút sự chú ý của những kẻ bạc đãi trắng, dẫn đến cuộc điều tra FBI về loạt vụ giết người bí ẩn.',
    poster_url = 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
    banner_url = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7I6VUdPj6tQECNHdviJkUHD2u89.jpg'
WHERE id = 34;

-- Commit transaction
COMMIT;
