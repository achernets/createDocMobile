
import { JSX, useMemo } from "react";
import { DocPatternStageActionType, DocumentPattern, FilterCondition, FilterFieldType, FilterItem, SecurityClassification } from "../../../api/data";
import { Control, useWatch } from "react-hook-form";
import Users from "../../Form/Users";
import StageDeadline from "../../Form/StageDeadline";
import { compact, get } from "lodash";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";

type StageProps = {
  name: string,
  control: Control<any>,
  pattern: DocumentPattern,
  scGrifs?: SecurityClassification[]
};

const Stage = ({ name, pattern, control, scGrifs = [] }: StageProps): JSX.Element => {
  const { USE_BPM_ROLES, HIDE_BLOCKED_USERS_IN_STAGE } = useAppStore(useShallow((state) => ({
    USE_BPM_ROLES: get(state, 'SETTINGS.USE_BPM_ROLES', true),
    HIDE_BLOCKED_USERS_IN_STAGE: get(state, 'SETTINGS.HIDE_BLOCKED_USERS_IN_STAGE', true),
  })));

  const { t } = useTranslation();


  const [userOrGroups, maxSigner, actionType, changeOnDraft, stageReq] = useWatch({
    control: control,
    name: [`${name}.userOrGroups`, `${name}.maxSigner`, `${name}.actionType`, `${name}.changeOnDraft`, `${name}.stageReq`]
  })

  const filterActionType = useMemo(() => {
    switch (actionType) {
      case DocPatternStageActionType.SIGN:
        return 'INBOX';
      case DocPatternStageActionType.CONFIRM:
        return 'OUTBOX';
      default:
        return 'VIEW';
    }
  }, [actionType]);

  return <>
    <Users
      control={control}
      name={`${name}.userOrGroups`}
      label={t('MobileCreateDoc.executors')}
      disabled={!changeOnDraft}
      formItemProps={{
        required: stageReq
      }}
      changeProps={{
        useFavorite: true,
        patternId: pattern?.id || null,
        filters: compact([
          new FilterItem({
            field: filterActionType,
            value: pattern?.id,
            fType: FilterFieldType.STRING,
            condition: FilterCondition.EQUAL
          }),
          HIDE_BLOCKED_USERS_IN_STAGE ? new FilterItem({
            field: 'haveAccess',
            value: 'true',
            fType: FilterFieldType.BOOLEAN,
            condition: FilterCondition.EQUAL
          }) : null
        ]),
        selected: userOrGroups,
        scGrifs: scGrifs,
        maxSelected: maxSigner,
        types: compact(['users', actionType !== DocPatternStageActionType.SIGN ? 'groups' : null, 'scs', USE_BPM_ROLES ? 'roles' : null]),
        fixedExec: true
      }}
    />
    <StageDeadline
      name={`${name}`}
      control={control}
      formItemProps={{
        required: true
      }}
      disabled={!changeOnDraft}
    />
  </>;
};

export default Stage;