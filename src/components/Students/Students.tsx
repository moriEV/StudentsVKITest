'use client';

import useStudents from '@/hooks/useStudnets';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div className={styles.Groups}>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {student.first_name}
        </h2>
      ))}
    </div>
  );
};

export default Students;