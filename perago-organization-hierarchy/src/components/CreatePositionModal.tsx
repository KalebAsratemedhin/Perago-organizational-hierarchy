import React from 'react';
import { Modal, TextInput, Button, Group, Select } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PositionFormValues } from '@/types/position';
import { useAddPositionMutation } from '@/redux/api/position';

interface CreatePositionModalProps {
  opened: boolean;
  onClose: () => void;
  parentOptions: { value: number; label: string }[];
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  parentId: yup.number().required('Parent ID is required').typeError('Parent ID must be a number'),
});

const CreatePositionModal: React.FC<CreatePositionModalProps> = ({ opened, onClose, parentOptions }) => {
  const [addPosition] = useAddPositionMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      parentId: 0,
    },
  });

  const handleFormSubmit = async (data: PositionFormValues) => {
    await addPosition({ ...data });
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Position">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          label="Name"
          placeholder="Enter position name"
          {...register('name')}
          error={errors.name?.message}
        />
        <TextInput
          label="Description"
          placeholder="Enter position description"
          {...register('description')}
          error={errors.description?.message}
        />
        <Select
          label="Parent Position"
          placeholder="Select parent position"
          {...register('parentId', { valueAsNumber: true })}
          error={errors.parentId?.message}
          onChange={(value) => setValue('parentId', Number(value))}
        />
        <Group mt="md">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Modal>
  );
};



export default CreatePositionModal;
