'use client';
import { useState } from 'react';
import { Group, Accordion, Box } from '@mantine/core';
import { IconNavigationUp, IconPlus } from '@tabler/icons-react';
import { Position } from '@/types/position';
import CreatePositionModal from './CreatePositionModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PositionWithChildren extends Position {
  children?: PositionWithChildren[];
}

const PositionTree = ({ data }: {data: Position[]}) => {
  const router = useRouter();
  const [createModalOpen, setCreateModalOpen] = useState(false);

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

  const renderTree = (nodes: PositionWithChildren[]) => {
    return nodes.map((node) => (
      <Accordion.Item key={node.id} value={node.id.toString()}>
        <Accordion.Control>
          <Group>
            <div className="w-full flex justify-between items-center">
              <p className="font-medium text-gray-700">{node.name}</p>

              <div className="flex gap-3">
                <Link
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-300 transition-colors cursor-pointer"
                  href={`/positions/${node.id}`}
                >
                  <IconNavigationUp stroke={1.5} size={20} className="text-gray-600" />
                </Link>

                <Link
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-green-300 transition-colors cursor-pointer"
                  href={`/positions/${node.id}`}
                >
                  <IconPlus stroke={1.5} size={20} className="text-gray-600" />
                </Link>
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


  const parentOptions = data.map((position) => ({
    value: position.id,
    label: position.name,
  }));

  const tree = buildTree(data, null);

  return (
    <Box>
      <Accordion chevronPosition="left" multiple>
        {renderTree(tree)}
      </Accordion>
      <CreatePositionModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        parentOptions={parentOptions}
      />
    </Box>
  );
};

export default PositionTree;
