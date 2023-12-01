import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store/store.types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
