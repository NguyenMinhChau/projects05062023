const ErrorStatus = [
  'error',
  'close',
  'not ok',
  'fail',
  'failed',
  'invalid',
  'wrong',
  'incorrect',
  'unauthorized',
  'unavailable',
  'unsuccessful',
  'unable',
  'unauthorized',
  'false',
  'check service nok',
];

const SuccessStatus = [
  'success',
  'ok',
  'done',
  'successful',
  'available',
  'able',
  'authorized',
  'true',
  'check service ok',
  'config ok',
];

const WarningStatus = ['warning', 'warn', 'unstable', 'waiting'];

const InfoStatus = ['info', 'information', 'inform'];

export const ColorsStatusHandle = status => {
  const statusLowercase = status?.toLowerCase()?.replace(/_/g, ' ');
  if (ErrorStatus.includes(statusLowercase)) return '#f44336';
  else if (SuccessStatus.includes(statusLowercase)) return '#57cf7f';
  else if (WarningStatus.includes(statusLowercase)) return '#ff9800';
  else if (InfoStatus.includes(statusLowercase)) return '#2196f3';
  return '#2196f3';
};
