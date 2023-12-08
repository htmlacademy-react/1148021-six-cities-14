import { AuthStatus, NameSpace } from '../../const';
import { mockAuthData, mockUserData } from '../../utils/mock';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AppState } from '../store.types';
import { userSlice } from './user.slice';

describe('User Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.Auth, userData: null };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.Unknown, userData: null };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" and userData with "checkAuthAction.fulfilled" action', () => {
    const initialState: AppState[NameSpace.User] = { authStatus: AuthStatus.NoAuth, userData: null };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.Auth, userData: mockUserData() };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(mockUserData(), '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState: AppState[NameSpace.User] = { authStatus: AuthStatus.Unknown, userData: null };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.NoAuth, userData: null };

    const result = userSlice.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" and userData with "loginAction.fulfilled" action', () => {
    const initialState: AppState[NameSpace.User] = { authStatus: AuthStatus.NoAuth, userData: null };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.Auth, userData: mockUserData() };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(mockUserData(), '', mockAuthData()));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState: AppState[NameSpace.User] = { authStatus: AuthStatus.Unknown, userData: null };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.NoAuth, userData: null };

    const result = userSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" and reset UserData, with "logoutAction.fulfilled" action', () => {
    const initialState: AppState[NameSpace.User] = { authStatus: AuthStatus.Auth, userData: mockUserData() };
    const expectedState: AppState[NameSpace.User] = { authStatus: AuthStatus.NoAuth, userData: null };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
