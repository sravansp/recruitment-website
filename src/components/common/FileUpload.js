import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = Upload;

export default function FileUpload({
  change = () => { },
  className,
  flex = true,
  file = null,
}) {
  const { t } = useTranslation();
  const allowedFileFormats = ["jpg", "png", "jpeg", "svg", "webp", "pdf", "doc", "docx", "pptx"];
  const fileFormatsString = allowedFileFormats.join(", ");
  const [selectedFile, setSelectedFile] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);

  useEffect(() => {
    if (file) {
      setSelectedFile([file])
    } else {
      setSelectedFile([])
    }
  }, [file])

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
        setSelectedFile([file]);
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


  return (
    <div className={`${className}`}>
      <Dragger
        {...props}
        fileList={selectedFile}
        onChange={(info) => {
          const { file } = info;
          console.log(file, "file")
          if (file && changeStatus) {
            change(file);
          }
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
