-- Active: 1758105251594@@127.0.0.1@3306
CREATE TABLE student(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    middle_name TEXT,
    groupId INTEGER
);
INSERT INTO student (first_name, last_name, middle_name, groupId)
VALUES ('Иван', 'Иванов', 'Иванович', 1);
SELECT * FROM class;
SELECT * FROM student;