import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStudentsApi,
  addStudentApi,
  deleteStudentApi,
  type CreateStudentDto,
} from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface UseStudentsReturn {
  students: StudentInterface[];
  isLoading: boolean;
  addStudent: (data: CreateStudentDto) => void;
  deleteStudent: (id: number) => void;
  isAdding: boolean;
  isDeleting: boolean;
}

export const useStudents = (): UseStudentsReturn => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: getStudentsApi,
  });

  const addMutation = useMutation({
    mutationFn: addStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    students: data ?? [],
    isLoading,
    addStudent: (data) => addMutation.mutate(data),
    deleteStudent: (id) => deleteMutation.mutate(id),
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export default useStudents;