import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidates: [
    {
      name: 'John Doe',
      position: 'President',
      platform: 'Building a better future through innovation and sustainability',
      votes: 145,
    },
    {
      name: 'Jane Smith',
      position: 'Vice President',
      platform: 'Promoting education and equal opportunities for all',
      votes: 132,
    },
  ],
  selectedCandidate: null,
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      state.candidates.push(action.payload);
    },
    removeCandidate: (state, action) => {
      state.candidates = state.candidates.filter(candidate => candidate.name !== action.payload.name);
    },
    selectCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
  },
});

export const { addCandidate, removeCandidate, selectCandidate } = candidateSlice.actions;
export default candidateSlice.reducer; // ✅ Ensure this is the default export
