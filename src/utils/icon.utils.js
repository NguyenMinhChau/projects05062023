import IconIon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {PRIMARY_COLOR} from '../styles/colors.global';
import tw from '../styles/twrnc.global';

export const TYPE_ICON = {
  iconIon: 'icon-ion',
  iconFontAwesome: 'icon-fontAwesome',
  iconMaterial: 'icon-material',
};

export const IconCP = ({
  typeIcon,
  name,
  size = 25,
  color = PRIMARY_COLOR,
  style,
}) => {
  const IconCheck =
    typeIcon === TYPE_ICON.iconMaterial
      ? IconMaterial
      : typeIcon === TYPE_ICON.iconFontAwesome
      ? IconFontAwesome
      : IconIon;
  return (
    <>
      <IconCheck
        name={name}
        size={size}
        color={color}
        style={tw.style({...style})}
      />
    </>
  );
};
