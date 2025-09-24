// src/components/Students/Students.tsx
'use client';

import useStudents from '@/hooks/useStudnets';
import { useDeleteStudent } from '@/hooks/useDeleteStudents';
import Student from './Student';

const Students = () => {
  const { students } = useStudents();
  const deleteMutation = useDeleteStudent();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };


  return (
    <div>
      {students.map((student) => (
        <Student
          key={student.id}
          student={student}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Students;