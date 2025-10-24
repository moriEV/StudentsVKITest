'use client';

import { useForm } from 'react-hook-form';
import type StudentInterface from '@/types/StudentInterface';

type AddStudentFormData =  Pick<
  StudentInterface,
  'firstName' | 'lastName' | 'middleName' | 'groupId'
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
      firstName: '',
      lastName: '',
      middleName: '',
      groupId: undefined,
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
          {...register('firstName', {
            required: 'Имя обязательно',
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
      </div>

      <div>
        <label>Фамилия:</label>
        <input
          {...register('lastName', {
            required: 'Фамилия обязательна',
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
      </div>

      <div>
        <label>Отчество (необязательно):</label>
        <input
          {...register('middleName', {
            maxLength: { value: 100, message: 'Не более 100 символов' },
          })}
        />
        {errors.middleName && <p style={{ color: 'red' }}>{errors.middleName.message}</p>}
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