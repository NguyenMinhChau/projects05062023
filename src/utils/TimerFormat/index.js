import moment from 'moment';
import 'moment/locale/vi';
import {EMPTY_CHAR} from '../../helpers/_empty';

export const dddd_dd_mm_yyyy = date => {
  return date
    ? moment(date).locale('vi').format('dddd, DD/MM/YYYY')
    : EMPTY_CHAR;
};
export const dddd_dd_mm_yyyy_hh_mm_ss = date => {
  return date
    ? moment(date).locale('vi').format('dddd, DD/MM/YYYY HH:mm:ss')
    : EMPTY_CHAR;
};

export const dd_mm_yyyy = date => {
  return date ? moment(date).format('DD.MM.YYYY') : EMPTY_CHAR;
};
export const dd_mm_yyyy_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('DD.MM.YYYY')
    : EMPTY_CHAR;
};

export const dd__mm__yyyy = date => {
  return date ? moment(date).format('DD/MM/YYYY') : EMPTY_CHAR;
};
export const dd__mm__yyyy_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('DD/MM/YYYY')
    : EMPTY_CHAR;
};

export const dd_mm_yy_hh_mm_ss = date => {
  return date ? moment(date).format('DD.MM.YYYY HH:mm:ss') : EMPTY_CHAR;
};
export const dd_mm_yy_hh_mm_ss_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('DD.MM.YYYY HH:mm:ss')
    : EMPTY_CHAR;
};

export const hh_mm = date => {
  return date ? moment(date).format('HH:mm') : EMPTY_CHAR;
};
export const hh_mm_sub7 = date => {
  return date ? moment(date).subtract(7, 'hours').format('HH:mm') : EMPTY_CHAR;
};

export const hh_mm_A = date => {
  return date ? moment(date).format('HH:mm A') : EMPTY_CHAR;
};
export const hh_mm_A_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('HH:mm A')
    : EMPTY_CHAR;
};

export const hh_mm_a = date => {
  return date ? moment(date).format('HH:mm a') : EMPTY_CHAR;
};
export const hh_mm_a_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('HH:mm a')
    : EMPTY_CHAR;
};

export const hh_mm_ss = date => {
  return date ? moment(date).format('HH:mm:ss') : EMPTY_CHAR;
};
export const hh_mm_ss_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('HH:mm:ss')
    : EMPTY_CHAR;
};

export const dd_mm_yyyy_hh_mm_ss_comma = date => {
  return date ? moment(date).format('DD/MM/YYYY, HH:mm:ss') : EMPTY_CHAR;
};
export const dd_mm_yyyy_hh_mm_ss_comma_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('DD/MM/YYYY, HH:mm:ss')
    : EMPTY_CHAR;
};

export const yyyy_mm_dd = date => {
  return date ? moment(date).format('YYYY-MMM-DD') : EMPTY_CHAR;
};
export const yyyy_mm_dd_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('YYYY-MMM-DD')
    : EMPTY_CHAR;
};

export const yyyy_mm = date => {
  return date ? moment(date).format('YYYY-MM') : EMPTY_CHAR;
};
export const yyyy_mm_sub7 = date => {
  return date
    ? moment(date).subtract(7, 'hours').format('YYYY-MM')
    : EMPTY_CHAR;
};
