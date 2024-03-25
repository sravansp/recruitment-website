import React from 'react'
import { FaFacebook,  FaFacebookF,  FaLinkedin,  FaLinkedinIn,  FaTwitter,  } from 'react-icons/fa'

function Footer() {
  return (
    <div>
         <div className="mt-24 flex justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <h1 className="h1 !text-gray-600 ">
            Follow Us
            </h1>
        <div className="flex justify-center mt-4">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black mr-4 text-3xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black mr-4 text-3xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black mr-4 text-3xl"
                >
                  <FaLinkedinIn />
                </a>
               
                
              </div>
              <h1 className="h6 !text-[#6A4BFC] mt-4 mb-4">
              Click here to view our applicant data privacy notice
            </h1>
    </div>
    </div>
    </div>
  )
}

export default Footer