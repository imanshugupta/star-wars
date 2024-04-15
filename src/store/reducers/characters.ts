// src/characterSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store";
import axios from "axios";

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface State {
  isLoading: boolean;
  error: null | string;
  characters: Character[];
  count: number;
  next: boolean;
  previous: boolean;
  page: number;
}

const initialState: State = {
  isLoading: true,
  error: null,
  characters: [],
  page: 0,
  previous: false,
  next: true,
  count: 0,
};

export const fetchData = createAsyncThunk(
  "counter/fetchData",
  async (next: boolean, { getState }) => {
    const state: any = getState();
    let page = state.characters.page;
    if (next) page++;
    else page--;
    const response = await axios.get("https://swapi.dev/api/people", {
      params: { page },
    });
    return { ...response.data, page };
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { count, next, previous, results, page } = action.payload;
        state.isLoading = false;
        state.count = count;
        state.next = !!next;
        state.previous = !!previous;
        state.characters = results;
        state.page = page;
        console.log(results);
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong!";
      });
  },
  reducers: {
    updateCharacters(state, action) {
      return { ...state, characters: action.payload };
    },
    // You can define other reducers here
  },
});

export const { updateCharacters } = characterSlice.actions;
export default characterSlice.reducer;
export const characterSelector = (state: RootState) => state.characters;
