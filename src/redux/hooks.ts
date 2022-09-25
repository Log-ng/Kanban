import { TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { RootState, AppDispatch } from './store';

export const useMySelector: TypedUseSelectorHook<RootState> = useSelector;
export const useMyDispatch = () => useDispatch<AppDispatch>();