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

INSERT INTO USER 
(userName, userPassword, userEmail, userFirstName, userLastName,userAvatar, userBirthday)
VALUES 
('tester_1','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luan1@gmail.com','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27'),
('tester_2','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luan2@gmail.com','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27'),
('tester_3','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','luanhx.23it@vku.udn.vn','Hoang','Luan','assets/resources/img/default-avt.png','2005-07-27');


-- SQL is disable-- 

-- 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d == b -- 




select * from user--
select * from post-- 
select * from Notification
select * from RefreshToken
use zengaku_db
select * from AuthToken
select * from TreeHeartUserList