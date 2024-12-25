'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Button } from '@mantine/core';
import { useCreatePositionMutation } from '@/redux/api/position';
import * as yup from 'yup';
import { CreatePosition } from '@/types/position';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  parentId: yup.number().nullable(),
});

export default function NewPosition() {
  const [createPosition] = useCreatePositionMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePosition>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreatePosition> = async (data) => {
    await createPosition(data);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <TextInput
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />
      <TextInput label="Parent ID" {...register('parentId')} />
      <Button type="submit">Add Position</Button>
    </form>
  );
}
