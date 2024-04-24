import React, { useState, useEffect } from 'react'
import DrawerPop from '../common/DrawerPop'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next'
import { Button, Card, Space, Tooltip, notification } from 'antd'
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
import { updateEvaluationTemplateWithDetails, getRecruitmentEvaluationTemplateById, saveRecruitmentEvaluationTemplate, saveRecruitmentEvaluationTemplateDetailBatch } from '../Api1'
import { Formik, useFormik } from 'formik';
import { Value } from 'devextreme-react/range-selector'
import AddMore from '../common/AddMore'
import { CoPresentOutlined } from '@mui/icons-material'
import * as Yup from "yup";
import { IoCloseSharp } from 'react-icons/io5'
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from 'react-icons/hi2'
import { FaMinus, FaStar } from 'react-icons/fa'
import { TiMinus } from 'react-icons/ti'
import { RiDeleteBinLine } from 'react-icons/ri'
 
 
const TemEvaluation = ({ open = "", close = () => { }, inputshow = false, isUpdate = {}, updateId, refresh }) => {
 
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [insertedId, setinsertedId] = useState("")
  const [errorMessages, setErrorMessages] = useState("");
  // console.log(companyId)
  // console.log(insertedId)
  const [evaluationlist, setevaluationlist] = useState([])
  const [evaluationTemplateDetailsIds, setEvaluationTemplateDetailsIds] = useState([]);
  const [evaluation, setEvaluation] = useState([
    {
      id: 1,
      companyId: companyId,
      evaluationTemplateId: "",
      question: "",
      answerMetaData: '[]',
      description: "hihihihih",
      createdBy: 499
    },
  ]);
 
 
  //condition data
 
 
  // console.log(updateId)
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
    if (!updateId) {
      setEvaluation((prevEvaluation) => [
        ...prevEvaluation,
        {
          id: prevEvaluation.length + 1,
          companyId: companyId, // Replace companyId with your actual value
          evaluationTemplateId: "", // Replace insertedId with your actual value
          question: "",
          answerMetaData: '[]',
          description: "hihihihi",
          createdBy: 493
        },
       
      ]);
    } else {
      const nextId = evaluation[evaluation.length - 1].evaluationTemplateDetailsId + 1 || 1;

      setEvaluation((prevEvaluation) => [
        ...prevEvaluation,
        {
          
          companyId: companyId, // Replace companyId with your actual value
          evaluationTemplateId: "",
          evaluationTemplateDetailsId: nextId, // Set the calculated nextId
          question: "",
          answerMetaData: '[]',
          description: "hihihihi",
         
        },
      ]);
    }
  };
 
  const handleDeleteCondition = (index) => {
    setEvaluation((prevEvaluation) =>
      prevEvaluation.filter((_, i) => i !== index)
    );
  };
  const handleDeleteField = (conditionIndex, fieldIndex) => {
    // console.log("Deleting field", conditionIndex, fieldIndex);
 
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
  const handleAddField = (index, selectedvalue) => {
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
 
   const[Questionerror,setQuestionError] = useState('')
   const[answerError,setAnswerError] = useState('')
   const[OptionError,setoptionserror] = useState('')
 
 
  // const[insertedId,setinsertedId] =useState(null)
 
  const formik = useFormik({
    initialValues: {
      companyId: "",
      evaluationTemplateName: "",
      description: "",
      createdBy: null,
    },
 
    // enableReinitialize: true,
    // validateOnChange: false,
    // validationSchema: Yup.object().shape({
    //   evaluationTemplateName : Yup.string().required('Evalutaion is required'),
    //   description:Yup.string().required('Description is required'),
    // }),
 
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // console.log({
        //   companyId: companyId,
        //   evaluationTemplateName: values.evaluationTemplateName,
        //   description: values.description,
        //   createdBy: null,
        // });
 
        // Make the first API call
        if (
          !formik.values.evaluationTemplateName || !formik.values.description) {
          formik.setFieldError('evaluationTemplateName', !formik.values.evaluationTemplateName ? 'Evaluation is Required is required' : '');
          formik.setFieldError('description', !formik.values.description ? 'Description is required' : '');
        }
        let hasError = false;
        evaluation.forEach((condition) => {
          if (!condition.question) {
            setQuestionError('Question is Required.');
            hasError = true;
 
          }
       
          if (!condition.answerMetaData || !condition.answerMetaData[0]?.key) {
            setAnswerError('Please choose an answer type.');
            hasError = true;
          }
          if (
            ["Drop-down", "MultipleChoice", "Checkboxes"].includes(condition.answerMetaData[0]?.key) &&
            (condition.answerMetaData.some((field) => !field.value) ||
              (!condition.answerMetaData[0]?.value && condition.answerMetaData[0]?.key))
          ) {
            setoptionserror('Please enter values for all options.');
            hasError = true;
          } 
        });
        if (hasError) {
          return;
      }
        // Now you have updated all error states synchronously
        // Check if there are any errors
       
        if (updateId) {
          const formattedData = evaluation.map((item, index) => ({
            companyId: companyId,
            evaluationTemplateId: updateId,
            question: item.question,
            answerMetaData: item.answerMetaData,
            description: item.description,
            createdBy: item.createdBy,
            evaluationTemplateDetailsId: item.evaluationTemplateDetailsId,
 
            modifiedBy: null
          }));
         
          const response = await updateEvaluationTemplateWithDetails({
            RecruitmentEvaluationTemplate: {
              evaluationTemplateId: updateId,
              companyId: companyId,
              evaluationTemplateName: values.evaluationTemplateName,
              description: values.description,
              modifiedBy: null,
            },
            RecruitmentEvaluationTemplateDetail: formattedData
 
 
          })
          // console.log(response)
          if (response.status == 200) {
            openNotification("success", "success", response.message);
            setSuccessNotificationVisible(true);
            setTimeout(() => {
              handleClose();
              refresh()
            }, 1500);
          } else if (response.status == 500) {
            openNotification("error", "Error", response.message.replace(/<br\/>/g, '\n'));
 
          }
 
        } else {
          const response = await saveRecruitmentEvaluationTemplate({
            companyId: companyId,
            evaluationTemplateName: values.evaluationTemplateName,
            description: values.description,
            createdBy: null,
          });
 
          // console.log(response);
 
          if (response.status === 200) {
            // Update the state with the insertedId
            const insertedId = response.result.insertedId;
 
            // Process the data for the second formik here
            const formattedData = evaluation.map((item) => ({
              companyId: companyId,
              evaluationTemplateId: insertedId,
              question: item.question,
              answerMetaData: JSON.stringify(item.answerMetaData),
              description: item.description,
              createdBy: item.createdBy,
            }));
 
            // Call your API to save data using the formatted data
            const response2 = await saveRecruitmentEvaluationTemplateDetailBatch(formattedData);
 
            // Handle the response if needed
            // console.log('Response2:', response2);
            // console.log(formattedData);
            // console.log(insertedId);
 
            if (response2.status === 200) {
              openNotification("success", "success", response2.message);
              setSuccessNotificationVisible(true);
              setTimeout(() => {
                handleClose();
                refresh()
              }, 1500);
            } else if (response2.status === 500) {
              openNotification("error", "Error", response2.message);
            }
          } else if (response.status === 500) {
            openNotification("error", "Error", response.message);
          }
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        openNotification(
          "error",
          "Error ...",
          "Evaluation Template Name Already Exist"
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
      const response = await getRecruitmentEvaluationTemplateById({ id });
      // console.log("work flow by id", response);
      setevaluationlist(response.result)
      const evaluationData = response.result.flatMap(item => {
        return item.evaluationTemplateDetailData.map(detail => ({
          companyId: detail.companyId,
          question: detail.question,
          evaluationTemplateDetailsId: detail.evaluationTemplateDetailsId,
          description: detail.description,
          evaluationTemplateId: detail.evaluationTemplateId,
          isActive: detail.isActive,
          modifiedBy: null,
          modifiedOn: detail.modifiedOn,
          answerMetaData: detail.answerMetaData.map(metadata => ({ // Fix here
            key: metadata.key,
            value: metadata.value
          }))
        }));
      });
      // const ids = response.result.map(item => item.evaluationTemplateDetailData.map(detail => detail.evaluationTemplateDetailsId)).flat();
      // console.log(ids)
      // setEvaluationTemplateDetailsIds(ids);
      setEvaluation(evaluationData);
      // console.log(evaluationData)
      const firstEvaluation = response.result[0];
      formik.setFieldValue("evaluationTemplateName", firstEvaluation.evaluationTemplateName);
      formik.setFieldValue("description", firstEvaluation.description);
 
    } catch (error) {
      // console.error("Error fetching evaluation data:", error);
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
            ? t("Create Evaluation Template")
            : t("update Evaluation Template"),
          !updateId ? t("Create Evaluation Template")
            : t("update Evaluation Template"),
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
            title={"New Evaluation Template"}
            description={"New Evaluation Template"}
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
                placeholder={"Enter Template Name..."}
                value={formik.values.evaluationTemplateName}
                change={(e) => {
                  formik.setFieldValue('evaluationTemplateName', e)
                }}
                error={formik.errors.evaluationTemplateName}
                required={true}
 
              />
            </div>
            <div className='grid grid-cols-2'>
              <TextArea
                title={"Decription"}
                placeholder={"Enter Description..."}
                value={formik.values.description}
                change={(e) => {
                  formik.setFieldValue('description', e)
                }}
                error={formik.errors.description}
                required={true}
              />
            </div>
            <div className="flex flex-col gap-4 overflow-hidden">
            {evaluation.map((condition, index) => (
              <>
                <div className="flex items-center justify-between">
                  <FormInput
                    // showValueParagraph={true}
                    title={`Question ${index + 1}`}
                    placeholder={`Enter Question ${index + 1}`}
                    value={condition.question}
                    change={(e) => {
                      setEvaluation((prevEvaluation) => prevEvaluation.map((prevCondition, i) => i === index
                        ? { ...prevCondition, question: e }
                        : prevCondition
                      ))
                      // console.log(e)
                    }}
                    error={condition.question ? '' : Questionerror || ''}
                    required={true}
                  />
 
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
                                  
                                  key: e,
                                  value: e === condition.answerMetaData[0]?.key ? condition.answerMetaData[0]?.value : '',
                                }
                              ],
                            }
                            : prevCondition
                          ))
                          handleAddField(e)
                        }}
                        value={condition.answerMetaData[0]?.key }
                        icondropDown={true}
                        required={true}
                        error={condition.answerMetaData[0]?.key ? '' : answerError || ''}
                        placeholder={"Choose Options"}
                      />
                    </div>
                    {/* Additional dynamic input fields based on the selected value in the dropdown */}
                    {/* Add your logic here */}
 
                    <div>
                      <Tooltip placement="topRight" title={"Active / Inactive"} className="flex items-center gap-2">
                      <p>Mandatory</p>
                        <ToggleBtn />
                      </Tooltip>
                    </div>
 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {/* <Tooltip placement="top" title={"Copy"} >
                      <MdOutlineFileCopy style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    </Tooltip> */}
                      <Tooltip placement="top" title={"Delete"} >
                      <RiDeleteBinLine className="text-gray-500" style={{ width: '18px', height: '18px', cursor: 'pointer' }} onClick={() => handleDeleteCondition(index)} />
                      </Tooltip>
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
                            )}
                            error={field.value ? '' : OptionError || ''}
                          />
                        )}
 
                        {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(field.key) && (
                          <div className="ml-2">
                            <Tooltip placement="top" title={"Delete"}>
                              <MdDelete
                                onClick={() => handleDeleteField(index, fieldIndex)}
                                className="cursor-pointer text-red-500"
                              />
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    ))}
 
                   
                      {['Drop-down', 'MultipleChoice', 'Checkboxes'].includes(
                        condition.answerMetaData[0]?.key
                      ) && (
                          <Tooltip placement="top" title={"Add new"}>
                            <CgAdd
                              onClick={() => handleAddField(index, condition.answerMetaData[0]?.key)}
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                          </Tooltip>
                        )}
                   
                  </>
                )}
 
 
                <div className="v-divider"></div>
              </>
            ))}
 
            <div className="flex items-center gap-2">
              <AddMore name="Add New Question" className="!text-black" change={(e) => { handleAddCondition() }} />
 
            </div>
           
            </div>
            {/* <div className='border-t'></div>
            <div className='flex flex-col gap-2'>
              <div className='dark:text-white'>Overall Score</div>
              <div className='grid grid-cols-2'>
                <FormInput
                  placeholder={"Type question here..."}
                />
              </div>
 
              <div className="w-full  rounded-sm h-24 sm:w-full mt-5">
                <div className="bg-white rounded-md borderb  p-4 flex dark:bg-black dark:text-white h-24">
                  <div className="flex items-center w-1/5 sm:w-1/5">
                    <div className="ml-4">
                      <div className='flex items-center flex-col gap-1'>
                        <p className='bg-slate-400 rounded-full text-md p-1 opacity-60 font-medium'> <IoCloseSharp /></p>
                        <p className="font-bold text-gray-400 justify-center">Strong No</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-divider !border-gray-300 ml-12"></div>
                  <div className="flex items-center w-1/5 sm:w-1/5">
                    <div className="ml-8">
                      <div className='flex items-center flex-col gap-1'>
                        <p className='text-lg p-1 opacity-60 font-medium'> <HiMiniHandThumbDown className='text-gray-500' /></p>
                        <p className="font-bold text-gray-400 justify-center">No</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-divider !border-gray-300 ml-12"></div>
                  <div className="flex items-center w-1/5 sm:w-1/5">
                    <div className="ml-8">
                      <div className='flex items-center flex-col gap-1'>
                        <p className='bg-slate-400 rounded-full text-md p-1 opacity-60 font-medium'> <TiMinus /></p>
                        <p className="font-bold text-gray-400 justify-center">Not Sure</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-divider !border-gray-300 ml-12"></div>
                  <div className="flex items-center w-1/5 sm:w-1/5">
                    <div className="ml-8">
                      <div className='flex items-center flex-col gap-1'>
                        <p className='text-lg p-1 opacity-60 font-medium'> <HiMiniHandThumbUp className='text-gray-500' /></p>
                        <p className="font-bold text-gray-400 justify-center">Yes</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-divider !border-gray-300 ml-12"></div>
                  <div className="flex items-center w-1/5 sm:w-1/5">
                    <div className="ml-8">
                      <div className='flex items-center flex-col gap-1'>
                        <p className='text-lg p-1 opacity-60 font-medium'> <FaStar className='text-gray-500' /></p>
                        <p className="font-bold text-gray-400 justify-center">Strong Yes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
 
            {contextHolder}
          </Accordion>
        </div>
      </DrawerPop >
 
    </div >
  )
}
 
export default TemEvaluation