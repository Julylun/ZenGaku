DROP DATABASE IF EXISTS ZENGAKU_DB;

CREATE DATABASE ZENGAKU_DB;

USE ZENGAKU_DB;

CREATE TABLE USER (
    id bigint auto_increment primary key,
    userName char(20) not NULL,
    userFirstName char(20) not null,
    userLastName char(20) not null,
    userBirthday date not null,
    userPassword text not null,
    userAvatar text not null,
    userEmail text(320) not null,
    savedData text 
);

CREATE TABLE AuthToken (
    id bigint auto_increment primary key,
    accessToken text not null,
    userId bigint not null,
    expiryTime Timestamp not null,
    foreign key(userId) references User(id)
);

CREATE TABLE RefreshToken (
    id bigint auto_increment primary key,
    refreshToken text not null,
    userId bigInt not null,
    expiryTime timestamp not null,
    foreign key(userId) references User(id)
);

CREATE TABLE PasswordResetToken(
    id bigint auto_increment primary key,
    token varchar(100) not null,
    isUsed TINYINT default 0,
    expiryTime Timestamp not null,
    userId bigint,
    foreign key (userId) references User(id)
);



CREATE TABLE POST(
    id bigint auto_increment primary key,
    uuid text not null,
    postText text not null,
    imageLink text not null,
    uploadDate TIMESTAMP not null,
    treeHeartNumber int not null,
    postAuthorId bigint not null,
    
    foreign key (postAuthorId) references User(id)
);

create table TreeHeartUserList (
id bigint auto_increment primary key,
userId bigint not null,
postId bigint not null,
time timestamp not null,

foreign key (userId) references User(id),
foreign key (postId) references POST(id)
);



create table Notification(
	id bigint auto_increment primary key,
    title text not null,
    content text not null,
    href text,
    notificationTime timestamp not null,
    userId bigint not null,
    
    foreign key (userId) references User(id)
);

CREATE TABLE COMMENT(
    id bigint auto_increment primary key,
    commentText text not null,
    commentDate TIMESTAMP not null,
    commentAuthorId bigint not null,
    postId bigint not null,
    foreign key (commentAuthorId) references User(id),
    foreign key (postId) references POST(id)
);

create table friendship(
id int auto_increment primary key ,
from_userid BIGINT,
to_userid BIGINT,
status text,
foreign key(from_userid) references user(id),
foreign key(to_userid) references user(id)
)

