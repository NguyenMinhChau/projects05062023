import {useCallback, useState} from 'react';

// ----------------------------------------------------------------------

export default function useToggle(defaultChecked) {
  const [toggle, setToggle] = useState(defaultChecked || false);

  return {
    toggle,
    onToggle: useCallback(() => setToggle(state => !state), []),
    onOpen: () => setToggle(true),
    onClose: () => setToggle(false),
    setToggle,
  };
}
