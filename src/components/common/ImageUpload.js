import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = Upload;

export default function ImageUpload({
  change = () => {},
  className,
  flex = true,
  file = null, // Default file prop
}) {
  const { t } = useTranslation();
  const allowedImageFormats = ["jpg", "png", "jpeg", "svg", "webp"];
  const imageFormatsString = allowedImageFormats.join(", ");
  const [fileList, setFileList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);

  useEffect(() => {
    if (file) {
      setFileList([file]);
    } else {
      setFileList([]);
    }
  }, [file]);

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: (file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAllowedFile = allowedImageFormats.includes(fileExtension);
      if (!isAllowedFile) {
        message.error(`${file.name} file format is not supported.`);
        setChangeStatus(false);
        return false;
      } else if (nameList.includes(file.name)) {
        message.error(`${file.name} file is already uploaded.`);
        setChangeStatus(false);
        return false;
      } else {
        message.success(`${file.name} file added successfully.`);
        // Clear the previously selected file and add the new one
        setFileList([file]);
        setNameList([...nameList, file.name]);
        setChangeStatus(true);
        return false; // Prevent automatic upload
      }
    },
  };

  return (
    <div className={`${className}`}>
      <Dragger
        {...props}
        fileList={fileList}
        onChange={(info) => {
          const { file } = info;
          if (file && changeStatus) {
            change(file);
          }
        }}

        // onChange={(info) => {
        //   const { status } = info.file;
        //   if (status === "done") {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        //   } else if (status === "error") {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        //   change(info.file);
        // }}
      >
        {flex === true ? (
          <div className="flex gap-2">
            <AiOutlineCloudUpload className="text-3xl text-primary" />
            <div className="flex flex-col">
              <h2 className="acco-subhead">
                {" "}
                {t("Click or drag files to upload")}
              </h2>
              <p className="para px-5">
                {t("Allowed formats")}: {imageFormatsString}
              </p>
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
