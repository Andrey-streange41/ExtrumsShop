import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type {RootState,AppDispatch} from './app/store.ts';


export const useAppDispatch = () => useDispatch<AppDispatch>();



export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
    
