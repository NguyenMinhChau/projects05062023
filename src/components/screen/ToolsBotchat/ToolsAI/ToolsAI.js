import React from 'react';
import {View, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {DATA_TOOLS_AI_CONFIG} from './config';
import {IconCP} from '../../../../utils/icon.utils';
import useAppContext from '../../../../utils/hooks/useAppContext';
import BannerNestedScreen from '../../../General/BannerNestedScreen';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {SafeAreaWrap} from '../../../General/SafeAreaWrap';
import {useCssApp} from '../../../../utils/css.utils';

const ToolsAIScreen = ({navigation}) => {
  const {state} = useAppContext();
  const {colors} = useGetColorThemeDisplay();
  const {shadowCss} = useCssApp();

  return (
    <SafeAreaWrap
      backgroundColorTop={colors.MAIN_COLOR}
      backgroundColorBottom={colors.WHITE_COLOR}>
      <BannerNestedScreen navigation={navigation} title="Tools xử lý ảnh" />
      <View style={{flex: 1, backgroundColor: colors.WHITE_COLOR}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw.style('p-3 flex-grow', {
            backgroundColor: colors.WHITE_COLOR,
          })}>
          <View
            style={tw.style('rounded-lg p-2', {
              backgroundColor: colors.BACKGROUND_CARD,
              ...shadowCss(),
            })}>
            {DATA_TOOLS_AI_CONFIG.map((item, index) => {
              return (
                <RowDialogCP
                  key={index}
                  label={item?.label}
                  leftNameIcon={item?.iconName}
                  typeIcon={item?.typeIcon || ''}
                  styleLabel={tw`font-medium`}
                  ValueCP={() => {
                    return (
                      <IconCP
                        size={15}
                        color={colors.BLACK_COLOR}
                        name="chevron-forward-outline"
                      />
                    );
                  }}
                  styleRow={tw`py-5 ${
                    item?.noneBorderBottom && 'border-b-[0px]'
                  }`}
                  onClickAccord={() =>
                    navigation.navigate({
                      name: item?.router,
                      params: {
                        value: item?.value || 'ac_quy',
                      },
                    })
                  }
                  noBullet
                  disabled={item?.disabled}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrap>
  );
};

export default ToolsAIScreen;
