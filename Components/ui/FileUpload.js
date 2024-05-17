// import React from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";
// import { useTranslation } from "react-i18next";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// const { Dragger } = Upload;

// export default function FileUpload({
//   change = () => { },
//   className,
//   flex = true,
// }) {
//   const { t } = useTranslation();
//   const allowedFileFormats = ["jpg", "png", "jpeg", "svg", "webp", "pdf", "doc", "docx", "pptx"];
//   const fileFormatsString = allowedFileFormats.join(", ");
//   const props = {
//     name: "file",
//     multiple: true,
//     action:
//       "https://alpha-jobs-api.loyaltri.com/api/fileHandler",
//     beforeUpload: (file) => {
//       const fileExtension = file.name.split(".").pop().toLowerCase();
//       const isAllowedFile = allowedFileFormats.includes(fileExtension);
//       if (!isAllowedFile) {
//         message.error(`${file.name} file format is not supported.`);
//         return false;
//       }
//       else {
//         return isAllowedFile;
//       }
//     },
//   };
//   return (
//     <div className={`${className}`}>
//       <Dragger

//         maxCount={1}
//         {...props}
//         onChange={(info) => {
//           const { status, originFileObj } = info.file;
//           if (status !== "uploading") {
//             console.log(info.fileList);
//             console.log(status, ":file upload status");
//             console.log(originFileObj);
//           }
//           // if (status === "done") {
//           //   message.success(`${info.file.name} file uploaded successfully.`);
//           // } else if (status === "error") {
//           //   message.error(`${info.file.name} file upload failed.`);
//           // }
//           change(originFileObj);
//         }}
//         onDrop={(e) => {
//           console.log(e.dataTransfer.files[0]);
//           change(e.dataTransfer.files[0]);
//         }}
//       >
//         {flex === true ? (
//           <div className="flex items-center gap-2">
//             <AiOutlineCloudUpload className="text-3xl text-primary " />
//             <div className="flex flex-col">
//               <h2 className="acco-subhead"> {t("Click to upload")}</h2>
//               <p className="para px-2">{t("Allowed formats")}: {fileFormatsString}</p>
//             </div>
//           </div>
//         ) : (
//           <div className="">
//             <p className="ant-upload-drag-icon">
//               <InboxOutlined />
//             </p>
//             <p className="ant-upload-text">
//               Click or drag file to this area to upload
//             </p>
//             <p className="ant-upload-hint">
//               Support for a single or bulk upload. Strictly prohibited from
//               uploading company data or other banned files.
//             </p>
//           </div>
//         )}
//       </Dragger>
//     </div>
//   );
// }






import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = Upload;

export default function FileUpload({
  change = () => { },
  className,
  flex = true,
}) {
  const { t } = useTranslation();
  const allowedFileFormats = ["jpg", "png", "jpeg", "svg", "webp", "pdf", "doc", "docx", "pptx"];
  const fileFormatsString = allowedFileFormats.join(", ");
  const props = {
    name: "file",
    multiple: true,
    action:  "https://alpha-jobs-api.loyaltri.com/api/fileHandler",
    beforeUpload: (file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAllowedFile = allowedFileFormats.includes(fileExtension);
      if (!isAllowedFile) {
        message.error(`${file.name} file format is not supported.`);
        return false;
      }
      else {
        return isAllowedFile;
      }
    },
  };
  return (
    <div className={`${className}`}>
      <Dragger
        {...props}
        onChange={(info) => {
          const { status, originFileObj } = info.file;
          if (status !== "uploading") {
            console.log(info.fileList);
            console.log(status,":file upload status");
            console.log(originFileObj);
          }
          // if (status === "done") {
          //   message.success(`${info.file.name} file uploaded successfully.`);
          // } else if (status === "error") {
          //   message.error(`${info.file.name} file upload failed.`);
          // }
          change(originFileObj);
        }}
        onDrop={(e) => {
          console.log(e.dataTransfer.files[0]);
          change(e.dataTransfer.files[0]);
        }}
      >
        {flex === true ? (
          <div className="flex gap-2">
            <AiOutlineCloudUpload className="text-3xl text-primary " />
            <div className="flex flex-col">
              <h2 className="acco-subhead"> {t("Click to upload")}</h2>
              <p className="para px-5">{t("Allowed formats")}: {fileFormatsString}</p>
            </div>
          </div>
        ) : (
          <div className="">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </div>
        )}
      </Dragger>
    </div>
  );
}

