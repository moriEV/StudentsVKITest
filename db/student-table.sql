-- Active: 1761116486193@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS "group" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "name" varchar NOT NULL,
    "contacts" varchar NOT NULL
);

-- Таблица студентов
CREATE TABLE IF NOT EXISTS "student" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "uuid" varchar DEFAULT '',
    "firstName" varchar NOT NULL,
    "lastName" varchar NOT NULL,
    "middleName" varchar NOT NULL,
    "contacts" varchar DEFAULT '',
    "groupId" integer NOT NULL
);
-- Добавляем группу
INSERT INTO "group" ("name", "contacts")
VALUES ('ИВТ-31', 'ivt31@example.com');

-- Добавляем студента (groupId = 1 — ссылка на только что созданную группу)
INSERT INTO "student" ("firstName", "lastName", "middleName", "contacts", "groupId")
VALUES ('Иван', 'Иванов', 'Иванович', 'ivanov@example.com', 1);