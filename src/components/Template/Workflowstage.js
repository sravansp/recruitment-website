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
  getAllRecruitmentEmailTemplates,
  getAllRecruitmentEvaluationTemplates,
  getAllRecruitmentQuestionnaireTemplates,
  getAllRecruitmentWorkFlows
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
import arrow from "../../assets/images/arrow3d 1.png";
import Emailtemplate from "./AddEmailtemplate";
import { title } from "process";
import MenuItems from "../DropDown";

const Workflowstage = ({
  open = "",
  close = () => { },
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
  const [optionData, setOptionData] = useState([]);
  const [evaluationValue,setEvaluationValue] = useState("")
  const [questionnaire,setQuestionnaire] = useState("")
  const [Addnote,setAddnote] = useState("")
  const [Email,setEmail] = useState("")
  const [AddTag,setAddtag] = useState("")
  const[evaluation,setEvaluation] = useState([])
  const[questionareTemp,setQuestionareTemp] = useState([])
  const [emailTemp,setEmailTemp] = useState([])
  const [showDiv, setShowDiv] = useState(false);
  const primaryColor = localStorage.getItem('mainColor')

  
 


  const getEmailLsit = async () => {
    try {
      const response = await getAllRecruitmentEmailTemplates({});
  
      // Extract emailSubject array from the response and set it to state
      const newEmailSubject = response.result.map(email => ({
        label: email.emailTemplateName,
        value: email.emailTemplateId,
      }));
  
      setEmailTemp(newEmailSubject) 
      setoptions(prevOptions => {
        // Map over the prevOptions and update the option where key matches "request"
        return prevOptions.map(option => {
          if (option.key === 3) { // Assuming "request" corresponds to key 1
            return {
              ...option,
              det: option.det.map(detItem => {
                return {
                  ...detItem,
                  option1: detItem.option1.map(option1Item => {
                    if (option1Item.title === "Choose Email Template") {
                      return {
                        ...option1Item,
                        options: newEmailSubject,
                      };
                    }
                    return option1Item;
                  }),
                };
              }),
            };
          }
          return option;
        });
      });

  
      console.log(newEmailSubject);
    } catch (error) {
      console.error(error); // Handle errors
    }
  };
  useEffect(()=>{
    getEmailLsit()
  
  },[])

  const handleMenuClick = (option, value) => {
    let demo = options.filter(data => data.key == option);

   
    let detObject = demo.length > 0 ? demo[0].det : {};
  
    // Add the selected detObject to the existing optionData array as an object
    setOptionData(prevOptionData => [...prevOptionData, ...detObject]);
    
    setmenuitem(true);
    setMenuVisible(false)
    setShowDiv(true);
  };  
  console.log(optionData, "0000");
 
  const getEvaluationtem = async () => {
    try {
      const response = await getAllRecruitmentEvaluationTemplates({});
      console.log(response);
      const newEvaluation =
        response.result.map((each) => ({
          label: each.evaluationTemplateName,
          value: each.evaluationTemplateId,
        }))
        setEvaluation(newEvaluation)
      
      setoptions(prevOptions => {
        // Map over the prevOptions and update the option where key matches "request"
        return prevOptions.map(option => {
          if (option.key === 1) { // Assuming "request" corresponds to key 1
            return {
              ...option,
              det: option.det.map(detItem => {
                return {
                  ...detItem,
                  option1: detItem.option1.map(option1Item => {
                    if (option1Item.title === "Choose Evaluation") {
                      return {
                        ...option1Item,
                        options: newEvaluation,
                      };
                    }
                    return option1Item;
                  }),
                };
              }),
            };
          }
          return option;
        });
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getEvaluationtem()
  },[])
  const getQuestionare = async () => {
    try {
      const response = await getAllRecruitmentQuestionnaireTemplates({});
      console.log(response);
       const questiontionnare= 
        response.result.map((each) => ({
          label: each.questionnaireTemplateName,
          value: each.questionnaireTemplateId,
        }))

        setQuestionareTemp(questiontionnare)
        setoptions(prevOptions => {
          // Map over the prevOptions and update the option where key matches "request"
          return prevOptions.map(option => {
            if (option.key === 4) { // Assuming "request" corresponds to key 1
              return {
                ...option,
                det: option.det.map(detItem => {
                  return {
                    ...detItem,
                    option1: detItem.option1.map(option1Item => {
                      if (option1Item.title === "Choose Questionnaire") {
                        return {
                          ...option1Item,
                          options: questiontionnare,
                        };
                      }
                      return option1Item;
                    }),
                  };
                }),
              };
            }
            return option;
          });
        });
  
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestionare();
   
  }, []);
   
  const handleEditStage = (stageIndex) => {
    // Find the index of the stage with the given stage name
   
    const index = stages.findIndex((stage) => stage.stageName === stageIndex);
    
    if (index !== -1) {
        // Set the selected stage name and edit stage index
        setStageName(stages[index].stageName);

        setEditStageIndex(index);
       

        // Parse the stage rules string into a JavaScript object
        const stageRules = stages[index].stageRules;

        // Construct the optionData array based on the stage rules
        const optionData = [];

        if (stageRules.evaluation) {
            
        
          optionData.push({
                id: "request_evaluation",
                name: "Request Evaluation",
                option1: [
                    {// Evaluation options here...
                        id:1,
                        title:"Choose Evaluation",
                        options: evaluation
                    }
                ]
            });
        }

        if (stageRules.questionnaire) {
            optionData.push({
                id: "send_questionnaire",
                name: "Send Questionnaire ",
                option1: [
                    // Questionnaire options here...
                    {id:1, 
                    title:"Choose Questionnaire", 
                    options:questionareTemp
                  }
                ]
            });
        }

        if (stageRules.note) {
            optionData.push({
                id: "Add note",
                name: "Add note ",
                option1: [
                    // Questionnaire options here...
                    {id:1, title:"Add note"}
                ]
            });
        }

        if (stageRules.tag) {
            optionData.push({
                id: "add_tag",
                name: "Add Tag",
                option1: [
                    // Questionnaire options here...
                    {id:1, titletag:"Add New Tag"}
                ]
            });
        }

        if (stageRules.emailTemplate) {
            optionData.push({
                id: "send_email",
                name: "Send Email",
                option1: [
                    // Questionnaire options here...
                    {
                    id:1, 
                    title:"Choose Email Template", 
                    options:emailTemp
                  }
                ]
            });
        }

        // Update the optionData state
        setOptionData(optionData);

        // Set the values of input fields based on the stage rules of the selected stage
        if (stageRules) {
            if (stageRules.evaluation) {
                console.log(stageRules.evaluation,"haaa")
                setEvaluationValue(stageRules.evaluation);
            }

            if (stageRules.questionnaire) {
                setQuestionnaire(stageRules.questionnaire);
            }

            if (stageRules.emailTemplate) {
                setEmail(stageRules.emailTemplate);
            }

            if (stageRules.note) {
                setAddnote(stageRules.note);
            }

            if (stageRules.tag) {
                setAddtag(stageRules.tag);
            }
        }

        // Show the modal
        setIsModalVisible(true);
        
    } else {
        console.error("Invalid stage name:", stageIndex);
    }
};

  // const handleModalClose = () => {
  //   // Set the state to false to hide the modal
  //   setIsModalVisible(false);
  //   //set the state empty
  //   setStageName("");
  //   setSelectedStageName("");
  // };
  // const handleCopy = (stageIndex) => {
  //   copy(stageIndex);
  // };

  useEffect(() => {
    console.log(stages);
  }, [stages]);

  const handleAddStageClick = () => {
  
    
    
    
    if (!stageName) {
      setStageError('Stage Name is required.');
      return;
    } else if (stageName.length < 3) {
      setStageError('Stage Name must be at least 3 characters long.');
      return;
    } else if (!stageName.trim()) {
      setStageError('Stage Name must not be empty or contain only whitespace.');
      return;
    } else {
      setStageError('');
    }

    // Create an object to hold the stage rules based on user inputs
    const stageRules = {};
    
    // Set the stage rules based on dropdown selections and input field values
    if (evaluationValue) {
        stageRules["evaluation"] = evaluationValue;
    }

    if (questionnaire) {
        stageRules["questionnaire"] = questionnaire;
    }

    if (Email) {
        stageRules["emailTemplate"] = Email;
    }

    if (Addnote) {
        stageRules["note"] = Addnote;
    }

    if (AddTag) {
        stageRules["tag"] = AddTag;
    }

    let newStageOrder = stages.length + 1;

    if (editStageIndex !== null) {
        // If editStageIndex is not null, it means we're editing an existing stage
        // Update the corresponding stage name and stage rules in the stages array
        setstages(prevStages =>
            prevStages.map((stage, index) =>
                index === editStageIndex ? { ...stage, stageName, stageRules, optionData: [...optionData] } : stage
            )
        );
    } else if (!updateId) {
        // Otherwise, we're adding a new stage
        // Add the new stage with stage name and stage rules to the stages array
        setstages(prevStages => [
            ...prevStages,
            {
                id: stages.length + 1,
                workFlowId: insertedId,
                stageOrder: newStageOrder,
                stageName,
                stageRules,
                createdBy: 9,
                optionData: [...optionData] // Create a new array for optionData
            },
        ]);
    } else {
        setstages(prevStages => [
            ...prevStages,
            {
                id: null,
                workFlowId: insertedId,
                stageOrder: newStageOrder,
                stageName,
                stageRules,
                createdBy: 9,
                optionData: [...optionData] // Create a new array for optionData
            },
        ]);
    }

     // Close the modal
     closeModal()
    // setEditStageIndex(null); // Clear the editStageIndex
    // setStageName("");
    // setSelectedStageName("");
    // setEvaluationValue(""); // Clear dropdown selection
    // setQuestionnaire(""); // Clear dropdown selection
    // setEmail(""); // Clear dropdown selection
    // setAddnote(""); // Clear input field value
    // setAddtag("");
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
    setEditStageIndex(null); // Clear the editStageIndex
    setStageName("");
    setSelectedStageName("");
    setEvaluationValue(""); // Clear dropdown selection
    setQuestionnaire(""); // Clear dropdown selection
    setEmail(""); // Clear dropdown selection
    setAddnote(""); // Clear input field value
    setAddtag("");
    setOptionData([])

   

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
        const alphanumericRegex = /^[a-zA-Z0-9 ]+$/; // Regex to allow only letters, numbers, and spaces

        if (!values.workFlowName) {
          formik.setFieldError('workFlowName', 'Workflow Name is required');
          return;
        } else if (!alphanumericRegex.test(values.workFlowName)) {
          formik.setFieldError('workFlowName', 'Please enter only letters and numbers');
          return;
        } else if (values.workFlowName.length < 3) {
          formik.setFieldError('workFlowName', 'Workflow Name must be at least 3 characters long');
          return;
        } else {
          // Clear any existing errors if validation passes
          formik.setFieldError('workFlowName', '');
        }
        
        if (!values.description) {
          formik.setFieldError('description', 'Description is required');
        }
         
        if(stageName.length<3)


        if (stages.length === 0) {
          setIsModalVisible(true);
          return;
        }

        if (updateId) {
          const formattedData = stages.map((item) => ({
            stageId: item.id, // Add stageId property
            stageOrder: item.stageOrder,
            stageName: item.stageName,
            stageRules: item.stageRules,
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
            openNotification("success", "Successful", response.message);
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
          if (response.status === 500) {
            openNotification("error", "Info", response.message);
          }
          

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
              openNotification("success", "Successful", response2.message);
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
        // openNotification(
        //   "error",
        //   "Info",
        //   response
        // );
        console.log(error)
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
        console.log(stagesData)
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

  const [options, setoptions] = useState([
    {
      key: 1,
      label: "Request Evaluation",
      value: "request",
      icon: <MdAlignHorizontalLeft />,
      det: [{
        id: "request_evaluation",
        name: "Request Evaluation",
        
        option1: [
          { id: 1, 
            title: "Choose Evaluation", 
            

            
          },
          
          // { id: 2, title: "Email Sender" },
        ],
       
      },]
    },

    {
      key: 2,
      label: "Add Note",
      value: "note",
      icon: <CiTextAlignLeft />,
      det: [{
        id: "Add note",
        name: "Add note ",
        option1: [
          { id: 1, title: "Add note" },
          // { id: 2, title: "Email Sender" },
        ],
      },]
    },
    {
      key: 3,
      label: "Send Email",
      value: "email",
      icon: <IoMdCheckboxOutline />,
      det: [{
        id: "send_email",
        name: "Send Email ",
        option1: [
          { id: 1, title: "Choose Email Template" },
          // { id: 2, title: "Email Sender" },
        ],
      },]
    },
    {
      key: 4,
      label: "Send Questionnaire",
      value: "questionnaire",
      icon: <FaRegCircleDot />,
      det: [{
        id: "send_questionnaire",
        name: "Send Questionnaire ",
        option1: [
          { id: 1, title: "Choose Questionnaire" },
          // { id: 2, title: "Email Sender" },
        ],
      },]
    },
    {
      key: 5,
      label: "Add Tag",
      value: "tag",
      icon: <IoIosArrowDropdown />,
      det: [{
        id: "add_tag",
        name: "Add Tag",
        option1: [
          { id: 1, titletag: "Add New Tag" }
        ],
      },]
    },
  ]);
  // const [emailOptions, setEmailOptions] = useState({
  //   request: [
  //     {
  //       id: "send_email", name: "Send Email",
  //       option1: [{ id: 1, title: "Email Template" },
  //       { id: 2, title: "Email Sender" },]
  //     }
  //   ]
  // }, {
  //   note: [{
  //     id: "send_questionnaire", name: "Send Questionnaire ",
  //     option1: [{ id: 1, title: "Email Template" },
  //     { id: 2, title: "Email Sender" },]
  //   },
  //   ]
  // }, {
  //   email: [{
  //     id: "add_tag", name: "Add Tag",
  //     option1: [{ id: 1, titletag: "Add New Tag" },
  //     ]
  //   }]
  // });

 
  const [sections, setSections] = useState([]);

  const getWorkflowwithName=async(values)=>{
    try{
      const response = await getAllRecruitmentWorkFlows({
        companyId:companyId,
        workFlowName:values.workFlowName
      })
    }catch(error){
      console.log(error)
    }
  }
  // useEffect(()=>{
  //   getWorkflowwithName(values)
  // },[values.workFlowName])
   

  const handleDeleteSection = (id) => {
    const updatedOptions = optionData.filter(option => option.id !== id);
    setOptionData(updatedOptions);
    console.log(`Option with id '${id}' deleted successfully.`);
  };
 
  console.log(stages,"stages")
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
          ? t("Create Workflow Template")
          : t("Update Workflow Template"),
        !updateId
          ? t("Create Workflow Template")
          : t("Update Workflow Template"),
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
        t("Save"),
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
                placeholder={"Enter Template Name"}
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
                        {/* <img src={Automate} alt='' className='w-6 h-6 ml-auto pr-1' />
                        <MdOutlineLock className='mr-12 text-gray-400' size={25} /> */}
                      </div>
                    </foreignObject>
                  </svg>

                  <div className='flex  gap-5'>
                    <div className='flex items-center gap-5'>
                      <Tooltip placement="top" title={"Edit"} >
                        <div className='p-2 hover:bg-slate-300 rounded-md' onClick={() => handleEditStage(stage.stageName)}>
                          <PiPencilSimpleLineThin className='text-gray-500' size={16} />
                        </div>
                      </Tooltip>

                      {/* <div className='p-2 hover:bg-slate-300 rounded-md' onClick={() => handleCopy(stage.stageName)} >
                        <Tooltip placement="top" title={"Copy"} >
                          <PiCopySimple className='text-gray-500' size={16} />
                        </Tooltip>
                      </div> */}

                      <Tooltip placement="top" color={"red"} title={"Delete"} >
                        <div className='p-2 hover:bg-slate-300 rounded-md' onClick={() => handleDeleteStage(stage.id)}>
                          <RiDeleteBinLine className="cursor-pointer text-red-500" size={16} />
                        </div>
                      </Tooltip>

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
            className="w-96"
            wrapClassName="vertical-center-modal"
            isOpen={isModalVisible}
            onClose={closeModal}
            buttonSubmit={handleAddStageClick}

          >
            {/* <div className="h-[500px] overflow-auto"> */}
            <div className=" flex flex-col items-center justify-center w-full h-full gap-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="p-1 overflow-hidden border-2 border-white rounded-full 2xl:size-14 size-12 bg-primaryalpha/10">
                  <img
                    src={arrow}
                    alt="modalimg"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <h2 className="h2">Add Stage</h2>
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
                  value={stageName}
                  change={(e) => {
                    setStageName(e);
                    setSelectedStageName(e);
                  }}
                  error={stageError}
                  required={true}
                />
              </div>
            </div>
           
            <div className="h-auto max-h-[370px] overflow-auto gap-5 flex flex-col">
            {optionData.map((key, index) => (
  <div key={index} className="flex flex-col gap-3 w-full borderb rounded-[10px] p-1 "
  >
    <div className="w-full m-auto h-12 rounded-md flex justify-between items-center pr-2"   style={{backgroundColor: `${primaryColor}10`}}>
      <h1 className="mt-3.5 m-3 font-semibold dark:text-white">{key.name}</h1>
      <Tooltip placement="top" color={'red'} title={"Delete"}>
        <RiDeleteBin5Line className="text-gray-500 2xl:text-base dark:text-white hover:text-red-500" onClick={() => handleDeleteSection(key.id)} />
      </Tooltip>
    </div>
    <div className="flex gap-2 w-full px-5 py-4">
      {key && key.option1 && key.option1.map((item, ind) => (
        <>
          {console.log(item)}
          {item.title === "Choose Evaluation" ? (
            <div key={ind} className="w-1/2">
              <Dropdown title={item.title}
                options={item.options}
                change={(e) => {
                  setEvaluationValue(e)
                }}
                value={evaluationValue}
              />
            </div>
          ) : item.title === "Choose Questionnaire" ? (
            <div key={ind} className="w-1/2">
              <Dropdown title={item.title}
                options={item.options}
                change={(e) => {
                  setQuestionnaire(e)
                }}
                value={questionnaire}
              />
            </div>
          ) : item.title === "Choose Email Template" ? (
            <div key={ind} className="w-1/2">
              <Dropdown title={item.title}
                options={item.options}
                change={(e) => {
                  setEmail(e)
                }}
                value={Email}
              />
            </div>
          ) : item.title === "Add note" ? (
            <FormInput title={item.title}
              change={(e) => {
                setAddnote(e)
              }}
              value={Addnote}
            />
          ) : ""}
          {item.titletag &&
            <div className="w-full">
              <FormInput title={item.titletag}
                change={(e) => {
                  setAddtag(e)
                }}
                value={AddTag}
              />
            </div>
          }
        </>
      ))}
    </div>
  </div>
))}
          {/* {optionData.map((item) => (
              <div  className="flex flex-col gap-3 w-full border border-black-500 ring-1 ring-black ring-opacity-5 shadow-lg rounded-lg p-1" style={{ display: menuitem ? "block" : "none" }}>
                <div className="w-full m-auto bg-slate-100 h-12 rounded-lg flex justify-between items-center pr-2">
                  <h1 className="mt-3.5 m-3 font-semibold">{item.name}</h1>
                  <RiDeleteBin5Line className="text-gray-500 2xl:text-base dark:text-white hover:text-red-500"  />
                </div>
                <div className="flex gap-2  w-full p-1">
                  { item.option1.map((item2,ind) => (
                    <div key={ind}>
                      {item2.title ?
                        <div className="w-1/2">
                          <Dropdown title={item2.title} />

                        </div>
                        : ""}
                      {item.titletag ?
                        <div className="w-full">
                          <FormInput title={item2.titletag} />
                        </div>
                        : ""}
                    </div>
                  ))}
                </div>
              </div>
            ))} */}

        

          {/* <Menu
              onClick={({ key }) => handleMenuClick(key)}
              style={{ display: menuVisible ? "block" : "none" }}
              className="w-48 border border-black-500 ring-1 ring-black ring-opacity-5 bg-white shadow-lg rounded-lg"
            >
              {options.map(option => {
                let emailOption;
                if (option.value === 'request') {
                  emailOption = emailOptions.result;
                } else if (option.value === 'note') {
                  emailOption = emailOptions.note;
                } else if (option.value === 'email') {
                  emailOption = emailOptions.email;
                } (
                  <Menu.Item key={option.key}>
                    <div className="flex justify-start gap-2 items-center" >
                      <span>{option.icon}</span>
                      <span> {option.label}</span>
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu> */}
            </div>
           
            {/* <div className="justify-start">
            <AddMore
              name="Add stage rule"
              className="text-black"
              change={() => setMenuVisible(true)}
            />
          </div>
          <Menu
            onClick={({ key, value }) => handleMenuClick(key, value)}
            style={{ display: menuVisible ? "block" : "none" }}
            className="w-48 border border-black-500 ring-1 ring-black ring-opacity-5 bg-white shadow-lg rounded-lg"
          >
            {options.map((option) => {
              return (
                <Menu.Item key={option.key}>
                  <div className="flex justify-start gap-2 items-center">
                    <span>{option.icon}</span>
                    <span> {option.label}</span>
                  </div>
                </Menu.Item>
              );
            })}
          </Menu> */}
          <MenuItems
          Items ={options}
          handleItemClick={(Key)=>{
            handleMenuClick(Key)
          }}
          
          />
          
          {/* </div> */}
        </WorkflowModal>
        {/* <Modal
            // title="Vertically centered modal dialog"
            wrapClassName="vertical-center-modal"
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={[
              <Button key="back" onClick={handleModalClose}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleAddStageClick}>
                OK
              </Button>,
            ]}
          >
            <div className='flex flex-col gap-5'>
              <div className="flex flex-col items-center justify-center font-semibold font-['Inter'] leading-relaxed">
                <p>Add Stages</p>
                <img
                  src={image}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  alt="Your Image"
                />
              </div>
              <div onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddStageClick();
                }
              }}>
                <FormInput
                  title={"Stage Name"}
                  placeholder={"Enter Stage Name"}
                  value={selectedStageName}
                  change={(e) => {
                    setStageName(e)
                    setSelectedStageName(e)
 
                  }}
                  error={stageError}
                  required={true}
                />
              </div>
              <AddMore name="Add stage rule" className="text-black" />
            </div>
 
          </Modal> */}
      </Accordion>
      {contextHolder}
    </div>
    </DrawerPop >
  );
};

export default Workflowstage;