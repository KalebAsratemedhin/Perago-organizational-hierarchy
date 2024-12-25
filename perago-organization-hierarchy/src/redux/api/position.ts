import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Position, CreatePosition } from '@/types/position';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Positions'],
  endpoints: (builder) => ({
    getPositions: builder.query<Position[], void>({
      query: () => 'positions',
      providesTags: ['Positions'],
    }),
    getPosition: builder.query<Position, number>({
      query: (id) => `positions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Positions', id }],
    }),
    createPosition: builder.mutation<void, CreatePosition>({
      query: (newPosition) => ({
        url: 'positions',
        method: 'POST',
        body: newPosition,
      }),
      invalidatesTags: ['Positions'],
    }),
    updatePosition: builder.mutation<void, Position>({
      query: (updatedPosition) => ({
        url: `positions/${updatedPosition.id}`,
        method: 'PUT',
        body: updatedPosition,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Positions', id }],
    }),
    deletePosition: builder.mutation<void, number>({
      query: (id) => ({
        url: `positions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Positions', id }],
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetPositionQuery,
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = apiSlice;
