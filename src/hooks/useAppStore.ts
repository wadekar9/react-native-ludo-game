import { RootState, ApplicationDispatch } from "$redux/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => ApplicationDispatch = useDispatch;
export { useAppSelector, useAppDispatch };