import { List } from '@mantine/core';
import { Position } from '@/types/position';

interface PositionWithChildren extends Position {
  children?: PositionWithChildren[];
}

interface PositionTreeProps {
  data: Position[];
}

const PositionTree: React.FC<PositionTreeProps> = ({ data }) => {
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
      <List.Item key={node.id}>
        {node.name}
        {node.children && node.children.length > 0 && (
          <List withPadding>{renderTree(node.children)}</List>
        )}
      </List.Item>
    ));
  };

  const tree = buildTree(data, null);
  console.log('Tree:', JSON.stringify(tree, null, 2)); 

  return <List>{renderTree(tree)}</List>;
};

export default PositionTree;
