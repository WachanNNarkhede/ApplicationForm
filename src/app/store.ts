import { configureStore } from '@reduxjs/toolkit';
import applicationformReducer from '@/app/slices/index'

export const store = configureStore({
  reducer: {
   applicationForm:applicationformReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;