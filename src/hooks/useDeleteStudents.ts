// src/hooks/useDeleteStudent.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteStudentApi = async (id: number): Promise<void> => {
  const res = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Не удалось удалить студента');
  }
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};