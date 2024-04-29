import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FaAsterisk } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import { convertToHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditorcopy = ({
  title = "",
  required = false,
  initialValue,
  Change = () => {},
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
            const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });
     
    useEffect(() => {
        if (initialValue) {
        
                const blocksFromHTML = convertFromHTML(initialValue);
                const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
                const newEditorState = EditorState.createWithContent(contentState);
                setEditorState(newEditorState);
                // const Htmldata = editorState.getCurrentContent();
                // const htmlContent = convertToHTML(Htmldata);
                //  console.log({"Value":htmlContent})
                //  Change(htmlContent);
            
         
          
        }else {
            console.log("No initail values");
            setEditorState(EditorState.createEmpty())
        }
         console.log(initialValue)
      }, [initialValue]);
      

      const handleEditorChange = (editorState) => {
        setEditorState(editorState);
      
    }
    
      useEffect(() => {
       if(Change){
        const contentState = editorState.getCurrentContent();
        const htmlContent = convertToHTML(contentState);
        
        Change(htmlContent);
       }
      }, [Change]);


   
  

  return (
    <div
      className={`relative p-4 border border-black rounded-md border-opacity-10 dark:border-secondaryDark mb-14 ${className} ${loader ? "vhcenter" : ""}`}
      style={{
        ...(error && {
          boxShadow: "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
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
        <p className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}>{title}</p>
        {required && <FaAsterisk className="text-[10px] text-rose-600" />}
      </div>
      {loader ? (
        <BeatLoader color="#6A4BFC" />
      ) : (
        <Editor
          editorState={editorState}
          onEditorStateChange={(e)=>{
            console.log(e)
            handleEditorChange(e)
          }}
          
          placeholder={placeholder}
          wrapperStyle={{ height: height }}
          toolbar={{
            options: ["inline", "fontSize", "list", "textAlign"],
            inline: { options: ["bold", "italic", "underline", "strikethrough"] },
            list: { options: ["unordered", "ordered", "indent"] },
            textAlign: { options: ["left", "center", "right", "justify"] },
          }}
          toolbarStyle={{ position: "absolute", bottom: "-60px", left: "0", right: "0" }}
          toolbarClassName="bg-black"
          editorClassName="h-full"
        />
      )}
    </div>
  );
};

export default TextEditorcopy;
