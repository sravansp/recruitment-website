import React, { useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameList, setNameList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);

  const props = {
    name: "file",
    multiple: false, // Allow only one file to be selected
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: (file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAllowedFile = allowedFileFormats.includes(fileExtension);
      if (!isAllowedFile) {
        message.error(`${file.name} file format is not supported.`);
        setChangeStatus(false);
        return false;
      }
      else if (nameList.includes(file.name)) {
        message.error(`${file.name} file is already uploaded.`);
        setChangeStatus(false);
        return false;
      } else {
        message.success(`${file.name} file added successfully.`);
        setNameList([...nameList, file.name]);
        setChangeStatus(true);
        return false;
      }
    },
  };

  // const handleChange = (info) => {
  //   const { status, originFileObj } = info.file;
  //   if (status !== "uploading") {
  //     console.log(info.fileList);
  //     console.log(status, ":file upload status");
  //     console.log(originFileObj);
  //   }
  //   // Ensure only one file is selected
  //   if (originFileObj && changeStatus) {
  //     setSelectedFile(originFileObj);
  //     change(originFileObj);
  //   }
  // };

  const handleChange = (info) => {
    const { file } = info;

    // Ensure only one file is selected
    if (file && changeStatus) {
      setSelectedFile(file);
      change(file);
    }
  };

  return (
    <div className={`${className}`}>
      <Dragger
        {...props}
        onChange={handleChange}
        onDrop={(e) => {
          console.log(e.dataTransfer.files[0]);
          setSelectedFile(e.dataTransfer.files[0]);
          change(e.dataTransfer.files[0]);

        }}
        maxCount={1}
      >
        {flex === true ? (
          <div className="flex gap-2">
            <AiOutlineCloudUpload className="text-3xl text-primary " />
            <div className="flex flex-col">
              <h2 className="acco-subhead"> {t("Click or drag files to upload")}</h2>
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
      {/* Display the selected file */}
      {/* {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )} */}
    </div>
  );
}
