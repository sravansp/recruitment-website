import React from 'react'
import ButtonClick from '../../common/Button'

const Offers = () => {
  const primaryColor = localStorage.getItem("mainColor");
  return (
    <div>
      <div className='rounded-md h-[446px] sm:w-[989px] bg-white border'>
        <div className='flex justify-between items-center'>
          <h3 className='w-[87px] h-[22px] mt-[18.88px] ml-[13.61px] font-[sf pro] size-[16px] text-black font-bold '>Offer Letter</h3>
          <div
            className="flex items-center justify-end gap-2.5 p-1.5 mt-[18.88px] rounded-lg"
            // style={{ backgroundColor: `${primaryColor}10` }}
          >
            <ButtonClick buttonName="Reject" />
            <ButtonClick buttonName="Accept"  />
            <ButtonClick buttonName="Choose Template" BtnType="primary" />
          </div>
        </div>
    <div className='v-divider mt-4 border-[1px] opacity-[10px]'/>
      </div>
    </div>
  )
}

export default Offers