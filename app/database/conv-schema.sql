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
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
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