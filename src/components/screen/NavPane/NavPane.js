import React, {useState} from 'react';
import {View, Text, Image, SafeAreaView, FlatList} from 'react-native';
import tw from '../../../styles/twrnc.global';
import {DATA_NAV_PANE} from './NavPane.data';
import AccordionCP from '../../General/AccordionCP';
import useAppContext from '../../../utils/hooks/useAppContext';
import {SET_TOGGLE_PAYLOAD} from '../../Context/AppContext.reducer';
import RenderTagCP from '../../General/RenderTag';
import {useColorThemeNavPane} from './config';

const NavigationMenu = ({navigation}) => {
  const {dispatch, state} = useAppContext();
  const {currentUser} = state.set_data;
  const {colors} = useColorThemeNavPane();

  const {email, role, authPage} = {...currentUser};
  const [isShowSubMenuLev1, setIsShowSubMenuLev1] = useState(false);
  const [isShowSubMenuLev2, setIsShowSubMenuLev2] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState('');

  const onClickMenuItem = item => {
    setIsMenuClicked(item?.label);
    dispatch(
      SET_TOGGLE_PAYLOAD({
        key: 'isVisible_menu',
        value: false,
      }),
    );
    // Add logic to handle the selected menu item
    navigation.navigate(item?.router);
  };

  const toggleDropdownSubMenuLev1 = item => {
    setIsMenuClicked(item?.label);
    setIsShowSubMenuLev1(!isShowSubMenuLev1);
  };

  const toggleDropdownSubMenuLev2 = () => {
    setIsShowSubMenuLev2(!isShowSubMenuLev2);
  };

  const RenderFlatList = ({item, index}) => {
    const isOpen =
      item?.subMenuLev1 && isMenuClicked === item?.label
        ? isShowSubMenuLev1
        : false;

    return (
      <AccordionCP
        dataList={item?.subMenuLev1 || []}
        title={item?.label}
        sourceIcon={item?.icon}
        colorDots="#6d55f5"
        onRedirect={itemSubMenu => {
          const itemClick = item?.subMenuLev1 ? itemSubMenu : item;
          onClickMenuItem(itemClick);
        }}
        // MENU SUB 1
        open={isOpen}
        toggleDropDown={
          item?.subMenuLev1 ? () => toggleDropdownSubMenuLev1(item) : () => {}
        }
        // MENU SUB 2
        openSub2={isShowSubMenuLev2}
        toggleDropDownSub2={toggleDropdownSubMenuLev2}
      />
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 flex-col`}>
      <View
        style={tw.style(
          `w-full px-2 py-4 rounded-lg flex-row gap-2 items-start`,
          {
            backgroundColor: colors.BACKGROUND_CARD,
          },
        )}>
        <Image
          style={tw`w-[40px] h-[40px] rounded-full`}
          source={require('../../../assets/images/avatar_placeholder.png')}
          resizeMode="contain"
        />
        <View style={tw`flex-col items-start gap-1`}>
          <Text
            style={tw.style(`font-bold text-[15px]`, {
              color: colors.BLACK_COLOR,
            })}>
            {email || 'icdp@fpt.com'}
          </Text>
          <RenderTagCP
            tag={role || 'Admin'}
            styleText={tw.style('text-[10px]')}
          />
        </View>
      </View>
      <View style={tw.style('w-full mb-3')}></View>
      <View style={tw`w-full flex-1 flex-col gap-2`}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA_NAV_PANE(authPage)}
          renderItem={RenderFlatList}
          keyExtractor={(item, _idx) => _idx.toString()}
          contentContainerStyle={tw`flex-col gap-3 flex-grow`}
        />
      </View>
    </SafeAreaView>
  );
};

export default NavigationMenu;
