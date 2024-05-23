import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from "./index";


export const useAppDisPatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
