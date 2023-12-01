import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userSlice } from './user/user.slice';
import { dataSlice } from './data/data.slice';
import { citiesSlice } from './cities/cities.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.Cities]: citiesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
