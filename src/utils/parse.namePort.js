export const parsePortName = port => {
  return port?.replace('GigabitEthernet', 'G').replace('Eth', 'E');
};
