'use client';

import { useStudents } from '@/hooks/useStudents';
import Student from './Student';
import AddStudent from './AddStudent';
import type StudentInterface from '@/types/StudentInterface';

type CreateStudentDto = Pick<
  StudentInterface,
  'first_name' | 'last_name' | 'middle_name' | 'groupId'
>;

const Students = () => {
  const {
    students,
    isLoading,
    addStudent,
    deleteStudent,
    isAdding,
    isDeleting,
  } = useStudents();

  const handleAddStudent = (data: CreateStudentDto) => {
    addStudent(data);
  };

  const handleDelete = (id: number) => {
    deleteStudent(id);
  };

  if (isLoading) {
    return <div>Загрузка студентов...</div>;
  }

  return (
    <div>
      <h2>Добавить студента</h2>
      <AddStudent onAdd={handleAddStudent} isPending={isAdding} />

      <h2>Список студентов</h2>
      {students.length === 0 ? (
        <p>Студентов пока нет</p>
      ) : (
        students.map((student) => (
          <Student
            key={student.id}
            student={student}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Students;