INSERT INTO USER 
(userName, userPassword, userEmail, userFirstName, userLastName,userAvatar, userBirthday, savedData)
VALUES 
('tester_1','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luan1@gmail.com','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27','{"counter":{"position":{"x":0,"y":0},"setting":{"countingTime":{"pomodoro":{"hour":0,"minute":25,"second":0,"breakTime":5,"repeat":5},"shortBreak":{"hour":0,"minute":25,"second":0,"breakTime":2,"repeat":5},"longBreak":{"hour":0,"minute":40,"second":0,"breakTime":20,"repeat":4}},"isMuted":false,"alarmVolume":100}},"backgroundConfiguration":{"position":{"x":0,"y":0},"data":{"currentBackground":"https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","name":["🗻Mountainandlake","🌗MoonandSun","🌃Theskynight","🤵Dangerperson","🚓Oldcar","🌉Thebridge","🌿Leaves","🌻Flowers","🧑‍🤝‍🧑StudywithBTS","☕Studyincoffeeshop","🚶‍♀️NightWalkinTokyoShibuya","🚶‍♀️SnowfallinTimesSquare,NYC","🚶‍♀️FLYINGOVERJAPAN","🪟DOWNTOWNLOSANGELESCityViewday"],"url":["https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg","https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp","https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg","https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://www.youtube.com/embed/UZ9uyQI3pF0","https://www.youtube.com/embed/SVDooWT60Ho","https://www.youtube.com/embed/2XK0zoPWdi4","https://www.youtube.com/embed/0nTO4zSEpOs","https://www.youtube.com/embed/F8MN0o6RS9o","https://www.youtube.com/embed/AY5qcIq5u2g","https://www.youtube.com/embed/M9cJMXmQ_ZU"]}},"soundConfiguration":{"position":{"x":0,"y":0},"data":{"name":["Chillwind","Coldwind","Oceanwave","Oceanwave2","Officesound","PrettyRealOfficesound","Keyboardtype","Campfire"],"iconUrl":["assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/keyboard.svg","assets/resources/img/defaultAudioImg/campfire.svg"],"soundUrl":["assets/resources/audio/ChillWind.mp3","assets/resources/audio/ColdWind.mp3","assets/resources/audio/OceanWave.mp3","assets/resources/audio/OceanWave2.mp3","assets/resources/audio/OfficeSound.mp3","assets/resources/audio/3DOfficeSound.mp3","assets/resources/audio/KeyboardType.mp3","assets/resources/audio/Campfire.mp3"]}}}'),
('tester_2','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luan2@gmail.com','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27','{"counter":{"position":{"x":0,"y":0},"setting":{"countingTime":{"pomodoro":{"hour":0,"minute":25,"second":0,"breakTime":5,"repeat":5},"shortBreak":{"hour":0,"minute":25,"second":0,"breakTime":2,"repeat":5},"longBreak":{"hour":0,"minute":40,"second":0,"breakTime":20,"repeat":4}},"isMuted":false,"alarmVolume":100}},"backgroundConfiguration":{"position":{"x":0,"y":0},"data":{"currentBackground":"https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","name":["🗻Mountainandlake","🌗MoonandSun","🌃Theskynight","🤵Dangerperson","🚓Oldcar","🌉Thebridge","🌿Leaves","🌻Flowers","🧑‍🤝‍🧑StudywithBTS","☕Studyincoffeeshop","🚶‍♀️NightWalkinTokyoShibuya","🚶‍♀️SnowfallinTimesSquare,NYC","🚶‍♀️FLYINGOVERJAPAN","🪟DOWNTOWNLOSANGELESCityViewday"],"url":["https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg","https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp","https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg","https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://www.youtube.com/embed/UZ9uyQI3pF0","https://www.youtube.com/embed/SVDooWT60Ho","https://www.youtube.com/embed/2XK0zoPWdi4","https://www.youtube.com/embed/0nTO4zSEpOs","https://www.youtube.com/embed/F8MN0o6RS9o","https://www.youtube.com/embed/AY5qcIq5u2g","https://www.youtube.com/embed/M9cJMXmQ_ZU"]}},"soundConfiguration":{"position":{"x":0,"y":0},"data":{"name":["Chillwind","Coldwind","Oceanwave","Oceanwave2","Officesound","PrettyRealOfficesound","Keyboardtype","Campfire"],"iconUrl":["assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/keyboard.svg","assets/resources/img/defaultAudioImg/campfire.svg"],"soundUrl":["assets/resources/audio/ChillWind.mp3","assets/resources/audio/ColdWind.mp3","assets/resources/audio/OceanWave.mp3","assets/resources/audio/OceanWave2.mp3","assets/resources/audio/OfficeSound.mp3","assets/resources/audio/3DOfficeSound.mp3","assets/resources/audio/KeyboardType.mp3","assets/resources/audio/Campfire.mp3"]}}}'),
('tester_3','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luanhx.23it@vku.udn.vn','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27','{"counter":{"position":{"x":0,"y":0},"setting":{"countingTime":{"pomodoro":{"hour":0,"minute":25,"second":0,"breakTime":5,"repeat":5},"shortBreak":{"hour":0,"minute":25,"second":0,"breakTime":2,"repeat":5},"longBreak":{"hour":0,"minute":40,"second":0,"breakTime":20,"repeat":4}},"isMuted":false,"alarmVolume":100}},"backgroundConfiguration":{"position":{"x":0,"y":0},"data":{"currentBackground":"https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","name":["🗻Mountainandlake","🌗MoonandSun","🌃Theskynight","🤵Dangerperson","🚓Oldcar","🌉Thebridge","🌿Leaves","🌻Flowers","🧑‍🤝‍🧑StudywithBTS","☕Studyincoffeeshop","🚶‍♀️NightWalkinTokyoShibuya","🚶‍♀️SnowfallinTimesSquare,NYC","🚶‍♀️FLYINGOVERJAPAN","🪟DOWNTOWNLOSANGELESCityViewday"],"url":["https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg","https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp","https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large","https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg","https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2","https://www.youtube.com/embed/UZ9uyQI3pF0","https://www.youtube.com/embed/SVDooWT60Ho","https://www.youtube.com/embed/2XK0zoPWdi4","https://www.youtube.com/embed/0nTO4zSEpOs","https://www.youtube.com/embed/F8MN0o6RS9o","https://www.youtube.com/embed/AY5qcIq5u2g","https://www.youtube.com/embed/M9cJMXmQ_ZU"]}},"soundConfiguration":{"position":{"x":0,"y":0},"data":{"name":["Chillwind","Coldwind","Oceanwave","Oceanwave2","Officesound","PrettyRealOfficesound","Keyboardtype","Campfire"],"iconUrl":["assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/wind.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/oceanwave.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/office.svg","assets/resources/img/defaultAudioImg/keyboard.svg","assets/resources/img/defaultAudioImg/campfire.svg"],"soundUrl":["assets/resources/audio/ChillWind.mp3","assets/resources/audio/ColdWind.mp3","assets/resources/audio/OceanWave.mp3","assets/resources/audio/OceanWave2.mp3","assets/resources/audio/OfficeSound.mp3","assets/resources/audio/3DOfficeSound.mp3","assets/resources/audio/KeyboardType.mp3","assets/resources/audio/Campfire.mp3"]}}}');


-- SQL is disable-- 

-- 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d == b -- 




select * from user--
select * from post-- 
select * from Notification
select * from RefreshToken
use zengaku_db
select * from AuthToken
select * from TreeHeartUserList