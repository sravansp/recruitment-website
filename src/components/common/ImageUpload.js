import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = Upload;

export default function ImageUpload({
  change = () => { },
  className,
  flex = true,
}) {
  const { t } = useTranslation();
  const allowedImageFormats = ["jpg", "png", "jpeg", "svg", "webp"];
  const imageFormatsString = allowedImageFormats.join(", ");
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: (file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isAllowedFile = allowedImageFormats.includes(fileExtension);
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
        // height={height}
        onChange={(info) => {
          console.log(info[0]);
          const { status } = info.file;
          if (status !== "uploading") {
            console.log(info.fileList);
            console.log(info.file[0]);
          }
          if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
          change(info.file[0]);
        }}
        onDrop={
          (e) => change(e.dataTransfer.files[0])
          //    {
          //   console.log("Dropped files", e.dataTransfer.files);
          // }
        }
      // style={{
      //   paddingTop: 0,
      //   paddingBottom: 0,
      // }}
      // className="py-0"
      >
        {flex === true ? (
          // <div className={`flex justify-evenly `}>
          //   <AiOutlineCloudUpload className="text-3xl text-primary " />
          //   <div className="">
          //     <p className="mb-0 text-sm font-bold text-center ">
          //       {t("Click_to_upload")}
          //     </p>
          //     <p className="para 2xl:!text-xs">{t("Format")}</p>
          //   </div>
          // </div>
          <div className="flex gap-2">
            <AiOutlineCloudUpload className="text-3xl text-primary " />
            <div className="flex flex-col">
              <h2 className="acco-subhead"> {t("Click to upload")}</h2>
              <p className="para px-5">{t("Allowed formats")}: {imageFormatsString}</p>
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
    // <input
    //   type="file"
    //   onChange={(e) => {
    //     change(e.target.files[0]);

    //     console.log(e.target.files[0]);
    //   }}
    // />
  );
}
