import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from '../../styles/twrnc.global';
import {EMPTY_CHAR} from '../../helpers/_empty';
import {useGetColorThemeDisplay} from '../../utils/appearance.utils';
import {IconCP} from '../../utils/icon.utils';
import {WHITE_COLOR} from '../../styles/colors.global';

const MAP_COLOR = [
  {
    list: [
      'trễ hạn',
      'dropped',
      'down',
      'offline',
      'inactive',
      'quá hạn',
      'not ok',
      'reject',
      'critical',
      'false',
      'no',
      'tre han',
      'fail',
      'failed',
      'error',
      'không',
      'canceled',
      'not using',
      'close',
      'rejected',
      'chưa đánh giá',
      'chưa có điện',
      'off',
      'expired',
      'rejected',
      'check service nok',
      'check_service_nok',
      'exit',
      'disable',
    ],
    color: '#f34b4b',
  },
  {
    list: [
      'pending',
      'chưa rõ',
      'chưa có',
      'opening',
      'warning',
      'waiting',
      'cannot check',
      'chưa đánh giá',
      'running',
      'đang diễn ra,',
      'no-response',
    ],
    color: '#f39c12',
  },
  {
    list: ['in-progress', 'processing', 'in progress', 'using'],
    color: '#f1c40f',
  },
  {
    list: ['processing', 'cúp điện', 'inf-btht', 'plan'],
    color: '#1e90ff',
  },
  {
    list: ['đứt cáp', 'inf-ktht', 'admin', 'user'],
    color: '#3742fa',
  },
  {
    list: [
      'có',
      'completed',
      'đúng hạn',
      'closed',
      'up',
      'online',
      'true',
      'active',
      'ok',
      'approve',
      'finished',
      'yes',
      'normal',
      'true',
      'dung han',
      'success',
      'done',
      'đã đánh giá',
      'đã hoàn tất',
      'đã có điện',
      'on',
      'confirmed',
      'config_ok',
      'check service ok',
      'check_service_ok',
      'enable',
    ],
    color: '#43a047',
  },
  {
    list: ['executing'],
    color: '#8e44ad',
  },
];

const RANDOM_COLOR = [
  '#f34b4b',
  '#f39c12',
  '#3498db',
  '#5375e5',
  '#43a047',
  '#1abc9c',
  '#e84393',
  '#40739e',
  '#B53471',
  '#8e44ad',
  // 'expired',
];

export default function RenderTagCP({
  tag,
  randomColor = false,
  outline = false,
  styleContainer,
  styleText,
  textReplace = '',
  iconName,
  sizeIcon = 16,
  colorIcon,
}) {
  const {colors} = useGetColorThemeDisplay();
  const bgColor = outline
    ? 'transparent'
    : !randomColor
    ? MAP_COLOR.find(item => {
        return item.list.includes(tag?.toLowerCase());
      })?.color
    : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)];
  const borderColor = outline
    ? !randomColor
      ? MAP_COLOR.find(item => {
          return item.list.includes(tag?.toLowerCase());
        })?.color
      : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)]
    : !outline
    ? MAP_COLOR.find(item => {
        return item.list.includes(tag?.toLowerCase());
      })?.color
    : '#ccc';
  const textColor = outline
    ? !randomColor
      ? MAP_COLOR.find(item => {
          return item.list.includes(tag?.toLowerCase());
        })?.color
      : RANDOM_COLOR[Math.floor(Math.random() * RANDOM_COLOR.length)]
    : bgColor
    ? WHITE_COLOR
    : colors.BLACK_COLOR;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={tw.style(
        'rounded-md py-1 px-2 border flex-row items-center gap-1',
        {
          backgroundColor: bgColor,
          borderColor: borderColor || colors.BLACK_COLOR,
          ...styleContainer,
        },
      )}>
      {iconName && (
        <IconCP
          name={iconName}
          size={sizeIcon}
          color={colorIcon ? colorIcon : textColor}
        />
      )}
      <Text
        style={tw.style('font-bold text-[12px]', {
          color: textColor,
          ...styleText,
        })}>
        {textReplace ? textReplace : tag || EMPTY_CHAR}
      </Text>
    </TouchableOpacity>
  );
}
