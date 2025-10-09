import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`http://localhost:3000//api/students`);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error('>>> getStudentsApi', err);
    return [];
  }
};

export type CreateStudentDto = Pick<StudentInterface, 'first_name' | 'last_name' | 'middle_name' | 'groupId'>;

export const addStudentApi = async (studentData: CreateStudentDto): Promise<StudentInterface> => {
  const res = await fetch(`http://localhost:3000//api/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error('Ошибка при добавлении студента');
  return res.json();
};

export const deleteStudentApi = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:3000//api/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Не удалось удалить студента');
  }
};