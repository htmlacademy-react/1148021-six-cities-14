import { AppThunkDispatch, makeMockState } from './mock';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { AppState } from '../store/store.types';
import { withHistory } from './mock-component';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(component: JSX.Element, initialState: Partial<AppState> = {}): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppState, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export function widthHistoryStore(component: React.ReactElement) {
  const initialMockStoreState = makeMockState();
  const componentWithHistory = withHistory(component);
  const componentWithStore = withStore(componentWithHistory, initialMockStoreState);

  return componentWithStore;
}
