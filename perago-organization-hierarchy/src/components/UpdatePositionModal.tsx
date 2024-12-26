import React, { useEffect } from 'react';
import { Modal, TextInput, Button, Group, Select } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Position } from '@/types/position';
import * as yup from 'yup';
import { useUpdatePositionMutation } from '@/redux/api/position';

interface UpdatePositionModalProps {
  opened: boolean;
  onClose: () => void;
  position: Position;
  parentOptions: { value: number; label: string }[];
}

interface PositionFormValues {
  name: string;
  description: string;
  parentId: number;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    parentId: yup.number().required('Parent ID is required').typeError('Parent ID must be a number'),
  });

  
const UpdatePositionModal: React.FC<UpdatePositionModalProps> = ({
  opened,
  onClose,
  position,
  parentOptions,
}) => {
  const [updatePosition, { isLoading, isError }] = useUpdatePositionMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: yupResolver(schema), // Ensure the schema is defined
  });

  // Reset form when position changes
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
      await updatePosition({ id: position.id, ...data }).unwrap(); // Using unwrap for error handling
      onClose(); // Close the modal on successful update
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
        <Select
          label="Parent Position"
          placeholder="Select parent position"
          data={parentOptions}
          {...register('parentId', { valueAsNumber: true })}
          error={errors.parentId?.message}
          onChange={(value) => setValue('parentId', Number(value))}
        />
        <Group position="right" mt="md">
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
