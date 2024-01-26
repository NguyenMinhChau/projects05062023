import {useContext} from 'react';
import {AppContext} from '../../components/Context';

const useAppContext = () => {
  const {state, dispatch} = useContext(AppContext);
  return {state, dispatch};
};
export default useAppContext;
