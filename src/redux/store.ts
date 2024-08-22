import {configureStore} from '@reduxjs/toolkit';
//redux-persist

// Reducers
import {PostReducer} from './actions/postSlice';
import {EventReducer} from './actions/eventSlice';
import {LoginReducer} from './actions/loginSlice';
import {UtilsReducer} from './actions/utilSlice';

export const store = configureStore({
  reducer: {
    post: PostReducer,
    event: EventReducer,
    login: LoginReducer,
    utils: UtilsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
