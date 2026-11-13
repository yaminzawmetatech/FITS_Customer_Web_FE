import React, { useCallback, useState } from "react";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CachedIcon from "@mui/icons-material/Cached";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Toolbar from "../../../../components/Toolbar";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToolbarApplicationNewButton from "./ToolbarApplicationNewButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ToolbarApplicationCancelButton from "./ToolbarApplicationCancelButton";
import { IHCO } from "../../../../constants/userGroup";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ToolbarIncompleteFieldsModal from "./ToolbarIncompleteFieldsModal";
import HistoryIcon from "@mui/icons-material/History";
import ToolbarIncompleteFieldsHistoryModal from "./ToolbarIncompleteFieldsHistoryModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToolbarCriteriaModal from "./ToolbarCriteriaModal";
import PlaylistRemoveOutlinedIcon from "@mui/icons-material/PlaylistRemoveOutlined";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";

const ToolbarApplication = ({
  handleSubmit,
  onSubmit,
  onSubmitNotReady,
  editAbleForm,
  applicationResponses,
  handleModalOpen,
  isTabletView,
  onSubmitSendToCMCO,
}) => {
  const dispatch = useDispatch();

  const { next, previous, application } = useSelector(
    (state) => state.applicationDetail
  );

  const { user } = useSelector((state) => state.auth);

  const { id, categoryId, categoryName, uuid, mode } = useParams();
  const navigate = useNavigate();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openIncompleteModal, setOpenIncompleteModal] = useState(false);
  const [openIncompleteHistoryModal, setOpenIncompleteHistoryModal] =
    useState(false);
  const [openCriteriaModal, setOpenCriteriaModal] = useState(false);

  const handleCloseNewModal = useCallback(() => {
    setOpenNewModal(false);
  }, []);

  const handleOpenNewModal = useCallback(() => {
    setOpenNewModal(true);
  }, []);

  const handleOpenIncompleteModal = useCallback(() => {
    setOpenIncompleteModal(true);
  }, []);

  const handleOpenCriteriaModal = useCallback(() => {
    setOpenCriteriaModal(true);
  }, []);

  const handleOpenIncompleteHistoryModal = useCallback(() => {
    setOpenIncompleteHistoryModal(true);
  }, []);

  const handleCloseIncompleteModal = useCallback(() => {
    setOpenIncompleteModal(false);
  }, []);

  const handleCloseIncompleteHistoryModal = useCallback(() => {
    setOpenIncompleteHistoryModal(false);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setOpenCancelModal(false);
  }, []);

  const handleCloseCriteriaModal = useCallback(() => {
    setOpenCriteriaModal(false);
  }, []);

  const handleOpenCancelModal = useCallback(() => {
    setOpenCancelModal(true);
  }, []);

  const nextHandleOnClick = useCallback(() => {
    if (next?.id) {
      navigate(
        `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${next?.uuid}/${next?.id}`
      );
    }
  }, [navigate, categoryName, categoryId, next?.uuid, next?.id]);

  const previousHandleOnClick = useCallback(() => {
    if (previous?.id) {
      navigate(
        `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${previous?.uuid}/${previous?.id}`
      );
    }
  }, [previous?.uuid, previous?.id, categoryId, navigate, categoryName]);

  const refreshHandleOnClick = useCallback(() => {
    window.location.reload();
  }, []);

  const viewHandleOnClick = useCallback(() => {
    navigate(
      `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${application?.uuid}/${application?.id}/view`
    );
  }, [application?.uuid, application?.id, categoryId, navigate, categoryName]);

  const editHandleOnClick = useCallback(() => {
    navigate(
      `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${application?.uuid}/${application?.id}`
    );
  }, [application?.uuid, application?.id, categoryId, navigate, categoryName]);

  // const surveyEditable =
  //   user?.is_super === true && mode !== "view" ? false : !editAbleForm;

  const fieldSurveyEditable = (() => {
    if (user?.is_super === true && mode !== "view") {
      return true;
    }
  
    const isRestrictedUser = ["CMCO", "CMCE", "Agent"].includes(user?.user_group);
   
    if (isRestrictedUser) {
      if(application?.field_survey_result?.length > 0){
        return application?.field_survey_result[0]?.investigation_status  === "conducting";
      }else{
        return true;
      }
    }else{
      return editAbleForm;
    }
  })();

  const inhouseSurveyEditable = (() => {
    if (user?.is_super === true && mode !== "view") {
      return true;
    }
  
    const isRestrictedUser = ["CMCO", "CMCE", "Agent"].includes(user?.user_group);
  

    if (isRestrictedUser) {
      if(application?.inhouse_survey_result?.length > 0){
        return application?.inhouse_survey_result[0]?.investigation_status  === "conducting";
      }else{
        return true;
      }
    }else{
      return editAbleForm;
    }
  })();
  
  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Manage",
          type: "multiple",
          children: [
            {
              icon: <NoteAddOutlinedIcon />,
              title: "New",
              onClick: handleOpenNewModal,
            },
          ],
        },
        {
          title: "Process",
          type: "multiple",
          children: [
            ...(user?.user_group !== "CMCO" &&
            user?.user_group !== "CMCE" &&
            user?.user_group !== "Agent"
              ? [
                  {
                    icon: <MarkEmailReadIcon />,
                    disabled: !editAbleForm,
                    title: "Send to Credit Manager",
                    onClick: handleSubmit(
                      onSubmit("Request for Approval", true)
                    ),
                  },
                ]
              : []),
            ...(user?.user_group === "CMCO" ||
            user?.user_group === "CMCE" ||
            user?.user_group === "Agent"
              ? [
                  {
                    icon: <CheckCircleIcon />,
                    title: "Application Ready",
                    disabled: !editAbleForm,
                    onClick: handleSubmit(
                      onSubmit(
                        user?.user_group === "CMCO" ||
                          user?.user_group === "Agent"
                          ? "Submitted"
                          : "Pending",
                        true
                      )
                    ),
                  },
                ]
              : []),
            ...(user?.user_group !== "CMCO" &&
            user?.user_group !== "CMCE" &&
            user?.user_group !== "Agent"
              ? [
                  {
                    icon: <CheckCircleIcon />,
                    title: "Application Ready",
                    disabled: !editAbleForm,
                    onClick: handleSubmit(onSubmit("Pending", true)),
                  },
                ]
              : []),
            {
              icon: <UnpublishedIcon />,
              title: "Application Not Ready",
              disabled: !editAbleForm,
              onClick: onSubmitNotReady,
            },
            ...(application?.category?.mob_status === 1 &&
            application?.status === "Pending" &&
            user?.user_group !== "CMCO" &&
            user?.user_group !== "Agent"
              ? [
                  {
                    icon: <SendIcon />,
                    title: "Send to CMCO",
                    disabled: !editAbleForm,
                    onClick: onSubmitSendToCMCO,
                  },
                ]
              : []),
            ...(user?.user_group !== "CMCO" && user?.user_group !== "Agent"
              ? [
                  {
                    icon: <CancelIcon />,
                    title: "Cancel",
                    onClick: handleOpenCancelModal,
                  },
                ]
              : []),
          ],
        },
        {
          title: "Application",
          type: "multiple",
          children: [
            {
              icon: <AttachFileIcon />,
              title: "Attachment",
              disabled: !(
                categoryId &&
                application?.sub_category_id &&
                id &&
                application?.application_id
              ),
              url: `/CreditManagement/ApplicationAttachment/${application?.uuid}/Application/${id}`,
            },
            {
              icon: <PeopleAltIcon />,
              title: "Guarantor",
              disabled: !(
                categoryId &&
                application?.sub_category_id &&
                id &&
                application?.application_id
              ),
              url: `/CreditManagement/Applications/${application?.uuid}/${application?.id}/ApplicationGuarantorList`,
            },
            ...(application?.category?.mob_status === 1
              ? [
                  {
                    icon: <FolderIcon />,
                    title: "Collaterals",
                    disabled: !(
                      categoryId &&
                      application?.sub_category_id &&
                      id &&
                      application?.application_id
                    ),
                    url: `/CreditManagement/Applications/${application?.uuid}/${application?.id}/Collaterals`,
                  },
                ]
              : []),
              {
                icon: <PeopleAltIcon />,
                title: "Joint Applicant",
                disabled: !(
                  categoryId &&
                  application?.sub_category_id &&
                  id &&
                  application?.application_id
                ),
                url: `/CreditManagement/Applications/${application?.uuid}/${application?.id}/ApplicationJointApplicantList`,
              },
              {
                icon: <RoomPreferencesIcon />,
                title: "Reference",
                disabled: !(
                  categoryId &&
                  application?.sub_category_id &&
                  id &&
                  application?.application_id
                ),
                url: `/CreditManagement/Applications/${application?.uuid}/${application?.id}/ApplicationReferenceList`,
              },
          ],
        },

        {
          title: "Survey",
          type: "multiple",
          children: [
            {
              icon: <DescriptionIcon />,
              title: "In House Survey",
              disabled: !(
                categoryId &&
                application?.sub_category_id &&
                id &&
                application?.application_id &&
                // editAbleForm
                inhouseSurveyEditable
              ),
              url: `/CreditManagement/Survey/${categoryName}/${categoryId}/inhouse_survey/${id}/${application?.uuid}`,
            },
            categoryId !== 1 && categoryId !== 2 && categoryId !== 3
              ? {
                  icon: <DescriptionIcon />,
                  title: "Field Survey",
                  disabled: !(
                    (
                      categoryId &&
                      application?.sub_category_id &&
                      id &&
                      application?.application_id &&
                      fieldSurveyEditable
                    )
                    // editAbleForm
                    // &&
                    // application?.credit_scheme?.skip_survey === 0
                  ),
                  url: `/CreditManagement/Survey/${categoryName}/${categoryId}/field_survey/${id}/${application?.uuid}`,
                }
              : {},
          ],
        },
        ...(user?.user_group !== "CMCO" &&
        user?.user_group !== "CMCE" &&
        user?.user_group !== "Agent"
          ? [
              {
                title: "Assessment",
                type: "single",
                children: [
                  {
                    icon: <AssessmentIcon fontSize="large" />,
                    disabled:
                      !(
                        categoryId &&
                        application?.sub_category_id &&
                        id &&
                        application?.application_id
                      ) || user?.user_group === IHCO,
                    title: "Assessment",
                    url: `/CreditManagement/ApplicationAssessment/ApplicationAssessmentList/${id}/${application?.uuid}`,
                  },
                ],
              },
            ]
          : []),
        ...(user?.user_group !== "CMCO" &&
        user?.user_group !== "CMCE" &&
        user?.user_group !== "Agent"
          ? [
              {
                title: "Page",
                type: "multiple",
                children: [
                  ...(user?.user_group !== "CMCO" &&
                  user?.user_group !== "Agent"
                    ? [
                        {
                          icon: <CachedIcon />,
                          title: "Refresh",
                          onClick: refreshHandleOnClick,
                        },
                      ]
                    : []),
                  // {
                  //   icon: <FilterAltOffIcon />,
                  //   title: "Clear Filter",
                  // },
                  // {
                  //   icon: <ArrowForwardIcon />,
                  //   title: "Go to",
                  // },
                  ...(user?.user_group !== "CMCO" &&
                  user?.user_group !== "CMCE" &&
                  user?.user_group !== "Agent"
                    ? [
                        {
                          icon: <SkipPreviousIcon />,
                          title: "Previous",
                          onClick: previousHandleOnClick,
                          disabled: !!!previous,
                        },
                      ]
                    : []),
                  ...(user?.user_group !== "CMCO" &&
                  user?.user_group !== "CMCE" &&
                  user?.user_group !== "Agent"
                    ? [
                        {
                          icon: <SkipNextIcon />,
                          title: "Next",
                          onClick: nextHandleOnClick,
                          disabled: !!!next,
                        },
                      ]
                    : []),
                ],
              },
            ]
          : []),
        ...(user?.user_group !== "CMCO" &&
        user?.user_group !== "CMCE" &&
        user?.user_group !== "Agent"
          ? [
              {
                title: "Information",
                type: "multiple",
                children: [
                  {
                    icon: <VisibilityIcon />,
                    title: "Criteria Information",
                    //disabled: editAbleForm,
                    onClick: handleOpenCriteriaModal,
                  },
                ],
              },
            ]
          : []),

        ...(categoryId === "3"
          ? [
              {
                title: "Action",
                type: "multiple",
                children: [
                  {
                    icon: <ListAltIcon />,
                    title: "Incomplete Fields",
                    disabled: !editAbleForm,
                    onClick: handleOpenIncompleteModal,
                  },
                  {
                    icon: <HistoryIcon />,
                    title: "Incomplete Fields History",
                    disabled: !editAbleForm,
                    onClick: handleOpenIncompleteHistoryModal,
                  },
                ],
              },
            ]
          : []),
        // categoryId === "3" && {
        //   title: "Action",
        //   type: "multiple",
        //   children: [
        //     {
        //       icon: <ListAltIcon />,
        //       title: "Incomplete Fields",
        //       disabled: !editAbleForm,
        //       onClick: handleOpenIncompleteModal,
        //     },
        //     {
        //       icon: <HistoryIcon />,
        //       title: "Incomplete Fields History",
        //       disabled: !editAbleForm,
        //       onClick: handleOpenIncompleteHistoryModal,
        //     },
        //   ],
        // },
      ],
    },
  ];

  return (
    <>
      <ToolbarApplicationNewButton
        open={openNewModal}
        handleClose={handleCloseNewModal}
      />
      <ToolbarApplicationCancelButton
        open={openCancelModal}
        handleClose={handleCloseCancelModal}
        applicationResponses={applicationResponses}
      />
      <ToolbarCriteriaModal
        open={openCriteriaModal}
        handleClose={handleCloseCriteriaModal}
      />
      {/* <div style={{overflowX: 'scroll'}} > */}
      <Toolbar data={toolbarData} />
      {/* </div> */}
      {categoryId === "3" && (
        <>
          <ToolbarIncompleteFieldsModal
            open={openIncompleteModal}
            handleClose={handleCloseIncompleteModal}
          />
          <ToolbarIncompleteFieldsHistoryModal
            open={openIncompleteHistoryModal}
            handleClose={handleCloseIncompleteHistoryModal}
          />
        </>
      )}
    </>
  );
};

export default React.memo(ToolbarApplication);
