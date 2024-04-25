import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Automate from "../../assets/images/Automate.svg";
import DrawerPop from "../common/DrawerPop";
import FlexCol from "../common/FlexCol";
import Accordion from "../common/Accordion";
import FormInput from "../common/FormInput";
import { MdDelete, MdOutlineLock } from "react-icons/md";
import AddMore from "../common/AddMore";
import { SlEnergy } from "react-icons/sl";
import { AiFillThunderbolt } from "react-icons/ai";
import { Formik, useFormik } from "formik";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaCircleDot } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaRegCircleDot } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  saveRecruitmentWorkFlow,
  saveRecruitmentWorkFlowStageBatch,
  getRecruitmentWorkFlowById,
  updateWorkFlowWithStages,
} from "../Api1";
import { PiCopySimple, PiPencilSimpleLineThin } from "react-icons/pi";
import { Modal, Button, notification, Tooltip, Menu } from "antd";
import image from "../../assets/images/image 622.png";
import TextArea from "../common/TextArea";
import { RiDeleteBinLine } from "react-icons/ri";
import copy from "clipboard-copy";
import * as Yup from "yup";
import WorkflowModal from "../common/WorkflowModal";
import ModalImg from "../../assets/images/Workflowimg.png";
import Dropdown from "../common/Dropdown";

