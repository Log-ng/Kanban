import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardType } from 'shared/types/kanban';

const initialState: BoardType = {
  id: '',
  boardName: '',
  columns: [],
  columnOrder: []
};

export const BoardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBoardId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { setBoardId } = BoardSlice.actions;
export default BoardSlice.reducer;
