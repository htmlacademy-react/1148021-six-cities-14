import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { makeMockState, makeMockStore } from './mocks';
import { MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { AppState } from '../store/store.types';

export function withMockHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withMockStore(component: JSX.Element, state: Partial<AppState> = {}): ComponentWithMockStore {
  const { mockStore, mockAxiosAdapter } = makeMockStore(state);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export function withMockHistoryStore(component: React.ReactElement, state: Partial<AppState> = {}) {
  const initialMockStoreState = makeMockState(state);
  const componentWithHistory = withMockHistory(component);
  const componentWithStore = withMockStore(componentWithHistory, initialMockStoreState);

  return componentWithStore;
}
