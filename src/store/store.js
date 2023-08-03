import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './feature/sample';
import authReducer from './feature/auth';
// ...

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    auth:authReducer
  }
})