import React,{useState} from 'react'
import ToggleBtn from './ToggleBtn'
import { useTranslation } from "react-i18next";
import RadioButton from './RadioButton';
import { Button, Radio } from 'antd';
import Dropdown from './Dropdown';
import FormInput from './FormInput';
import { DownOutlined } from "@ant-design/icons";
import Accordion from './Accordion';

const Leacecomponent = () => {
  
    const { t } = useTranslation();
    
    const LeaveType = [
        {
          id: 1,
          label: t("Between"),
          value: "Between",
        },
        {
          id: 2,
          label: t("Greater than and equal to"),
          value: "Greater than and equal to",
        },
        {
          id: 3,
          label: t("Less than"),
          value: "Less than",
        },
      ];
     
      const [selectedOption, setSelectedOption] = useState(null);
      const [isToggleButtonActive, setToggleButtonActive] = useState(false);

      const handleRadioChange = (e) => {
        setSelectedOption(e);
        console.log(e)

      };
      const [cardHeight, setCardHeight] = useState('50px'); 
     
      const handleToggleButtonChange = (e) => {
        setCardHeight(showDetails ? '50px' : '150px');
        setToggleButtonActive(e);
        console.log(e)
      };
      const [isButtonPressed1, setIsButtonPressed1] = useState(false);
      const [isButtonPressed, setIsButtonPressed] = useState(false);


  const [showDetails, setShowDetails] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

// Function to check if a button is active
const isButtonActive = (buttonKey) => {
  return activeButton === buttonKey;
};
const [presentage, setPresentage] = useState(0);
// Function to handle button click
const handleButtonClick = (buttonKey) => {
  setActiveButton(buttonKey);
  setIsButtonPressed(buttonKey === 'partiallyPaid')
 
  // Add any other logic you need for button click
};
const handleButtonClick1 = (buttonKey) => {
  setActiveButton(buttonKey);
  setIsButtonPressed1(buttonKey === 'partiallyPaid1')
  // Add any other logic you need for button click
};
  


 
  
    return (
    
//       <div className="w-[843px] h-[843px] p-4  bg-neutral-50  rounded-[10px] flex-col justify-start items-start gap-4 flex mt-10 ">
//   <div className="self-stretch justify-between items-center inline-flex">
//     <div className="text-black text-xl font-semibold font-['Inter'] leading-[30px]">Leave Pay Rate</div>
//     {/* <div className="w-10 h-10 px-2.5 py-1.5 bg-zinc-100 rounded justify-between items-center flex" onClick={toggleDetails}>
//     <DownOutlined/>
//     </div> */}
//     <div className="grow shrink basis-0 self-stretch px-2.5 py-1.5 bg-zinc-100 rounded-[5px] justify-between items-center flex"></div>
//   </div>
  
//   <div className="self-stretch h-[506px] rounded-2xl flex-col justify-center items-start gap-6 flex" >
//   <div className="flex flex-col h-[50px] justify-start items-start gap-2 mt-5">
//   <div className="flex items-center gap-2 ">
//     <ToggleBtn change={(e) => handleToggleButtonChange(e)} />
//     <div className="text-black text-sm font-medium font-['Inter'] leading-tight flex ">
//       Set conditional pay rate based on employee's leave allowance used
//     </div>
//   </div>
// </div>
//     {isToggleButtonActive && (
//         <div className="self-stretch h-[362px] flex-col justify-center items-start gap-4 flex mt-5" style={{ height: cardHeight }}>
//         <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
//           {/* <div className="text-black text-sm font-medium font-['Inter'] leading-tight">Condition 1</div> */}
//         </div>
//         <div className="self-stretch h-[270px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 flex">
//           <div className="flex-col justify-start items-start gap-5 flex">
//             <div className="text-black text-sm font-medium font-['Inter'] leading-tight">If the employee’s leave allowance used is:</div>
//             <div className="flex-col justify-start items-start gap-3.5 flex">
//               <div className="justify-start items-start gap-8 inline-flex">
//               <RadioButton
                      
//                       options={LeaveType}
//                       change ={(e) => handleRadioChange(e)}
                      
  
  
//                     >
//                       <Radio value={"Between"}>{t("Between")}</Radio>
//                       <Radio value={"Greater than and equal to"}>{t("Greater than and equal to")}</Radio>
//                       <Radio value={"Less than"}>{t("Less than")}</Radio>
//                     </RadioButton>
   
//               </div>
//               <div className="justify-center items-center gap-3 inline-flex">
                
//               {selectedOption === "Between" && (
//                 <><div className="w-[104px] flex-col justify-start items-start inline-flex">
//                                               <div className="self-stretch h-[62px] flex-col justify-start items-start gap-1.5 flex">
//                                                   <div className="self-stretch h-[62px] flex-col justify-start items-start gap-1.5 flex">
//                                                       <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Until(before)</div>
//                                                       <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2 inline-flex">
//                                                           <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-2 flex">
//                                                               <div className="grow shrink basis-0 opacity-50 text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">value</div>
//                                                           </div>
//                                                       </div>
//                                                   </div>
//                                               </div>
//                                           </div><div className="w-[29px] h-[0px] origin-top-left -rotate-90 border border-zinc-100"></div><div className="w-[104px] flex-col justify-start items-start inline-flex">
//                                                   <div className="self-stretch h-[62px] flex-col justify-start items-start gap-1.5 flex">
//                                                       <div className="self-stretch h-[62px] flex-col justify-start items-start gap-1.5 flex">
//                                                           <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Calendar Days</div>
//                                                           <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2 inline-flex">
//                                                               <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-2 flex">
//                                                                   <div className="grow shrink basis-0 opacity-50 text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">value</div>
//                                                               </div>
//                                                           </div>
//                                                       </div>
//                                                   </div>
  
//                                               </div></>
//               )}
//               {selectedOption === "Greater than and equal to" && (
//           <div className="flex-col justify-start items-start gap-4 flex">
//             <div className="text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Calendar Days</div>
//             <div className="self-stretch px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2 inline-flex">
//               <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-2 flex">
//                 <div className="grow shrink basis-0 opacity-50 text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">value</div>
//               </div>
//             </div>
//             {/* Additional elements for 'Greater than and equal to' option */}
//           </div>
//         )}
//               </div>
//             </div>
//           </div>
//           <div className="self-stretch h-[0px] border border-black border-opacity-5"></div>
//           <div className="self-stretch h-14 flex-col justify-start items-start gap-4 flex">
//             <div className="flex-col justify-start items-start gap-0.5 flex">
//               <div className="text-black text-xs font-medium font-['Inter'] leading-[18px]">Pay rate for this policy?</div>
//             </div>
//             <div className="justify-start items-start gap-4 inline-flex">
//               <div className="mix-blend-multiply justify-start items-start flex">
//                 <div className="px-2.5 py-0.5 bg-gray-100 rounded-2xl justify-center items-center gap-1.5 flex">
//                   <div className="text-center text-slate-700 text-xs font-medium font-['Inter'] leading-[18px]">Paid Leave</div>
//                 </div>
//               </div>
//               <div className="mix-blend-multiply justify-start items-start flex">
//                 <div className="px-2.5 py-0.5 bg-gray-100 rounded-2xl justify-center items-center gap-1.5 flex">
//                   <div className="text-center text-slate-700 text-xs font-medium font-['Inter'] leading-[18px]">Unpaid Leave</div>
//                 </div>
//               </div>
//               <div className="mix-blend-multiply justify-start items-start flex">
//                 <div className="px-2.5 py-0.5 bg-gray-100 rounded-2xl justify-center items-center gap-1.5 flex">
//                   <div className="text-center text-slate-700 text-xs font-medium font-['Inter'] leading-[18px]">Partially Paid Leave</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="rounded-lg justify-start items-start inline-flex">
//           <div className="px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-center items-center gap-2 flex">
//             <div className="w-3.5 h-3.5 relative"></div>
//             <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">Add Another Condition</div>
//           </div>
//         </div>
//       </div>
//    )} 
//     <div className="self-stretch h-[76px] flex-col justify-start items-start gap-4 flex">
//       <div className="self-stretch h-[38px] flex-col justify-start items-start gap-0.5 flex">
//         <div className="text-black text-xs font-medium font-['Inter'] leading-[18px] mt-12">What is the default leave pay rate for this policy?</div>
//         <div className="self-stretch text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Set a default rate for leaves when an employee does not match any pay rate condition</div>
//       </div>
//       <div className="justify-start items-start gap-4 inline-flex mt-10">
//       <Button
//        >
//       Paid Leave
//       </Button>
//       <Button
//        >
//         Unpaid Leave
//       </Button>
//       <Button
       
//        onClick={handleButtonClick}>
//         Partially Paid Leave
//       </Button>
//       </div>
//     </div>
//     {isButtonPressed && (
//     <div className="w-[121px] h-[66px] rounded-lg flex-col justify-start items-start inline-flex">
//   <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
//     <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
//       <FormInput
//        title={t("Percentage Paid")}
//        placeholder={t("value%")}/>
//     </div>
//   </div>
// </div>
//     )}
//     <div className="w-[811px] h-[127px] flex-col justify-start items-start gap-[17px] inline-flex">
//   <div className="flex-col justify-start items-start gap-0.5 flex">
//     <div className="text-black text-sm font-medium font-['Inter'] leading-tight mt-10">How should the daily wage be calculated for unpaid percentage of leaves?</div>
//     <div className="w-[471px] text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc .</div>
//   </div>
//   <div className="justify-start items-start gap-4 inline-flex">
//     <div className="flex-col justify-start items-start inline-flex">
//       <div className="h-[70px] flex-col justify-start items-start flex">
//         <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
//           <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
            
//             <Dropdown
//             title={t("Pay Calculation")}
           
//             placeholder={t("Basic Salary")}
            

            
          
           
//           />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="flex-col justify-start items-start inline-flex">
//       <div className="h-[70px] flex-col justify-start items-start flex">
//         <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
//           <div className="self-stretch h-[70px] flex-col justify-start items-start gap-1.5 flex">
          
//           <Dropdown
//             title={t("Days")}
           
//             placeholder={t("Calendar Days")}
            

            
          
           
//           />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//   </div>
// </div>
<>
<div className='.Container_padding'>
<Accordion
                    title={"Create Late Entry Policy"}
                   
                    padding={false}
                    toggleBtn={false}
                    click={() => {
                      setPresentage(1.4);
                      
                    }}
                    className="Text_area"
>
<div className="flex gap-4 items-center ml-5 mt-5">
  <ToggleBtn change={(e) => handleToggleButtonChange(e)} />
  <div id="Text1" className="text-sm font-medium leading-[20px]">
    {t("Set conditional pay rate based on employee's leave allowance used")}
  </div>
</div>

                            {isToggleButtonActive && (

                             
        <><><div className="self-stretch h-[362px] flex-col justify-center items-start gap-4 flex " >
            <div className="self-stretch justify-start items-center  inline-flex">
              {/* <div className="text-black text-sm font-medium font-['Inter'] leading-tight">Condition 1</div> */}
            </div>
            <div className="self-stretch h-[270px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 flex">
              <div className="flex-col justify-start items-start gap-5 flex">
                <div className="text-black text-sm font-medium font-['Inter'] leading-tight">If the employee’s leave allowance used is:</div>
                <div className="flex-col justify-start items-start gap-3.5 flex">
                  <div className="justify-start items-start gap-8 inline-flex">
                    <RadioButton

                      options={LeaveType}
                      change={(e) => handleRadioChange(e)}



                    >
                      <Radio value={"Between"}>{t("Between")}</Radio>
                      <Radio value={"Greater than and equal to"}>{t("Greater than and equal to")}</Radio>
                      <Radio value={"Less than"}>{t("Less than")}</Radio>
                    </RadioButton>

                  </div>
                  <div className="justify-center items-center gap-3 inline-flex">

                    {selectedOption === "Between" && (
                      <>
                        <FormInput
                          title={t("Calendar Days")}
                          placeholder={t("values")}
                          required={true} />
                        <FormInput
                          title={t("Until(before)")}
                          placeholder={t("values")}
                          required={true} />

                      </>
                    )}
                    {selectedOption === "Greater than and equal to" && (
                      <FormInput
                        title={t("Calanderdays")}
                        placeholder={t("values")}
                        required={true} />
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
          
          </>
          <div className="Card-strech self-stretch h-[362px] flex-col justify-center items-start gap-4 flex" >
          <div className="self-stretch h-[270px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 flex"> 
              <div className="">
              <p>Pay rate for this policy?</p>
              </div>
              <div className="flex gap-4">
    <Button
      style={{
        backgroundColor: isButtonActive('paid') ? '#6A4BFC' : 'white',
        color: isButtonActive('paid') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('paid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick('paid')}
    >
      Paid Leave
    </Button>
    <Button
      style={{
        backgroundColor: isButtonActive('unpaid') ? '#6A4BFC' : 'white',
        color: isButtonActive('unpaid') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('unpaid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick('unpaid')}
    >
      Unpaid Leave
    </Button>
    <Button
      style={{
        backgroundColor: isButtonActive('partiallyPaid') ? '#6A4BFC' : 'white',
        color: isButtonActive('partiallyPaid') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('partiallyPaid') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick('partiallyPaid')}
    >
      Partially Paid Leave
    </Button>
  </div>
  {isButtonPressed && (
     <div className="w-[121px] h-[66px] rounded-lg flex-col justify-start items-start inline-flex">
   <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
     <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
       <FormInput
        title={t("Percentage Paid")}
        placeholder={t("value%")}/>
     </div>
   </div>
 </div>
    )}
     <Button> Add Another Condition</Button>
</div>
            </div>
            
            </>
      
   )}
 
 

 <div className="card_width_hight self-stretch h-[400px] px-4 py-6 bg-neutral-50 rounded-lg border border-black border-opacity-5 flex-col justify-center items-start gap-4 flex"> 
 <div id="Text1" className=" text-sm font-medium leading-[20px] ">
                              {t("What is the default leave pay rate for this policy?")}
                            </div>
                            <div className="w-[811px] text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">
                              <p>Set a default rate for leaves when an employee does not match any pay rate condition</p>
                            </div>


                            <div className="flex gap-4">
    <Button
      style={{
        backgroundColor: isButtonActive('paid1') ? '#6A4BFC' : 'white',
        color: isButtonActive('paid1') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('paid1') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick1('paid1')}
    >
      Paid Leave
    </Button>
    <Button
      style={{
        backgroundColor: isButtonActive('unpaid1') ? '#6A4BFC' : 'white',
        color: isButtonActive('unpaid1') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('unpaid1') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick1('unpaid1')}
    >
      Unpaid Leave
    </Button>
    <Button
      style={{
        backgroundColor: isButtonActive('partiallyPaid1') ? '#6A4BFC' : 'white',
        color: isButtonActive('partiallyPaid1') ? 'white' : 'black',
        border: `1px solid ${isButtonActive('partiallyPaid1') ? 'rgba(106, 75, 252, 0.7)' : '#E5E7EB'}`,
      }}
      onClick={() => handleButtonClick1('partiallyPaid1')}
    >
      Partially Paid Leave
    </Button>
  </div>

      {isButtonPressed1 && (
     <div className="w-[121px] h-[66px] rounded-lg flex-col justify-start items-start inline-flex">
   <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
     <div className="self-stretch h-[66px] flex-col justify-start items-start gap-1.5 flex">
       <FormInput
        title={t("Percentage Paid")}
        placeholder={t("value%")}/>
     </div>
   </div>
 </div>
    )}
 <div className="text-black text-sm font-medium font-['Inter'] leading-tight mt-10">How should the daily wage be calculated for unpaid percentage of leaves?</div>
     <div className="w-[471px] text-gray-500 text-xs font-medium font-['Inter'] leading-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc .</div>
     <div className="items-center gap-3 inline-flex" >
     <FormInput
                          title={t("Calendar Days")}
                          placeholder={t("values")}
                          required={true} />
                        <FormInput
                          title={t("Until(before)")}
                          placeholder={t("values")}
                          required={true} />

     </div>
     
     </div>
</Accordion>
</div>

                          
</>
  )
}

export default Leacecomponent