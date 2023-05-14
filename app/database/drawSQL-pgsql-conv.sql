CREATE TABLE "conversation"(
    "id" SERIAL NOT NULL,
    "id_userSender" INTEGER NOT NULL,
    "id_userReciever" INTEGER NOT NULL,
    "id_message" INTEGER NOT NULL,
    "dateUpdate" DATE NOT NULL
);
ALTER TABLE
    "conversation" ADD PRIMARY KEY("id");
CREATE TABLE "User"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_username_unique" UNIQUE("userName");
CREATE TABLE "message"(
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATE NOT NULL
);
ALTER TABLE "User"
    ADD CONSTRAINT "uniqueUserName" UNIQUE ("userName");
ALTER TABLE
    "Message" ADD PRIMARY KEY("id");
CREATE INDEX "message_id_user_index" ON
    "Message"("id_user");
ALTER TABLE
    "Message" ADD CONSTRAINT "message_id_user_foreign" FOREIGN KEY("id_user") REFERENCES "User"("id");
ALTER TABLE
    "Conversation" ADD CONSTRAINT "conversation_id_userreciever_foreign" FOREIGN KEY("id_userReciever") REFERENCES "User"("id");
ALTER TABLE
    "Conversation" ADD CONSTRAINT "conversation_id_message_foreign" FOREIGN KEY("id_message") REFERENCES "Message"("id");
ALTER TABLE
    "Conversation" ADD CONSTRAINT "conversation_id_usersender_foreign" FOREIGN KEY("id_userSender") REFERENCES "User"("id");