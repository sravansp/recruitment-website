import React, { useState } from "react";
import DrawerPop from "../common/DrawerPop";
import Accordion from "../common/Accordion";
import { useTranslation } from "react-i18next";
import { Button, Card, Space, notification } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "../common/TextArea";
import image from "../../assets/images/generate-ai-img.png";
import TextEditor from "../common/TextEditor/TextEditor";
import FormInput from "../common/FormInput";
import ToggleBtn from "../common/ToggleBtn";
import Dropdown from "../common/Dropdown";
import { MdDelete, MdOutlineFileCopy } from "react-icons/md";
import { Form } from "../data";
import { CgAdd } from "react-icons/cg";
import { saveRecruitmentQuestionnaireTemplateDetail } from "../Api1";
import { Formik, useFormik } from "formik";

const QuestionAire = ({
  open = "",
  close = () => {},
  inputshow = false,
  isUpdate = {},
}) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [insertedId, setinsertedId] = useState();

  const [savedContent, setSavedContent] = useState([]);
  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const handleClose = () => {
    close(false);
  };
  const [content, setContent] = useState("");
  const handleEditorChange = (content) => {
    setContent(content);
  };
  const [conditions, setConditions] = useState([
    {
      id: 1,
      companyId: companyId,
      // questionnaireTemplateId: insertedId,
      question: "",
      answerMetaData: [
        {
          id: 1,
          key: "",
          value: "",
        },
      ],
      description: "",
      createdBy: "ajay",
    },
  ]);
  console.log(conditions);

  const handleAddCondition = () => {
    setConditions((prevConditions) => [
      ...prevConditions,
      {
        id: prevConditions.length + 1,
        companyId: companyId, 
        questionnaireTemplateId: insertedId,
        question: "",
        answerMetaData: [
          {
            id: 1,
            key: "",
            value: "",
          },
        ],
        description: "",
        createdBy: "ajay",
      },
    ]);
  };
  // const handleSaveTemplate = async () => {
  //   try {

  //     const response = await saveRecruitmentQuestionnaireTemplateDetail(conditions);

  //     console.log(response);
  //   } catch (error) {
  //     console.error(error); // Handle errors
  //   }
  // };
  const formik = useFormik({
    initialValues: {
      companyId: "",
      questionnaireTemplateName: "", 
      question: "",
      createdBy: "",
    },

    onSubmit: async (e) => {
      try {
        console.log({
          companyId: companyId,
          question: e.question,
          createdBy: null,
        });
        const response = await saveRecruitmentQuestionnaireTemplateDetail({
          companyId: companyId,
          questionnaireTemplateName: e.questionnaireTemplateName,
          question: e.question,
          createdBy: null,
        });
        console.log(response);
        const { insertedId } = response.data; 

        console.log("Inserted ID:", insertedId);
  
        
        setinsertedId(insertedId);
  

        if (response.status === 200) {
          //  openNotification(
          //    "success",
          //    "Successful",
          //    "createpoilicy update saved. Changes are now reflected."
          //  );
          // setinsertedId(response.result.insertedId);
          // if (response.result.insertedId) formik1.handleSubmit();
        }
      } catch (error) {
        // Handle the error here
        console.error("Error during form submission:", error);
        //  openNotification(
        //    "error",
        //    "Error saving category",
        //    "There was an error while saving the category. Please try again."
        //  );
      }
    },
  });
  const formik1 = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        // Call your API to save data using values.conditions
        const response = await saveRecruitmentQuestionnaireTemplateDetail();

        // Handle the response if needed
        console.log("Response:", response);

        if (response.status === 200) {
          // const { insertedId } = response.result;
          // setinsertedId(insertedId);
          // openNotification(
          //   "success",
          //   "Successful",
          //   "createpolicy update saved. Changes are now reflected."
          // );
        }
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
      }
    },
  });

  console.log(insertedId);

  const handleSubmit = async () => {
    formik.handleSubmit();
  };
  const handleaddCondition = () => {
    const newCondition = {
      id: conditions.length + 1,
      inputValue: "",
      selectedValue: "",
    };
    formik.setFieldValue(`customFields[${conditions.length}].question`, "");
    formik.setFieldValue(`customFields[${conditions.length}].answer_type`, "");
    formik.setFieldValue(
      `customFields[${conditions.length}].answer_meta_data`,
      ""
    );
    setConditions([...conditions, newCondition]);
  };

  const handleDeleteCondition = (conditionId) => {
    if (conditions.length > 1) {
      const updatedConditions = conditions.filter(
        (condition) => condition.id !== conditionId
      );
      setConditions(updatedConditions);
    }
  };
  const generateInputField = (e, condition, index) => {
    console.log("value", e);

    console.log("Saved content:", savedContent);
    switch (e) {
      case "Paragraph":
        return (
          <TextArea
          value={formik.values.customFields[index].answer_meta_data}
          change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
          />
        );
      case "ShortAnswer":
        return (
          <FormInput
          value={formik.values.customFields[index].answer_meta_data}
          change={(e) => formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
          />
        );
      case "Drop-down":
        return (
          <FormInput
          value={Formik.values.customFields[index].answer_meta_data}
          change={(e) => Formik.setFieldValue(`customFields[${index}].answer_meta_data`, e)}
          />
        );
      default:
      return <FormInput value={formik.values.Default} change={(newValue) => handleEditorChange(newValue, index)} />;
    }
  };

  const handleDropdownChange = (e, conditionIndex) => {
    const updatedConditions = [...conditions];
    updatedConditions[conditionIndex].e = e;
    setConditions(updatedConditions);
  };
  return (
    <div>
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
          !isUpdate
            ? t("Create Questionnaire Template")
            : t("Create Questionnaire Template"),
          t("Lorem ipsum dummy text doret solo."),
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
        handleSubmit={handleSubmit}

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
      >
        {" "}
        <div className="relative max-w-[1070px]  w-full mx-auto">
          <Accordion
            title={"New Questionnaire Templates"}
            className="Text_area"
            padding={true}
            toggleBtn={false}
            click={() => {
              //    setPresentage(1.4);
            }}
            initialExpanded={true}
          >
            <div className="grid grid-cols-2">
              <FormInput
                title={"Template Name"}
                placeholder={"Type here..."}
                value={formik.values.questionnaireTemplateName}
                change={(e) => {
                  formik.setFieldValue("questionnaireTemplateName", e);
                }}
                // onChange={(e) => generateInputField(e, index)}
              />
            </div>

            {conditions.map((condition, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-16  justify-between"
              >
                <FormInput
                  placeholder={"Type question here"}
                  value={condition.question}
                  change={(e) => {
                    setConditions((prevEvaluation) =>
                      prevEvaluation.map((prevCondition, i) =>
                        i === index
                          ? { ...prevCondition, question: e }
                          : prevCondition
                      )
                    );
                    console.log(e);
                  }}
                />

                <Dropdown
                  options={Form}
                  change={(e) => {
                    setConditions((prevQuestion) =>
                      prevQuestion.map((prevCondition, i) =>
                        i === index
                          ? {
                              ...prevCondition,
                              answerMetaData: [
                                {
                                  id: 1,
                                  key: e,
                                  value: "",
                                },
                              ],
                            }
                          : prevCondition
                      )
                    );
                  }}
                  value={condition.answerMetaData[0]?.key}
                  icondropDown={true}
                />

                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <p>Mandatory</p>
                  <ToggleBtn />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <MdOutlineFileCopy
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <MdDelete
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    onClick={() => handleDeleteCondition(condition.id)}
                  />
                </div>
                {generateInputField(
                  condition.e,
                  condition,
                  index,
                  "Drop-down",
                  null,
                  condition.inputValue
                )}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <CgAdd
                style={{ width: "34px", height: "34px", cursor: "pointer" }}
                onClick={handleAddCondition}
              />
              <p style={{ cursor: "pointer" }}> Add Custom Field</p>
            </div>
          </Accordion>
        </div>
      </DrawerPop>
    </div>
  );
};

export default QuestionAire;
