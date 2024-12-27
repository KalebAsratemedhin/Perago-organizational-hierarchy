import React, { useEffect } from 'react';
import { Modal, TextInput, Button, Group, Select } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Position } from '@/types/position';
import * as yup from 'yup';
import { useUpdatePositionMutation } from '@/redux/api/position';
import { PositionFormValues } from '@/types/position';
import { watch } from 'fs';

interface UpdatePositionModalProps {
  opened: boolean;
  onClose: () => void;
  position: Position;
}


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    parentId: yup.string().required('Parent ID is required')
  });

  
const UpdatePositionModal: React.FC<UpdatePositionModalProps> = ({
  opened,
  onClose,
  position,
}) => {
  const [updatePosition, { isLoading, isError }] = useUpdatePositionMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: yupResolver(schema), 
  });

  useEffect(() => {
    if (position) {
      reset({
        name: position.name,
        description: position.description,
        parentId: position.parentId,
      });
    }
  }, [position, reset]);

  const handleFormSubmit = async (data: PositionFormValues) => {
    try {
      await updatePosition({ id: position.id, ...data }).unwrap(); 
      onClose(); 
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Position">
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
        <TextInput
          label="Parent Id"
          {...register('parentId')}
          error={errors.description?.message}
        />

        <Group mt="md">
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Group>
      </form>

      {isError && <div style={{ color: 'red' }}>Failed to update position. Please try again.</div>}
    </Modal>
  );
};

export default UpdatePositionModal;
