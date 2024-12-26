'use client'
import { useState } from 'react';
import { List, Group, Accordion, ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconNavigationUp, IconUserEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { Position } from '@/types/position';
import CreatePositionModal from './CreatePositionModal';
import UpdatePositionModal from './UpdatePositionModal';
import { useDeletePositionMutation } from '@/redux/api/position';
import { useRouter } from 'next/navigation';

interface PositionWithChildren extends Position {
  children?: PositionWithChildren[];
}

interface PositionTreeProps {
  data: Position[];
  onDelete: (position: Position) => void;
}

const PositionTree: React.FC<PositionTreeProps> = ({ data, onDelete }) => {
  const router = useRouter();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [deletePosition, {isLoading, isSuccess, isError, error}] = useDeletePositionMutation();

  // Function to build a tree structure from flat data
  const buildTree = (
    positions: Position[],
    parentId: number | null
  ): PositionWithChildren[] => {
    return positions
      .filter((pos) => pos.parentId === parentId)
      .map((pos) => ({
        ...pos,
        children: buildTree(positions, Number(pos.id)),
      }));
  };

  // Recursive function to render the tree
  const renderTree = (nodes: PositionWithChildren[]) => {
    return nodes.map((node) => (
      <Accordion.Item key={node.id} value={node.id.toString()}>
        <Accordion.Control>
          <Group  className=''>
            <div className="w-full flex justify-between">
              <p>{node.name}</p>

               <div className='flex gap-4'>
                <div className='w-6 h-6 bg-green-100 flex items-center justify-center rounded-full hover:bg-green-300'>
                  <IconNavigationUp onClick={() => router.push(`/positions/${node.id}`)} stroke={2} size={16} />
                </div> 
                <div className='w-6 h-6 bg-green-100 flex items-center justify-center rounded-full hover:bg-green-300'>
                  <IconPlus  onClick={() => {
                      handleCreate(node.id);
                    }} size={16} />
                </div> 
                {/* <div className='w-6 h-6 bg-green-100 flex items-center justify-center rounded-full hover:bg-green-300'>
                  <IconTrash 
                    onClick={() => {
                      handleDelete(node); 
                    }}
                    size={16} />
                </div>              */}
               </div>
            </div>
          </Group>
        </Accordion.Control>
        {node.children && node.children.length > 0 && (
          <Accordion.Panel>{renderTree(node.children)}</Accordion.Panel>
        )}
      </Accordion.Item>
    ));
  };

  // Open the modal to create a new position under the current parent
  const handleCreate = (parentId: number | null) => {
    setCurrentParentId(parentId);
    setCreateModalOpen(true);
  };

  // Open the modal to update the selected position
  const handleEdit = (position: Position) => {
    setCurrentPosition(position);
    setUpdateModalOpen(true);
  };

  const handleDelete = async (position: Position) => {
    try {
      await deletePosition(position.id); 
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

  // Prepare parent options for the modal select input
  const parentOptions = data.map((position) => ({
    value: position.id,
    label: position.name,
  }));

  // Build the tree structure from the flat position data
  const tree = buildTree(data, null);

  return (
    <>
      <Accordion chevronPosition="left" multiple>
        {renderTree(tree)}
      </Accordion>
      <CreatePositionModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        parentOptions={parentOptions}
      />
      {currentPosition && (
        <UpdatePositionModal
          opened={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          position={currentPosition}
          parentOptions={parentOptions}
        />
      )}
    </>
  );
};

export default PositionTree;
