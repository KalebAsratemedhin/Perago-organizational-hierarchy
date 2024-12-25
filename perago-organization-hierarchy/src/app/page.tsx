'use client';

import { Title, Loader } from '@mantine/core';
import { useGetPositionsQuery } from '@/redux/api/position';
import PositionTree from '@/components/PositionTree';

export default function Home() {
  const { data: positions, isLoading } = useGetPositionsQuery();

  if (isLoading) return <Loader />;

  return (
    <div>
      <Title>Employee Hierarchy</Title>
      {positions?.length}
      {positions && <PositionTree data={positions} />}
    </div>
  );
}
