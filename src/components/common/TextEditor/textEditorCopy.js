import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FaAsterisk } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import  draftToHtml  from 'draftjs-to-html'; // Update import statement
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
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

      const [isInitialized, setIsInitialized] = useState(false);
      useEffect(() => {
        if (initialValue && !isInitialized) {
            const blocksFromHTML = convertFromHTML(initialValue);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(content));
            
            setIsInitialized(true);
        }
    }, [initialValue]);
    const handleEditorChange =(editorState) => {
       
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState)
        Change(htmlContent||"");
        console.log(htmlContent) 
      };
    
    // useEffect(()=>{
    //     handleEditorChange()
    // },[initialValue])

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
                    onEditorStateChange={handleEditorChange}
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

// import React from "react";
// import ReactQuill from "react-quill";

// import "react-quill/dist/quill.core.css";
// import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";
// import { FaAsterisk } from "react-icons/fa";
// import { BeatLoader } from "react-spinners";

// export default function TextEditorcopy({
//     title = "",
//     required = false,
//     initialValue,
//     Change = () => {},
//     className,
//     minheight = "250px",
//     height = "",
//     placeholder = "",
//     loader = false,
//     error = "",

// }) {
//     console.log(initialValue);
    
//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" }
//       ],
//       ["link", "image", "video"],
//       ["clean"]
//     ],
//     clipboard: {
//       // toggle to add extra line breaks when pasting HTML:
//       matchVisual: false
//     }
//   };

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video"
//   ];

//      return (
//         <div
//             className={`relative p-4 border border-black rounded-md border-opacity-10 dark:border-secondaryDark mb-14 ${className} ${loader ? "vhcenter" : ""}`}
//             style={{
//                 ...(error && {
//                     boxShadow: "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
//                     border: "1px solid red",
//                 }),
//                 minHeight: `${minheight}`,
//             }}
//         >
//             <div class="ql-editor ql-blank">
//             {error && (
//                 <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
//                     <span className="text-[10px] pl-1">{error}</span>
//                 </p>
//             )}
//             <div className="flex">
//                 <p className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}>{title}</p>
//                 {required && <FaAsterisk className="text-[10px] text-rose-600" />}
//             </div>
//             {loader ? (
//                 <BeatLoader color="#6A4BFC" />
//             ) : (
//                 <ReactQuill onChange={(e)=>{
//                  Change(e)
//                 }} 
//                 value={initialValue} 
//                 modules={modules} 
//                 formats={formats} />
//             )}
//             </div>
//         </div>
//     );
// }
// import React, { Component, useState } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditorBase from '@ckeditor/ckeditor5-build-classic';
// import { useEffect } from 'react';



// export default function TextEditorcopy({
//     initialValue="",
//      Change = () => {},
// }){
    
//     // useEffect(()=>{
//     //     setData(String(initialValue))
       
//     // },[initialValue])


//     return(
//     <div className="App">
    
//     <CKEditor
//         editor={ClassicEditorBase}
//         data={String(initialValue)}
        
//         onReady={ editor => {
//             // You can store the "editor" and use when it is needed.
//             console.log( 'Editor is ready to use!', editor );
//         } }
//         onChange={ ( event,editor ) => {
//             console.log( event );
//             // handleChange(event)
//             const newData = editor.getData();
            
//             Change(newData);
            
//         } }
//         onBlur={ ( event, editor ) => {
//             console.log( 'Blur.', editor );
//         } }
//         onFocus={ ( event, editor ) => {
//             console.log( 'Focus.', editor );
//         } }
//         // config={{
//         //     plugins: [EasyImage, Base64UploadAdapter],
//         //     toolbar: [
                
//         //         'imageUpload', '|',
//         //         'undo', 'redo'
//         //     ],
//         //     ckfinder: {
//         //         uploadUrl: ""
//         //     }
//         // }}
//     />
// </div>

// )
// }

