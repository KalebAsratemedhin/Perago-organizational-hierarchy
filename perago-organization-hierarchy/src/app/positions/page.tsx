'use client';

import { Title, Loader } from '@mantine/core';
import { useGetPositionsQuery } from '@/redux/api/position';
import PositionTree from '@/components/PositionTree';

export default function Page() {
  const { data: positions, isLoading } = useGetPositionsQuery();

  if (isLoading) return <Loader m={'xl'} />;

  return (
    <div className='p-6'>
      <Title>Employee Hierarchy</Title>
      {positions && <PositionTree
          data={positions}
        />
      }
      
    </div>
  );  
}
