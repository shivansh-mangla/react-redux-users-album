import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const doDispatch = useCallback((arg) =>{
    setError(null);
    setIsLoading(true);
  
    dispatch(thunk(arg))
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [dispatch, thunk]);

  return [doDispatch, isLoading, error]
}