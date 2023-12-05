import { AuthStatus, NameSpace } from '../../const';
import { AppState, UserData } from '../store.types';

export const getAuthStatus = (state: AppState): AuthStatus => state[NameSpace.User].authStatus;
export const getAuthCheckedStatus = (state: AppState): boolean =>
  state[NameSpace.User].authStatus !== AuthStatus.Unknown;
export const getIsAuthorized = (state: AppState): boolean => state[NameSpace.User].authStatus === AuthStatus.Auth;
export const getUserData = (state: AppState): UserData | null => state[NameSpace.User].userData;
