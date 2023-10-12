import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiUrlAllBreeds,
  apiUrlOneBreed,
  headers,
} from '../../constants/api';
import { BreedListResponse, BreedResponse } from './types';

export const fetchBreedsThunk = createAsyncThunk(
  'breed/fetchAll',
  async () => {
    const res = await axios<BreedListResponse>(apiUrlAllBreeds, { headers });
    return res.data;
  },
);

export const fetchCatAndUpdateThunk = createAsyncThunk(
  'breed/fetchOne',
  async (breedId: string) => {
    const res = await axios<BreedResponse>(`${apiUrlOneBreed}${breedId}`, { headers });
    return res.data;
  },
);
