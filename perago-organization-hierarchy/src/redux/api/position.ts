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
      providesTags: ['Positions'],
    }),
    addPosition: builder.mutation<void, CreatePosition>({
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
      invalidatesTags: ['Positions'],
    }),
    deletePosition: builder.mutation<void, number>({
      query: (id) => ({
        url: `positions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Positions'],

    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetPositionQuery,
  useAddPositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = apiSlice;
