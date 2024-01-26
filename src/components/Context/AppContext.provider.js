import {useReducer} from 'react';
import reducer, {initialStateApp} from './AppContext.reducer';
import AppContext from './AppContext.create';

const ProviderContext = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialStateApp);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export default ProviderContext;
