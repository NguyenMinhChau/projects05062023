import React from 'react';
import {View} from 'react-native';
import tw from '../../../../styles/twrnc.global';
import WrapperToolsConfig from '../Wrapper';
import {dd_mm_yyyy_hh_mm_ss_comma_sub7} from '../../../../utils/TimerFormat';
import RowDialogCP from '../../../General/Dialog/RowDialogCP';
import {
  TASK_TYPE,
  TYPE_JOB,
  useColorThemeTools,
  useHandleColor,
} from '../../Tools/config';
import {ColorsStatusHandle} from '../../../../utils/ColorsHandle';
import Progress from '../Progress/Progress';
import {
  STEP_CODE_RESULT_VIE_CONFIG,
  STEP_CODE_VIE_CONFIG,
  useColorThemeToolsDetail,
} from '../config';

export default function TTKH({navigation, route}) {
  const {dataByObjId} = {...route};
  const {jobInfo, deviceInfo} = {...dataByObjId};
  const {colors} = useColorThemeToolsDetail();
  const {colors: colorsTools} = useColorThemeTools();

  const {info, resultStatus, timeStart, timeFinish} = {
    ...(deviceInfo?.[0] || deviceInfo),
  };

  const {modelDev, typeDev, nameDev} = {...info};

  const {
    createdAt,
    typeJob,
    taskMaker,
    taskRunner,
    status,
    _id: idTask,
  } = {
    ...jobInfo,
  };

  const eventVi = typeJob
    ? TASK_TYPE.filter(x => x.value === typeJob)?.[0]?.description || typeJob
    : 'Chưa định nghĩa tên KH';
  const stepResultVi =
    resultStatus &&
    STEP_CODE_RESULT_VIE_CONFIG.filter(x => x.label === resultStatus)?.[0]
      ?.value;
  const stepStatusVi =
    status && STEP_CODE_VIE_CONFIG.filter(x => x.label === status)?.[0]?.value;

  return (
    <>
      <WrapperToolsConfig navigation={navigation} route={route}>
        {/* INFO GENERAL */}
        <View
          style={tw.style(
            `w-full ${
              typeJob === TYPE_JOB.CONFIG_REPLACE_CE_SWITCH
                ? 'min-h-[450px]'
                : 'min-h-[370px]'
            }`,
          )}>
          <Progress navigation={navigation} dataByObjId={dataByObjId} />
        </View>
        <View
          style={tw.style(`p-2 w-full rounded-xl`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <RowDialogCP
            label="Thời gian tạo"
            leftNameIcon="time-outline"
            noneBorderBottom
            value={dd_mm_yyyy_hh_mm_ss_comma_sub7(createdAt)}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Thời gian thực hiện"
            value={timeStart && dd_mm_yyyy_hh_mm_ss_comma_sub7(timeStart)}
            noneBorderBottom
            styleLabel={tw`font-medium`}
            leftNameIcon="timer-outline"
          />
          <RowDialogCP
            label="Thời gian kết thúc"
            value={timeFinish && dd_mm_yyyy_hh_mm_ss_comma_sub7(timeFinish)}
            noneBorderBottom
            styleLabel={tw`font-medium`}
            leftNameIcon="stopwatch-outline"
          />
        </View>

        <View
          style={tw.style(`p-2 w-full rounded-xl my-3`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <RowDialogCP
            label="Tên KH"
            leftNameIcon="document-text-outline"
            noneBorderBottom
            styleVal={tw.style(
              `text-[${useHandleColor(typeJob, colorsTools)}]`,
            )}
            value={eventVi}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Tên thiết bị"
            leftNameIcon="scale-outline"
            noneBorderBottom
            value={nameDev}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Loại thiết bị"
            leftNameIcon="scale-outline"
            noneBorderBottom
            value={typeDev}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Model thiết bị"
            leftNameIcon="scale-outline"
            noneBorderBottom
            value={modelDev}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Người tạo KH"
            leftNameIcon="person-outline"
            noneBorderBottom
            value={taskMaker}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Người thực hiện KH"
            leftNameIcon="person-outline"
            noneBorderBottom
            value={taskRunner}
            styleLabel={tw`font-medium`}
          />
        </View>

        <View
          style={tw.style(`px-2 w-full mb-5 rounded-xl`, {
            backgroundColor: colors.BACKGROUND_CARD,
          })}>
          <RowDialogCP
            label="Trạng thái"
            leftNameIcon="chatbubbles-outline"
            noneBorderBottom
            value={stepStatusVi}
            styleVal={tw.style(`text-[${ColorsStatusHandle(status)}]`)}
            styleLabel={tw`font-medium`}
          />
          <RowDialogCP
            label="Kết quả"
            leftNameIcon="sync-outline"
            noneBorderBottom
            value={stepResultVi}
            styleVal={tw.style(`text-[${ColorsStatusHandle(resultStatus)}]`)}
            styleLabel={tw`font-medium`}
          />
        </View>
      </WrapperToolsConfig>
    </>
  );
}
