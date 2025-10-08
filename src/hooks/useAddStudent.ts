// src/hooks/useAddStudent.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';

type CreateStudentDto = Pick<StudentInterface, 'first_name' | 'last_name' | 'middle_name' | 'groupId'>;

const addStudent = async (studentData: CreateStudentDto): Promise<StudentInterface> => {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error('Ошибка при добавлении студента');
  return res.json();
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};