// src/db/studentDb.ts
import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

// Получение всех студентов
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? 'C:/Users/mclie/db/vki-web.db');

  const students = await new Promise<StudentInterface[]>((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows as StudentInterface[]);
      }
    });
  });

  return students;
};

// Удаление студента по ID
export const deleteStudentDb = async (id: number): Promise<boolean> => {
  const db = new sqlite3.Database(process.env.DB ?? 'C:/Users/mclie/db/vki-web.db');

  const result = await new Promise<boolean>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (err) {
      db.close();
      if (err) {
        reject(err);
        return;
      }
      // `this.changes` — количество затронутых строк
      resolve(this.changes > 0);
    });
  });

  return result;
};