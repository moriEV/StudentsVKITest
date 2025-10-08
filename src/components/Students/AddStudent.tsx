// src/components/Students/AddStudent.tsx
'use client';

import { useForm } from 'react-hook-form';
import type StudentInterface from '@/types/StudentInterface';

type AddStudentFormData =  Pick<
  StudentInterface,
  'first_name' | 'last_name' | 'middle_name' | 'groupId'
>;

type Props = {
  onAdd: ( arg0:AddStudentFormData) => void;
  isPending: boolean;
};

const AddStudent = ({ onAdd, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddStudentFormData>({
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      groupId: null,
    },
  });

  const onSubmit = (data: AddStudentFormData) => {
  console.log('Форма отправлена, данные:', data);
  onAdd(data);
  reset();
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Имя:</label>
        <input
          {...register('first_name', {
            required: 'Имя обязательно',
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name.message}</p>}
      </div>

      <div>
        <label>Фамилия:</label>
        <input
          {...register('last_name', {
            required: 'Фамилия обязательна',
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name.message}</p>}
      </div>

      <div>
        <label>Отчество (необязательно):</label>
        <input
          {...register('middle_name', {
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.middle_name && <p style={{ color: 'red' }}>{errors.middle_name.message}</p>}
      </div>

      <div>
        <label>ID группы (оставьте пустым, если не назначена):</label>
        <input
          type="number"
          {...register('groupId', {
            setValueAs: (value) => (value === '' ? null : Number(value)),
          })}
        />
        {errors.groupId && <p style={{ color: 'red' }}>{errors.groupId.message}</p>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Добавление...' : 'Добавить студента'}
      </button>
    </form>
  );
};

export default AddStudent;