import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FaAsterisk } from "react-icons/fa";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { BeatLoader } from 'react-spinners';

const TextEditor = ({
  title = "",
  required = false,
  initialValue = "",
  onChange = () => {},
  changetoHtml = () => {},
  className,
  
 
  
  minheight = "250px",
  height = "",
  placeholder = "",
  loader = false,
  error = "",
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialValue) {
      const blocksFromHTML = convertFromHTML(initialValue);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(state);
    } else {
      return EditorState.createEmpty();
    }
  });
  // console.log(error)
  useEffect(() => {
    // Check if initialValue exists and if it's different from the current editor content
    if (
      initialValue &&
      initialValue !== editorState.getCurrentContent().getPlainText()
    ) {
      const contentState = ContentState.createFromText(initialValue);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [initialValue, editorState]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      const contentState = state.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const plainText = rawContentState.blocks
        .map((block) => block.text)
        .join("\n");
      const htmlContent = stateToHTML(contentState);

      onChange(plainText);
      changetoHtml(htmlContent);
      console.log(htmlContent)
      console.log(plainText);
      // Ensure onChange is called with plainText, which is a string
    }
  };
  // console.log(initialValue);
  
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve({ data: { link: event.target.result } });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  

 
  return (
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
      {error && (
            <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
              <span className="text-[10px] pl-1">{error}</span>
            </p>
          )}
      <div className="flex">
        <p
          className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}
        >
          {title}
        </p>
        {required && <FaAsterisk className="text-[10px] text-rose-600" />}
      </div>
      {loader ? (
        // Render loader while data is loading
        <BeatLoader color="#6A4BFC" />
      ) : (
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          placeholder={placeholder}
          wrapperStyle={{ height: height }}
          toolbar={{
            options: ["inline", "fontSize", "list", "textAlign"],
            inline: {
              options: ["bold", "italic", "underline", "strikethrough"],
            },
            list: {
              options: ["unordered", "ordered", "indent"],
            },
            textAlign: {
              options: ["left", "center", "right", "justify"],

            },
            image: {
              
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: true, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
          }}
          toolbarStyle={{
            position: "absolute",
            bottom: "-60px",
            left: "0",
            right: "0",
          }}
          toolbarClassName=" bg-black"
          editorClassName="h-full"
        />
          
        
      )}
     
    </div>
  );
};

export default TextEditor;
