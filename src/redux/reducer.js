import { createReducer } from '@reduxjs/toolkit';
import { getFilterValue } from './actions';

export const phonebook = createReducer(
  { filter: '' },
  {
    [getFilterValue]: (state, action) => {
      state.filter = action.payload;
    },
  }
);
