import {SCREEN_NAVIGATE} from '../../routersConfig/General.config';
import tw from '../../../styles/twrnc.global';
import {IconCP} from '../../../utils/icon.utils';
import {useGetColorThemeDisplay} from '../../../utils/appearance.utils';

export const DATA_NAV_PANE = authPage => {
  const {colors} = useGetColorThemeDisplay();
  return [
    {
      index: 1,
      label: 'Kế hoạch',
      icon: (
        <IconCP
          size={23}
          color={colors.BLACK_COLOR}
          name="calendar-outline"
          style={tw`mr-1`}
        />
      ),
      subMenuLev1: [
        {
          id: 0,
          label: 'Tổng quan',
          router: SCREEN_NAVIGATE.Tools_Config,
        },
      ],
    },
    {
      index: 2,
      label: 'Tools',
      icon: (
        <IconCP
          size={23}
          color={colors.BLACK_COLOR}
          name="construct-outline"
          style={tw`mr-1`}
        />
      ),
      subMenuLev1: [
        {
          id: 1,
          label: 'KTHT',
          icon: (
            <IconCP
              size={23}
              color={colors.BLACK_COLOR}
              name="layers-outline"
              style={tw`mr-1`}
            />
          ),
          subMenuLev2: [
            {
              id: 1,
              label: 'Check DV',
              router: SCREEN_NAVIGATE.Dashboard_Screen,
            },
            {
              id: 2,
              label: 'Check TĐ',
              router: SCREEN_NAVIGATE.Dashboard_Screen,
            },
          ],
        },
        {
          id: 2,
          label: 'BTHT',
          icon: (
            <IconCP
              size={23}
              color={colors.BLACK_COLOR}
              name="cog-outline"
              style={tw`mr-1`}
            />
          ),
          subMenuLev2: [
            {
              id: 1,
              label: 'Bảo Trì DV',
              router: SCREEN_NAVIGATE.Dashboard_Screen,
            },
            {
              id: 2,
              label: 'Bảo Trì TĐ',
              router: SCREEN_NAVIGATE.Dashboard_Screen,
            },
          ],
        },
      ],
    },
    {
      index: 3,
      label: 'KPI',
      icon: (
        <IconCP
          size={23}
          color={colors.BLACK_COLOR}
          name="trending-up-outline"
          style={tw`mr-1`}
        />
      ),
      subMenuLev1: [
        {
          id: 1,
          label: 'Cá nhân',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
        {
          id: 2,
          label: 'Thông tin',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
        {
          id: 3,
          label: 'Nhân sự',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
        {
          id: 4,
          label: 'Tham chiếu',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
        {
          id: 5,
          label: 'POP sao',
          router: SCREEN_NAVIGATE.Dashboard_Screen,
        },
      ],
    },
    {
      index: 4,
      label: 'Cài đặt',
      icon: (
        <IconCP
          size={23}
          color={colors.BLACK_COLOR}
          name="settings-outline"
          style={tw`mr-1`}
        />
      ),
      router: SCREEN_NAVIGATE.Setting_Screen,
    },
  ];
};
