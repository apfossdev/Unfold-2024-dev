CREATE TABLE `nft`
(
 `id` INTEGER ,
 `title` TEXT NOT NULL ,
 `stats` LONGTEXT NOT NULL , 
 `github_url` TEXT NOT NULL ,
 `twitter_url` TEXT NOT NULL , 
 `contract_address` TEXT NOT NULL ,
`owner_address` TEXT NOT NULL ,
 `tech_score` TEXT NOT NULL ,
`social_score` TEXT NOT NULL ,
 PRIMARY KEY("id" AUTOINCREMENT)
); 

CREATE TABLE "ping" (
	"id"	INTEGER,
	"status"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO ping(status) VALUES ("pong");