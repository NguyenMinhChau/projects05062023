import useAppContext from '../../../../../utils/hooks/useAppContext';
import {SET_DATA_PAYLOAD} from '../../../../Context/AppContext.reducer';

export const useMaintanceCCDC = () => {
  const {state, dispatch} = useAppContext();
  const {isLoading, search} = state.set_data.maintance_ccdc;

  const handleChangeValue = (key, value) => {
    dispatch(
      SET_DATA_PAYLOAD({
        key: 'maintance_ccdc',
        value: {
          [key]: value,
        },
      }),
    );
  };

  return {
    isLoading,
    search,

    handleChangeValue,
  };
};
