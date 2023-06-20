CREATE DATABASE conv;

\c conv;

CREATE TABLE users (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "user_username_unique" UNIQUE ("userName")
);

CREATE TABLE messages (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "message_id_user_foreign" FOREIGN KEY ("id_user") REFERENCES users ("id")
);

CREATE TABLE conversations (
    "id" SERIAL NOT NULL,
    "id_userSender" INTEGER NOT NULL,
    "id_userReciever" INTEGER NOT NULL,
    "id_message" INTEGER NOT NULL,
    "dateUpdate" DATE NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "conversation_id_userreciever_foreign" FOREIGN KEY ("id_userReciever") REFERENCES users ("id"),
    CONSTRAINT "conversation_id_message_foreign" FOREIGN KEY ("id_message") REFERENCES messages ("id"),
    CONSTRAINT "conversation_id_usersender_foreign" FOREIGN KEY ("id_userSender") REFERENCES users ("id")
);

CREATE INDEX message_id_user_index ON messages ("id_user");

-- --insertions
INSERT INTO "users" ("name", "userName", "password", "active", "createdAt", "updatedAt")
SELECT 'John Doe', 'johndoe', 'password123', true, DATE '2023-06-12',  DATE '2023-06-12'
UNION ALL
SELECT 'Jane Smith', 'janesmith', 'password456', true, DATE '2023-06-12', DATE '2023-06-12'
UNION ALL
SELECT 'Robert Johnson', 'robertjohnson', 'password789', true, DATE '2023-06-12', DATE '2023-06-12';

INSERT INTO "messages" ("id_user", "text", "createdAt")
SELECT 1, 'Hello, how are you?', DATE '2023-06-12'
UNION ALL
SELECT 2, 'I am doing well. Thanks!', DATE '2023-06-12'
UNION ALL
SELECT 3, 'Nice to meet you!', DATE '2023-06-12';

INSERT INTO "conversations" ("id_userSender", "id_userReciever", "id_message", "dateUpdate")
SELECT 1, 2, 1, DATE '2023-06-12'
UNION ALL
SELECT 2, 1, 2, DATE '2023-06-12'
UNION ALL
SELECT 3, 1, 3, DATE '2023-06-12';