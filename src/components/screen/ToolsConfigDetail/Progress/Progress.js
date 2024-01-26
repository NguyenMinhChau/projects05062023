import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import {useRefreshList} from '../../../../utils/refreshList.utils';
import StepperVerticalCP from '../../../General/StepperVerticalCP';
import {fList} from '../../../../utils/array.utils';
import {
  STEP_CODE,
  STEP_CODE_REPLACE_CE,
  getColorFillCircleActiveProgress,
  getColorResultTaskStatus,
  getMessageResultStatus,
  getStepActive,
} from '../config';
import {useGetColorThemeDisplay} from '../../../../utils/appearance.utils';
import {WHITE_COLOR} from '../../../../styles/colors.global';
import {IconCP} from '../../../../utils/icon.utils';

export default function Progress({navigation, dataByObjId}) {
  const {refreshing, onRefresh} = useRefreshList();
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemCurrent, setItemCurrent] = React.useState(null);
  const {colors} = useGetColorThemeDisplay();

  const {jobInfo, deviceInfo} = {...dataByObjId};

  const {info, ipDev, resultStatus, message, checkServiceHuawei} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {popName, modelDev, nameDev} = {...info};

  const {
    timeFinish,
    timeStart,
    createdAt,
    taskMaker,
    taskRunner,
    status,
    typeJob,
  } = {
    ...jobInfo,
  };

  const step =
    (typeJob === 'CONFIG_REPLACE_CE_SWITCH'
      ? STEP_CODE_REPLACE_CE
      : STEP_CODE)?.[status] || 0;
  let taskStatus = status;

  const colorMsg = getColorResultTaskStatus(resultStatus, taskStatus);
  const fMsg = getMessageResultStatus(resultStatus, taskStatus, message);

  const DATA_STEPPER_VERTICAL = typeJobPara => {
    return [
      {
        title: 'Tạo kế hoạch',
        body: [],
        date: new Date(createdAt),
        active: getStepActive(step, 0),
        status: getStepActive(step, 0) && fMsg,
        colorStatus: colorMsg,
        colorTitle: colorMsg,
        taskMaker: taskMaker,
      },
      ...(typeJobPara === 'REBOOT_POP'
        ? [
            {
              title: 'Reboot POP',
              body: [
                {
                  label: 'IP TB',
                  value: ipDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
                {
                  label: 'Tên TB',
                  value: nameDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
                {
                  label: 'Model TB',
                  value: modelDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
              ],
              date: new Date(timeStart),
              active: getStepActive(step, 1),
              status: getStepActive(step, 1) && fMsg,
              colorStatus: colorMsg,
              colorTitle: colorMsg,
              taskMaker: taskRunner,
            },
          ]
        : typeJobPara === 'UPGRADE_UPLINK'
        ? []
        : [
            {
              title: 'Lắp thiết bị',
              body: [
                {
                  label: 'IP TB',
                  value: ipDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
                {
                  label: 'Tên TB',
                  value: nameDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
                {
                  label: 'Model TB',
                  value: modelDev,
                  color: colorMsg,
                  active: getStepActive(step, 1),
                },
              ],
              date: new Date(timeStart),
              active: getStepActive(step, 1),
              status: getStepActive(step, 1) && fMsg,
              colorStatus: colorMsg,
              colorTitle: colorMsg,
              taskMaker: taskRunner,
            },
            {
              title: 'Cấu hình TB',
              body: [
                {
                  label: 'IP TB',
                  value: ipDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
                {
                  label: 'Tên TB',
                  value: nameDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
                {
                  label: 'Model TB',
                  value: modelDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
              ],
              date: new Date(timeStart),
              active: getStepActive(step, 2),
              status: getStepActive(step, 2) && fMsg,
              colorStatus: colorMsg,
              colorTitle: colorMsg,
              taskMaker: taskRunner,
            },
          ]),
      ...(typeJobPara === 'UPGRADE_UPLINK'
        ? [
            {
              title: 'Cấu hình TB',
              body: [
                {
                  label: 'IP TB',
                  value: ipDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
                {
                  label: 'Tên TB',
                  value: nameDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
                {
                  label: 'Model TB',
                  value: modelDev,
                  color: colorMsg,
                  active: getStepActive(step, 2),
                },
              ],
              date: new Date(timeStart),
              active: getStepActive(step, 2),
              status: getStepActive(step, 2) && fMsg,
              colorStatus: colorMsg,
              colorTitle: colorMsg,
              taskMaker: taskRunner,
            },
          ]
        : []),

      ...(typeJobPara === 'CONFIG_REPLACE_CE_SWITCH'
        ? [
            {
              title: 'Kiểm tra dịch vụ',
              body: [
                {
                  label: 'IP TB',
                  value: ipDev,
                  color: colorMsg,
                  active: getStepActive(step, 3),
                },
                {
                  label: 'Tên TB',
                  value: nameDev,
                  color: colorMsg,
                  active: getStepActive(step, 3),
                },
                {
                  label: 'Model TB',
                  value: modelDev,
                  color: colorMsg,
                  active: getStepActive(step, 3),
                },
              ],
              date: new Date(timeStart),
              active: getStepActive(step, 3),
              status: getStepActive(step, 3) && fMsg,
              colorStatus: colorMsg,
              colorTitle: colorMsg,
              taskMaker: taskRunner,
              checkServiceHuawei: fList([checkServiceHuawei?.[0]]),
            },
          ]
        : []),
      {
        title: 'Hoàn thành',
        body: [
          {
            label: 'Kết quả',
            value: 'Done',
            color: '#43a047',
            active: getStepActive(step, 3) || getStepActive(step, 4),
          },
        ],
        date: new Date(timeFinish),
        active: getStepActive(step, 3) || getStepActive(step, 4),
        status: (getStepActive(step, 3) || getStepActive(step, 4)) && fMsg,
        colorStatus: colorMsg,
        colorTitle: colorMsg,
        taskMaker: taskRunner,
      },
    ];
  };

  React.useEffect(() => {
    const index = fList(DATA_STEPPER_VERTICAL(typeJob)).findIndex(
      item => item.active,
    );
    setCurrentPage(index);
    setItemCurrent(DATA_STEPPER_VERTICAL[index]);
  }, [currentPage]);
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={tw`items-center justify-center flex-1 flex-row px-2`}
        style={tw.style({
          backgroundColor: colors.WHITE_COLOR,
        })}>
        <StepperVerticalCP
          colorCircle={getColorFillCircleActiveProgress(
            resultStatus,
            taskStatus,
          )}
          data={DATA_STEPPER_VERTICAL(typeJob)}
          currentPage={currentPage}
          itemCurrent={itemCurrent}
          iconSuccess={
            <IconCP name="checkmark-outline" size={25} color={WHITE_COLOR} />
          }
        />
      </ScrollView>
    </>
  );
}