const Workflowstage = ({
  open = "",
  close = () => {},
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh,
}) => {
  const [successNotificationVisible, setSuccessNotificationVisible] =
    useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${
          type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
        }`,
        boxShadow: `${
          type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
        }`,
      },
      // duration: null,
    });
  };
  console.log(updateId);

  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const handleClose = () => {
    close(false);
    formik.resetForm();
  };
  const [editStageIndex, setEditStageIndex] = useState(null);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [presentage, setPresentage] = useState(0);
  const [stageName, setStageName] = useState("");
  const [insertedId, setInsertedId] = useState("");
  const [stageError, setStageError] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuitem, setmenuitem] = useState(false);
  const [stages, setstages] = useState([]);
  const [selectedStageName, setSelectedStageName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [showEmailDiv, setShowEmailDiv] = useState(false);
  const [selectedMenuLabel, setSelectedMenuLabel] = useState("");
  const handleEditStage = (stageIndex) => {
    // Find the index of the stage with the given stage name
    const index = stages.findIndex((stage) => stage.stageName === stageIndex);

    if (index !== -1) {
      // Check if the stage name exists in the stages array
      setSelectedStageName(stages[index].stageName);
      setEditStageIndex(index);
      setIsModalVisible(true);
    } else {
      console.error("Invalid stage name:", stageIndex);
    }
  };

  const handleCopy = (stageIndex) => {
    copy(stageIndex);
  };

  useEffect(() => {
    console.log(stages);
  }, [stages]);

  const handleAddStageClick = () => {
    if (!stageName) {
      setStageError("Stage Name is required.");
    } else {
      setStageError("");
    }

    if (!stageName.trim()) {
      // If stageName is empty or contains only whitespace, return without adding a stage
      return;
    }
    if (editStageIndex !== null) {
      // If editStageIndex is not null, it means we're editing an existing stage
      // Update the corresponding stage name in the stages array
      setstages((prevStages) =>
        prevStages.map((stage, index) =>
          index === editStageIndex ? { ...stage, stageName: stageName } : stage
        )
      );
    } else {
      // Otherwise, we're adding a new stage
      // Add the new stage to the stages array
      setstages((prevEvaluation) => [
        ...prevEvaluation,
        {
          id: stages.length + 1,
          workFlowId: insertedId,
          stageOrder: stages.length + 1,
          stageName: stageName,
          stageRules: {
            id: 1,
            key1: "",
            value: "",
          },
          createdBy: 9,
        },
      ]);
    }

    setIsModalVisible(false); // Close the modal
    setEditStageIndex(null); // Clear the editStageIndex
    setStageName("");
    setSelectedStageName("");
  };
  const handleDeleteStage = (id) => {
    setstages((prevStages) => prevStages.filter((stage) => stage.id !== id));
  };
  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  // const handleAddStageClick = () => {
  //   // Set the state to true to show the modal
  //   setIsModalVisible(true);
  //   console.log("hhhh");
  // };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const formik1 = useFormik({});

  //  const handleAddStageRule = () => {
  //   // Add your logic for handling the "Add stage rule" button click
  //   // You can use the values of stageName and other inputs here
  //   // For now, let's just update the SVG content with the stageName
  //   setSvgContent(stageName);
  //   setIsModalVisible(false);
  // };

  const [svgContent, setSvgContent] = useState("");

  const formik = useFormik({
    initialValues: {
      companyId: "",
      workFlowName: "",
      description: "",
      createdBy: "",
    },

    // enableReinitialize: true,
    // validateOnChange: false,
    // validationSchema: Yup.object().shape({
    //   workFlowName: Yup.string().required('WorkFlow Name is required '),
    //   description: Yup.string().required('Description  is required '),

    // }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!formik.values.workFlowName || !formik.values.description) {
          formik.setFieldError(
            "workFlowName",
            !formik.values.workFlowName ? "WorkFlow Name is required" : ""
          );
          formik.setFieldError(
            "description",
            !formik.values.description ? "Description  is required" : ""
          );
          return;
        }

        if (stages.length === 0) {
          setIsModalVisible(true);
          return;
        }

        if (updateId) {
          const formattedData = stages.map((item) => ({
            stageId: item.id, // Add stageId property
            stageOrder: item.stageOrder,
            stageName: item.stageName,
            stageRules: JSON.stringify(item.stageRules),
            workFlowId: updateId, // Assuming stageRules is available in item
            createdBy: 9,
          }));

          const response = await updateWorkFlowWithStages({
            RecruitmentWorkFlow: {
              workFlowId: updateId,
              companyId: companyId,
              workFlowName: values.workFlowName,
              description: values.description,
              modifiedBy: 9,
            },
            RecruitmentWorkFlowStage: [...formattedData],
          });
          console.log(response);
          if (response.status === 200) {
            openNotification("success", "Success", response.message);
            setTimeout(() => {
              handleClose();
              refresh();
            }, 1500);
          } else if (response.status === 500) {
            openNotification(
              "Error",
              "Error",
              response.message.replace(/<br\/>/g, "\n")
            );
          }
        } else {
          const response = await saveRecruitmentWorkFlow({
            companyId: companyId,
            workFlowName: values.workFlowName,
            description: values.description,
            createdBy: 9,
          });

          console.log(response);

          if (response.status === 200) {
            const insertedId = response.result.insertedId; // Get insertedId here
            const formattedData = stages.map((item) => ({
              workFlowId: insertedId,
              stageOrder: item.stageOrder,
              stageName: item.stageName,
              stageRules: JSON.stringify(item.stageRules),
              createdBy: 9,
            }));

            const response2 = await saveRecruitmentWorkFlowStageBatch(
              formattedData
            );
            console.log("Response2:", response2);
            console.log(formattedData);
            console.log(insertedId);

            if (response2.status === 200) {
              openNotification("success", "Success", response2.message);
              setTimeout(() => {
                handleClose();
                refresh();
              }, 1500);
            } else if (response2.status === 500) {
              openNotification("Error", "Error", response2.message);
            }
          } else if (response.status === 500) {
            openNotification(
              "Error",
              "Error",
              response.message.replace(/<br\/>/g, "\n")
            );
          } else if (response.status === 500) {
            openNotification("Error", "Failed", response.message);
          }
        }
      } catch (error) {
        openNotification(
          "error",
          "Error",
          "WorkFlow Template Name Already Exist"
        );
      }
      setSubmitting(false);
    },
  });
  //update

  const [workFlowsatges, setworkFlowsatges] = useState([]);
  const getworkFlow = async () => {
    const id = updateId;
    try {
      const response = await getRecruitmentWorkFlowById({ id });
      console.log(response);
      setworkFlowsatges(response.result);
      console.log({ stageName: stageName });
      if (response.result.length > 0) {
        const firstJob = response.result[0];

        // Set workflow name
        formik.setFieldValue("workFlowName", firstJob.workFlowName);
        formik.setFieldValue("description", firstJob.description);

        // Set stages
        const stagesData = firstJob.recruitmentWorkFlowStages.map((stage) => ({
          id: stage.stageId,
          workFlowId: stage.workFlowId,
          stageOrder: stage.stageOrder,
          stageName: stage.stageName,
          stageRules: stage.stageRules,
        }));
        setstages(stagesData);
        console.log(stagesData); // Check here
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getworkFlow();
    console.log(stages);
  }, []);

  //update workflow
  const options = [
    {
      key: 1,
      label: "Request Evaluation",
      value: "option1",
      icon: <MdAlignHorizontalLeft />,
    },

    {
      key: 2,
      label: "Add Note",
      value: "option3",
      icon: <CiTextAlignLeft />,
    },
    {
      key: 3,
      label: "Send Email",
      value: "option4",
      icon: <IoMdCheckboxOutline />,
    },
    {
      key: 4,
      label: "Send Questionnaire",
      value: "option5",
      icon: <FaRegCircleDot />,
    },
    {
      key: 5,
      label: "Add Tag",
      value: "option6",
      icon: <IoIosArrowDropdown />,
    },
  ];

  const emailoption = [
    { id: 1, title: "Email Template" },
    { id: 2, title: "Email Sender" },
  ];

  const handleMenuClick = (option) => {
    console.log("Selected option:", option);
    // Handle the selected option here
    setmenuitem(true)
    setMenuVisible(false); // Close the menu after selection
  };
  const handleDeleteSection = () => {
    // Logic to delete the section
    setmenuitem(false); // Set menuitem state to false to hide the section
  };
  return (
    <DrawerPop
      open={show}
      contentWrapperStyle={{
        position: "absolute",
        height: "100%",
        top: 0,
        // left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        borderRadius: 0,
        borderTopLeftRadius: "0px !important",
        borderBottomLeftRadius: 0,
      }}
      close={(e) => {
        setShow(e);
        //    setUpdateId(null);
        handleClose();
      }}
      header={[
        !updateId
          ? t("Create a Workflow Template")
          : t("Update Workflow stages"),
        !updateId
          ? t("Create a Workflow Template")
          : t("Update Workflow stages"),
      ]}
      //  headerRight={
      //    <div className="flex items-center gap-10">
      //      <p className="text-sm font-medium text-gray-400">
      //        Draft Saved 10 Seconds ago
      //      </p>
      //      <div className="flex items-center gap-2.5">
      //        <p className="text-sm font-medium text-gray-400">{t("Help")}</p>
      //        <RxQuestionMarkCircled className="text-2xl font-medium text-gray-400 " />
      //      </div>
      //    </div>
      //  }
      footerBtn={[
        t("Cancel"),
        !isUpdate ? t("Save Template") : t("Save Template"),
      ]}
      className="widthFull"
      //  buttonClickCancel={(e) => {
      //    if (activeBtn > 0) {
      //      setActiveBtn(activeBtn - 1);
      //      setNextStep(nextStep - 1);
      //      setActiveBtnValue(steps?.[activeBtn - 1].data);
      //      console.log(activeBtn - 1);
      //    }
      //    setBtnName("");
      //  }}
      //  nextStep={nextStep}
      //  activeBtn={activeBtn}
      //  saveAndContinue={true}
      //  stepsData={steps}

      handleSubmit={() => {
        formik.handleSubmit();
      }}
    >
      {/* <div class="vertical-container background" id="main">
  <div class="vertical-body">
    <div class="container">
      <h2 class="title">Comming Soon</h2>
      <p>Something will appear here</p>
    </div>
  </div>
</div> */}

      <div className="relative max-w-[1070px]  w-full mx-auto">
        <FlexCol />
        <Accordion
          title={"Workflow"}
          className="Text_area"
          padding={false}
          toggleBtn={false}
          click={() => {
            setPresentage(1.4);
          }}
          initialExpanded={true}
        >
          <div
            id={`acco-text-item`}
            role="region"
            aria-labelledby={`acco-title-item`}
            className="flex flex-col gap-6  justify-between w-full px-6 py-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                title={"Template Name"}
                placeholder={"Enter Template Name..."}
                className="!text-[#344054] "
                change={(e) => {
                  formik.setFieldValue("workFlowName", e);
                }}
                value={formik.values.workFlowName}
                error={formik.errors.workFlowName}
                required={true}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextArea
                title={"Description"}
                placeholder={"Enter Description..."}
                className="!text-[#344054]"
                change={(e) => {
                  formik.setFieldValue("description", e);
                }}
                value={formik.values.description}
                error={formik.errors.description}
                required={true}
              />
            </div>
            <div className="w-full sm:w-[545px] grid grid-cols-1 gap-4">
              {console.log(stages)}
              {stages.map((stage) => (
                <div key={stage.id} className="flex gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="545"
                    height="55"
                    viewBox="0 0 545 55"
                    fill="none"
                    className="hover:fill-violet-100 w-full h-auto"
                  >
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M0 6C0 2.68629 2.68629 0 6 0H532.47L544.753 27.0908L532.47 54.1816H5.99998C2.68627 54.1816 0 51.4953 0 48.1816V6Z"
                      fill="#FCFCFC"
                    />
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M0.5 6C0.5 2.96244 2.96243 0.5 6 0.5H532.148L544.204 27.0908L532.148 53.6816H5.99998C2.96241 53.6816 0.5 51.2192 0.5 48.1816V6Z"
                      stroke="black"
                      stroke-opacity="0.1"
                    />
                    <foreignObject x="30" y="0" width="545" height="55">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>{stage.stageName}</span>
                        <img
                          src={Automate}
                          alt=""
                          className="w-6 h-6 ml-auto pr-1"
                        />
                        <MdOutlineLock
                          className="mr-12 text-gray-400"
                          size={25}
                        />
                      </div>
                    </foreignObject>
                  </svg>

                  <div className="flex  gap-5">
                    <div className="flex items-center gap-5">
                      <div
                        className="p-2 hover:bg-slate-300 rounded-md"
                        onClick={() => handleEditStage(stage.stageName)}
                      >
                        <Tooltip placement="top" title={"Edit"}>
                          <PiPencilSimpleLineThin
                            className="text-gray-500"
                            size={16}
                          />
                        </Tooltip>
                      </div>
                      <div
                        className="p-2 hover:bg-slate-300 rounded-md"
                        onClick={() => handleCopy(stage.stageName)}
                      >
                        {/* <Tooltip placement="top" title={"Copy"} >
                          <PiCopySimple className='text-gray-500' size={16} />
                        </Tooltip> */}
                      </div>
                      <div
                        className="p-2 hover:bg-slate-300 rounded-md"
                        onClick={() => handleDeleteStage(stage.id)}
                      >
                        <Tooltip placement="top" color={"red"} title={"Delete"}>
                          <RiDeleteBinLine
                            className="cursor-pointer text-red-500"
                            size={16}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ml-5 mb-3">
            <AddMore
              name="Add Stage"
              className="text-black"
              change={openModal}
            />
          </div>
          <WorkflowModal
            // title="Vertically centered modal dialog"
            wrapClassName="vertical-center-modal"
            isOpen={isModalVisible}
            onClose={closeModal}
          >
            <div className="flex flex-col items-center justify-center w-full h-full gap-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="p-1 overflow-hidden border-2 border-white rounded-full 2xl:size-14 size-12 bg-primaryalpha/10">
                  <img
                    src={image}
                    alt="modalimg"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <h2 className="h2">Add Stages</h2>
                <p className=" w-96 para !font-normal ">
                  Set rules for Late Entry, Early Exit, Breaks & Overtime based
                  on punch-in and punch-out time.
                </p>
              </div>

              <div
                className="w-full"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleAddStageClick();
                  }
                }}
              >
                <FormInput
                  title={"Stage Name"}
                  placeholder={"Enter Stage Name"}
                  value={selectedStageName}
                  change={(e) => {
                    setStageName(e);
                    setSelectedStageName(e);
                  }}
                  error={stageError}
                  required={true}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full border border-black-500 ring-1 ring-black ring-opacity-5 shadow-lg rounded-lg p-1" style={{ display: menuitem ? "block" : "none" }}>
              <div className="w-full m-auto bg-slate-100 h-12 rounded-lg flex justify-between items-center pr-2">
              <h1 className="mt-3.5 m-3 font-semibold">Request Evaluation</h1>
              <RiDeleteBin5Line className="text-gray-500 2xl:text-base dark:text-white hover:text-red-500" onClick={handleDeleteSection} />
              </div>
              <div className="flex gap-2  w-full p-1">
              {emailoption.map((item) => (
                <div className="w-1/2">
                  <Dropdown title={item.title} />
                </div>
              ))}
              </div>
            </div>
            <div className="justify-start">
              <AddMore
                name="Add stage rule"
                className="text-black"
                change={() => setMenuVisible(true)}
              />
            </div>
          
            <Menu
              onClick={({ key }) => handleMenuClick(key)}
              style={{ display: menuVisible ? "block" : "none" }}
              className="w-48 border border-black-500 ring-1 ring-black ring-opacity-5 bg-white shadow-lg rounded-lg"
            >
              {options.map((option) => (
                <Menu.Item key={option.key}>
                  <div className="flex justify-start gap-2 items-center" >
                    <span>{option.icon}</span>
                    <span> {option.label}</span>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
            
          </WorkflowModal>
        </Accordion>
        {contextHolder}
      </div>
    </DrawerPop>
  );
};

export default Workflowstage;
