import React, { useState, useEffect } from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space, notification } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from '../common/TextArea'
import image from '../../assets/images/generate-ai-img.png'
import TextEditor from '../common/TextEditor/TextEditor'
import FormInput from '../common/FormInput'
import ToggleBtn from '../common/ToggleBtn'
import Dropdown from '../common/Dropdown'
import { MdDelete, MdOutlineFileCopy } from 'react-icons/md'
import { Form } from '../data'
import { CgAdd } from 'react-icons/cg'
import { getRecruitmentQuestionnaireTemplateById, updateQuestionnaireTemplateWithDetails, saveRecruitmentQuestionnaireTemplate, saveRecruitmentQuestionnaireTemplateDetailBatch } from '../Api1'
import { Formik, useFormik } from 'formik'
import AddMore from '../common/AddMore'


const 
QuestionAire = ({
  open = "",
  close = () => { },
  inputshow = false,
  isUpdate = {},
  updateId,
  refresh
}) => {
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [insertedId, setinsertedId] = useState("")
  console.log(companyId)
  console.log(insertedId)
  const [evaluationlist, setevaluationlist] = useState([])
  const [evaluationTemplateDetailsIds, setEvaluationTemplateDetailsIds] = useState([]);
  const [evaluation, setEvaluation] = useState([
    {
      id: 1,
      companyId: companyId,
      questionnaireTemplateId: "",
      question: "",
      answerMetaData: '[]',
      description: "hihihihih",
      createdBy: 499
    },
  ]);


  //condition data


  console.log(updateId)
  // const parsedAnswerMetaData = JSON.parse(evaluation[0].answerMetaData);
  // parsedAnswerMetaData[0].key = "updatedKey";
  // parsedAnswerMetaData[0].value = "updatedValue";
  // useEffect(() => {
  //   // Update evaluation with the new insertedId
  //   setEvaluation((prevEvaluation) => {
  //     return prevEvaluation.map((item) => ({
  //       ...item,
  //       evaluationTemplateId: insertedId,

  //     }));
  //   });
  // }, [insertedId]);
  const handleAddCondition = () => {
    setEvaluation((prevEvaluation) => [
      ...prevEvaluation,
      {
        id: prevEvaluation.length + 1,
        companyId: companyId, // Replace companyId with your actual value
        questionnaireTemplateId: "", // Replace insertedId with your actual value
        question: "",
        answerMetaData: '[]',
        description: "hihihihi",
        createdBy: 493
      },
    ]);
  };

  const handleDeleteCondition = (index) => {
    setEvaluation((prevEvaluation) =>
      prevEvaluation.filter((_, i) => i !== index)
    );
  };
  const handleDeleteField = (conditionIndex, fieldIndex) => {
    console.log("Deleting field", conditionIndex, fieldIndex);

    setEvaluation((prevEvaluation) =>
      prevEvaluation.map((prevCondition, i) =>
        i === conditionIndex
          ? {
            ...prevCondition,
            answerMetaData: (prevCondition.answerMetaData || []).filter(
              (field, j) => j !== fieldIndex
            ),
          }
          : prevCondition
      )
    );
  };
  const handleAddField = (index,selectedvalue) => {
    setEvaluation((prevEvaluation) =>
      prevEvaluation.map((prevCondition, i) =>
        i === index
          ? {
            ...prevCondition,
            answerMetaData: [
              ...prevCondition.answerMetaData,
              {
                id: prevCondition.answerMetaData.length + 1,
                key: selectedvalue, // You can set the default key or customize as needed
                value: '',
              },
            ],
          }
          : prevCondition
      )
    );
  };
  //<--------------------------------------------------->//
  const [successNotificationVisible, setSuccessNotificationVisible] = useState(false);
  const [show, setShow] = useState(open);
  const { t } = useTranslation();
  const handleClose = () => {

    close(false)


  };
  const [content, setContent] = useState("")
  const handleEditorChange = (content) => {
    setContent(content);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
      // stack: 2,
      style: {
        background: `${type === "success"
            ? `linear-gradient(180deg, rgba(204, 255, 233, 0.8) 0%, rgba(235, 252, 248, 0.8) 51.08%, rgba(246, 251, 253, 0.8) 100%)`
            : "linear-gradient(180deg, rgba(255, 236, 236, 0.80) 0%, rgba(253, 246, 248, 0.80) 51.13%, rgba(251, 251, 254, 0.80) 100%)"
          }`,
        boxShadow: `${type === "success"
            ? "0px 4.868px 11.358px rgba(62, 255, 93, 0.2)"
            : "0px 22px 60px rgba(134, 92, 144, 0.20)"
          }`,
      },
      // duration: null,
    });
  };





  // const[insertedId,setinsertedId] =useState(null)

  const formik = useFormik({
    initialValues: {
      companyId: "",
      evaluationTemplateName: "",
      description: "",
      createdBy: null,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log({
          companyId: companyId,
          questionnaireTemplateName: values.questionnaireTemplateName,
          description: values.description,
          createdBy: null,
        });

        // Make the first API call
        if (updateId) {
          const formattedData = evaluation.map((item, index) => ({
            companyId: companyId,
            questionnaireTemplateId: updateId,
            question: item.question,
            answerMetaData: item.answerMetaData,
            description: item.description,
            createdBy: item.createdBy,
            questionnaireTemplateDetailsId: evaluationTemplateDetailsIds[index],

            modifiedBy: null
          }));
          const response = await updateQuestionnaireTemplateWithDetails({
            RecruitmentQuestionnaireTemplate: {
              questionnaireTemplateId: updateId,
              companyId: companyId,
              questionnaireTemplateName: values.questionnaireTemplateName,
              description: values.description,
              modifiedBy: null,
            },
            RecruitmentQuestionnaireTemplateDetail: formattedData


          })
          console.log(response)
          if (response.status == 200) {
            openNotification("success", "Successful", response.message);
            setSuccessNotificationVisible(true);
            setTimeout(() => {
              handleClose();
              refresh()
            }, 1500);
          } else if (response.status == 500) {
            openNotification("error", "Error", response.message);

          }

        } else {
          const response = await saveRecruitmentQuestionnaireTemplate({
            companyId: companyId,
            questionnaireTemplateName: values.questionnaireTemplateName,
            description: values.description,
            createdBy: null,
          });

          console.log(response);

          if (response.status === 200) {
            // Update the state with the insertedId
            const insertedId = response.result.insertedId;

            // Process the data for the second formik here
            const formattedData = evaluation.map((item) => ({
              companyId: companyId,
              questionnaireTemplateId: insertedId,
              question: item.question,
              answerMetaData: JSON.stringify(item.answerMetaData),
              description: item.description,
              createdBy: item.createdBy,
            }));

            // Call your API to save data using the formatted data
            const response2 = await saveRecruitmentQuestionnaireTemplateDetailBatch(formattedData);

            // Handle the response if needed
            console.log('Response2:', response2);
            console.log(formattedData);
            console.log(insertedId);

            if (response2.status === 200) {
              openNotification("success", "Successful", response2.message);
              setSuccessNotificationVisible(true);
              setTimeout(() => {
                handleClose();
                refresh()

              }, 1500);
            } else if (response2.status === 500) {
              openNotification("error", "error", response2.message);
            }
          } else if (response.status === 500) {
            openNotification("error", "Error", response.message);
          }
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        openNotification(
          "error",
          "Error saving category",
          "There was an error while saving the category. Please try again."
        );
      }
      setSubmitting(false);
    },
  });





  const handleSubmit = async (e) => {
    formik.handleSubmit()


  }
  const getevaluationtem = async () => {
    const id = updateId;
    try {
      const response = await getRecruitmentQuestionnaireTemplateById({ id });
      console.log(response);
      setevaluationlist(response.result)
      const evaluationData = response.result.flatMap(item => {
        return item.questionaireTemplateDetailData.map(detail => ({
          companyId: detail.companyId,
          question: detail.question,
          evaluationTemplateDetailsId: detail.questionnaireTemplateDetailsId,
          description: detail.description,
          evaluationTemplateId: detail.questionnaireTemplateId,
          isActive: detail.isActive,
          modifiedBy: null,
          modifiedOn: detail.modifiedOn,
          answerMetaData: detail.answerMetaData.map(metadata => ({ // Fix here
            key: metadata.key,
            value: metadata.value
          }))
        }));
      });
      const ids = response.result.map(item => item.questionaireTemplateDetailData.map(detail => detail.questionnaireTemplateDetailsId)).flat();
      setEvaluationTemplateDetailsIds(ids);
      setEvaluation(evaluationData);
      console.log(evaluationData)
      const firstEvaluation = response.result[0];
      formik.setFieldValue("questionnaireTemplateName", firstEvaluation.questionnaireTemplateName);
      formik.setFieldValue("description", firstEvaluation.description);

    } catch (error) {
      console.error("Error fetching evaluation data:", error);
    }
  };
  useEffect(() => {
    getevaluationtem()

  }, [])
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
          !updateId
            ? t("Create Questionnaire  Template")
            : t("update Questionnaire  Template"),
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
        handleSubmit={(e) => handleSubmit(e)}
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


      > <div className="relative max-w-[1070px]  w-full mx-auto">
          <Accordion
            title={"New Questionnaire  Templates"}
            className="Text_area"
            padding={true}

            click={() => {
              //    setPresentage(1.4);
            }}
            initialExpanded={true}
          >
            <div className='grid grid-cols-2'>
              <FormInput
                title={"Template Name"}
                placeholder={"Type here..."}
                value={formik.values.questionnaireTemplateName}
                change={(e) => {
                  formik.setFieldValue('questionnaireTemplateName', e)
                }}

              />
            </div>
            <div className='grid grid-cols-2'>
              <TextArea
                title={"Decription"}
                placeholder={"Type here..."}
                value={formik.values.description}
                change={(e) => {
                  formik.setFieldValue('description', e)
                }}

              />
            </div>

            {evaluation.map((condition, index) => (
              <><div className="flex items-center justify-between">
                <FormInput
                  // showValueParagraph={true}
                  title={`Question ${index + 1}`}
                  placeholder={'Type question here'}
                  value={condition.question}
                  change={(e) => {
                    setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                      ? { ...prevCondition, question: e }
                      : prevCondition
                    ))
                    console.log(e)
                  }} />

                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0"> {/* Add this container for the dropdown and icons */}
                    <Dropdown
                      options={Form}
                      dropdownWidth='200px'
                      change={(e) => {
                        setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                          ? {
                            ...prevCondition,
                            answerMetaData: [
                              {
                                id: 1,
                                key: e,
                                value: e === condition.answerMetaData[0]?.key ? condition.answerMetaData[0]?.value : '',
                              }
                            ],
                          }
                          : prevCondition
                        ))
                        handleAddField(e)
                      }}
                      value={condition.answerMetaData[0]?.key || "MultipleChoice"}
                      icondropDown={true}
                    />
                  </div>
                  {/* Additional dynamic input fields based on the selected value in the dropdown */}
                  {/* Add your logic here */}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <p>Mandatory</p>
                    <ToggleBtn />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <MdOutlineFileCopy style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    <MdDelete style={{ width: '18px', height: '18px', cursor: 'pointer' }} onClick={() => handleDeleteCondition(index)} />
                  </div>

                </div>
              </div>
                {condition.answerMetaData[0]?.key && (
                  <>
                    {/* Render existing FormInput components */}
                    {condition.answerMetaData.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="flex items-center">
                        {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(field.key) && (
                          <FormInput
                          title={`Options ${fieldIndex + 1}`}
                            placeholder={'Enter value'}
                            value={field.value}
                            change={(e) => setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                              ? {
                                ...prevCondition,
                                answerMetaData: prevCondition.answerMetaData.map(
                                  (f, j) => j === fieldIndex
                                    ? { ...f, value: String(e) }
                                    : f
                                ),
                              }
                              : prevCondition
                            )
                            )} />
                        )}

                        {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(field.key) && (
                          <div className="ml-2">
                            <MdDelete
                              onClick={() => handleDeleteField(index, fieldIndex)}
                              className="cursor-pointer text-red-500" />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="mt-2">
                      {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(
                        condition.answerMetaData[0]?.key
                      ) && (
                          <CgAdd
                            onClick={() => handleAddField(index, condition.answerMetaData[0]?.key)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                        )}
                    </div>
                  </>
                )}


                <div className="v-divider"></div></>
            ))}

            <div className="flex items-center gap-2">
              <AddMore name="Add New Question" className="!text-black" change={(e) => { handleAddCondition() }} />

            </div>
            {contextHolder}
          </Accordion>
        </div>
      </DrawerPop>

    </div>
  );
};

export default QuestionAire;
