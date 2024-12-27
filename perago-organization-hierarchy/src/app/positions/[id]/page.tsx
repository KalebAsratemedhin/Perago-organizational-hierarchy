'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Group, Text, Modal, Loader, Notification } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useGetPositionQuery, useDeletePositionMutation } from '@/redux/api/position';
import UpdatePositionModal from '@/components/UpdatePositionModal';
import { useParams } from 'next/navigation'; 

const PositionDetailsPage = () => {
  const router = useRouter();
  const { id }: {id: string} = useParams(); 
  const { data: position, isLoading, isError, error } = useGetPositionQuery(parseInt(id!));  
  const [deletePosition] = useDeletePositionMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (position) {
        await deletePosition(position.id!).unwrap();
        setDeleteModalOpen(false);
        router.push('/positions');
      }
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="xl" />
      </div>
    );
  }

  if (isError || !position) {
    return (
      <Notification color="red" m={'24'} title="Error">
        Error loading position details.
      </Notification>
    );
  }

  return (
    <Card style={{ margin: '24px 42px' }} shadow="sm" padding="lg" radius="md" withBorder>
      <div className="flex gap-10">
        <Image src={'/profile-1.jpg'} className="rounded-full" width={150} height={150} alt={'profile'} />
        <div className="flex flex-col">
          <Text size="lg">{position.name}</Text>
          <Text mt="sm" className="text-wrap text-red-400">
            {position.description}
          </Text>
          <Group mt="md">
            <Button variant="outline" onClick={() => setEditModalOpen(true)}>
              <IconEdit size={16} /> Edit
            </Button>
            <Button color="red" onClick={() => setDeleteModalOpen(true)}>
              <IconTrash size={16} /> Delete
            </Button>
          </Group>
        </div>
      </div>

      <UpdatePositionModal opened={editModalOpen} onClose={() => setEditModalOpen(false)} position={position} parentOptions={[]} />

      <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the position "{position.name}"?</Text>
        <Group mt="md">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </Card>
  );
};

export default PositionDetailsPage;
