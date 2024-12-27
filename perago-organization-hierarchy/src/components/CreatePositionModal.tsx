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
  parentId: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  parentId: yup.string().required('Parent ID is required')
});

const CreatePositionModal: React.FC<CreatePositionModalProps> = ({ opened, onClose, parentId }) => {
  const [addPosition] = useAddPositionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      parentId: parentId,
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
        /><TextInput
          label="Parent Id"
          {...register('parentId')}
          disabled
          value={parentId}
          error={errors.description?.message}
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
