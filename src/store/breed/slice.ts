import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBreedsThunk,
  fetchCatAndUpdateThunk,
} from './thunks';
import { BreedState } from './types';

const initialState: BreedState = {
  list: [],
  selectedBreed: null,
};

export const breedSlice = createSlice({
  name: 'breed',
  initialState,
  reducers: {
    nextBreed: (state) => {
      const breedIndex = state.list.findIndex((i) => i.id === state.selectedBreed);
      const nextBreedIndex = (breedIndex + 1 >= state.list.length) ? 0 : breedIndex + 1;

      return ({
        ...state,
        selectedBreed: state.list[nextBreedIndex].id,
      });
    },
    prevBreed: (state) => {
      const breedIndex = state.list.findIndex((i) => i.id === state.selectedBreed);

      return ({
        ...state,
        selectedBreed: state.list[!breedIndex ? state.list.length - 1 : breedIndex - 1].id,
      });
    },
    currentBreed: (state, { payload }) => ({
      ...state,
      selectedBreed: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBreedsThunk.fulfilled, (state, { payload }) => ({
      ...state,
      list: payload.filter((item) => !!item.image),
      selectedBreed: payload[0].id,
    }));
    builder.addCase(fetchCatAndUpdateThunk.fulfilled, (state, { payload }) => {
      const breedsArr = state?.list.map((breed) => {
        if (breed.id === state.selectedBreed) {
          return {
            ...breed,
            image: {
              ...breed.image,
              url: payload?.[0]?.url,
            },
          };
        }

        return breed;
      });

      return ({
        ...state,
        list: breedsArr,
      });
    });
  },
});

export const { prevBreed, nextBreed, currentBreed } = breedSlice.actions;
export const breedReducer = breedSlice.reducer;
