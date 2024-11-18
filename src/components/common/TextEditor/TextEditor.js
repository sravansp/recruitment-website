/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { FaAsterisk } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import "../../../assets/css/texteditor.css";

const TextEditor = ({
  title = "",
  required = false,
  initialValue = "",
  onChange = () => {},
  className,
  minheight = "250px",
  placeholder = "",
  loader = false,
  error = "",
  trigger = "",
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [Trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      setTrigger(false);
    }
  }, [trigger]);

  const customPlaceholderButton = {
    name: "placeholder",
    tooltip: "Insert Placeholder",
    list: {
      name: "Insert { Name }",
      place: "Insert { Place }",
      location: "Insert { Location }",
      jobtitle: "Insert { Jobtitle }",
      date: "Insert { Date }",
    },
    exec: (editor, current, control, close) => {
      let placeholder = "";
      switch (control.control.name) {
        case "name":
          placeholder = "{ Name }";
          break;
        case "place":
          placeholder = "{ Place }";
          break;
        case "location":
          placeholder = "{ Location }";
          break;
        case "jobtitle":
          placeholder = "{ Jobtitle }";
          break;
        case "date":
          placeholder = "{ Date }";
          break;
        default:
          break;
      }
      editor.s.insertHTML(placeholder);
      close && close();
    },
  };

  const config = useMemo(() => {
    return {
      readonly: false,
      toolbar: true,
      uploader: { insertImageAsBase64URI: true },
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: false,
      toolbarSticky: true,
      placeholder: "",
      buttons: [
        {
          group: "list-options",
          buttons: ["fontsize"],
        },
        {
          group: "inline",
          buttons: ["bold", "italic", "strikethrough", "underline"],
        },
        {
          group: "align-options",
          buttons: ["left", "right", "center", "justify"],
        },
        {
          group: "inline-options",
          buttons: ["ul", "ol"],
        },
        {
          group: "list-options",
          buttons: ["brush"],
        },
        {
          group: "misc-options",
          buttons: [customPlaceholderButton],
        },
      ],
    };
  }, []);

  return (
    <>
      <div
        className={`relative p-4 border border-black rounded-md border-opacity-10 dark:border-secondaryDark mb-14 ${className} ${
          loader ? "vhcenter" : ""
        }`}
        style={{
          ...(error && {
            boxShadow:
              "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            border: "1px solid red",
          }),
          minHeight: `${minheight}`,
        }}
      >
        <div className="flex">
          <p
            className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}
          >
            {title}
          </p>
          {required && <FaAsterisk className="text-[10px] text-rose-600" />}
        </div>
        {loader ? (
          <BeatLoader color="#6A4BFC" />
        ) : (
          <>
            {!initialValue && (
              <div className="text-grey opacity-40 font-normal">
                {placeholder}
              </div>
            )}
            <JoditEditor
              ref={editor}
              value={initialValue}
              config={config}
              tabIndex={1}
              className="custom-jodit-editor"
              onBlur={(newContent) => {
                setContent(newContent);
              }}
              onChange={(newContent) => {
                onChange(newContent);
              }}
            />
          </>
        )}
      </div>
      {error && (
        <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </>
  );
};

export default TextEditor;
