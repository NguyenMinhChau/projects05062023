import {useState, useCallback} from 'react';

export const useRefreshList = (refreshFunc = () => {}) => {
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshFunc();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return {
    refreshing,
    onRefresh,
  };
};
