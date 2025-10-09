
import sqlite3 from 'sqlite3';
import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

const openDb = (): sqlite3.Database => {
  return new sqlite3.Database(process.env.DB ?? 'C:/Users/mclie/db/vki-web.db');
};

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = openDb();
  return new Promise<StudentInterface[]>((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err: Error | null, rows: any[]) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        const students: StudentInterface[] = rows.map(row => ({
          ...row,
          isDeleted: false,
        }));
        resolve(students);
      }
    });
  });
};

export const deleteStudentDb = async (id: number): Promise<boolean> => {
  const db = openDb();
  return new Promise<boolean>((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (this: sqlite3.RunResult, err: Error | null) {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0);
      }
    });
  });
};

export const createStudentDb = async (
  data: {
    first_name: string;
    last_name: string;
    middle_name: string | null;
    groupId: number | null;
  }
): Promise<StudentInterface> => {
  const db = openDb();

  return new Promise<StudentInterface>((resolve, reject) => {
    const sql = `
      INSERT INTO student (first_name, last_name, middle_name, groupId)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
      data.first_name,
      data.last_name,
      data.middle_name,
      data.groupId,
    ];

    db.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        console.error('Ошибка SQLite:', err.message);
        db.close();
        reject(err);
        return;
      }

      const newStudent: StudentInterface = {
        id: this.lastID,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        groupId: data.groupId,
        isDeleted: false,
      };

      db.close();
      resolve(newStudent);
    });
  });
};