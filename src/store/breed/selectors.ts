import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const getBreedState = (state: RootState) => state.breed;
export const getBreedList = createSelector(getBreedState, (state) =>
  state.list);
export const getBreed = createSelector(getBreedState, (state) =>
  state.list.find((i) => i.id === state.selectedBreed));
export const getBreedIndex = createSelector(getBreedState, (state) =>
  state.list.findIndex((i) => i.id === state.selectedBreed));
