'use client';

import useStudents from '@/hooks/useStudnets';
import { useDeleteStudent } from '@/hooks/useDeleteStudents';
import { useAddStudent } from '@/hooks/useAddStudent';
import Student from './Student';
import AddStudent from './AddStudent';
import type StudentInterface from '@/types/StudentInterface';

type CreateStudentDto = Pick<
  StudentInterface,
  'first_name' | 'last_name' | 'middle_name' | 'groupId'
>;

const Students = () => {
  const { students } = useStudents();
  const deleteMutation = useDeleteStudent();
  const addMutation = useAddStudent();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleAddStudent = ( data:CreateStudentDto) => {
    addMutation.mutate(data);
  };

  return (
    <div>
      <h2>Добавить студента</h2>
      <AddStudent onAdd={handleAddStudent} isPending={addMutation.isPending} />

      <h2>Список студентов</h2>
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