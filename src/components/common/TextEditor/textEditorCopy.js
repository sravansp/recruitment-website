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

    console.log(initialValue)
      const [editorState, setEditorState] = useState("");
     
    // useEffect(() => {
    //     if (initialValue) {
        
    //             // const blocksFromHTML = convertFromHTML(initialValue);
    //             // const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    //             // const newEditorState = EditorState.createWithContent(contentState);
    //             // setEditorState(newEditorState);
    //             // const Htmldata = editorState.getCurrentContent();
    //             // const htmlContent = convertToHTML(Htmldata);
    //             //  console.log({"Value":htmlContent})
    //             //  Change(htmlContent);
               
    //         setEditorState(initialValue)
          
    //     }else {
    //         console.log("No initail values");
    //         setEditorState(EditorState.createEmpty())
    //     }
    //      console.log(initialValue)
    //   }, [initialValue]);
      

      const handleEditorChange = (editorState) => {
        //  setEditorState(editorState)
        if(Change){
            const contentState = editorState.getCurrentContent();
            const htmlContent = convertToHTML(contentState);
            
            Change(htmlContent);
           }
      
    }
    
    //   useEffect(() => {
    //     if(Change){
    //                 const contentState = editorState.getCurrentContent();
    //                 const htmlContent = convertToHTML(contentState);
                    
    //                 Change(htmlContent);
    //                }
    //   }, [initialValue]);


   
  

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
          editorState={initialValue}
          onEditorStateChange={(e)=> {
           console.log(e)
        //    handleEditorChange(e)
        Change(e)
        
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
// import React, { Component } from 'react';
// import { Editor as CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
// import { Alignment } from '@ckeditor/ckeditor5-alignment';
// import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
// import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
// import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
// import { CKBox } from '@ckeditor/ckeditor5-ckbox';
// import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { FontBackgroundColor, FontColor, FontSize } from '@ckeditor/ckeditor5-font';
// import { Heading } from '@ckeditor/ckeditor5-heading';
// import {
//     AutoImage,
//     Image,
//     ImageCaption,
//     ImageStyle,
//     ImageToolbar,
//     ImageUpload,
//     PictureEditing,
// } from '@ckeditor/ckeditor5-image';
// import { Indent } from '@ckeditor/ckeditor5-indent';
// import { Link } from '@ckeditor/ckeditor5-link';
// import { List } from '@ckeditor/ckeditor5-list';
// import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
// import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
// import { TextTransformation } from '@ckeditor/ckeditor5-typing';
// import { AccessibilityHelp } from '@ckeditor/ckeditor5-ui';
// import { Undo } from '@ckeditor/ckeditor5-undo';

// const Editor = () => {
     
//         return (
//             <CKEditor
//                 editor={ClassicEditor}
//                 config={{
//                     toolbar: {
//                         items: [
//                             'heading',
//                             'bold',
//                             'italic',
//                             'link',
//                             'alignment',
//                             'bulletedList',
//                             'numberedList',
//                             '|',
//                             'fontColor',
//                             'fontBackgroundColor',
//                             'underline',
//                             'fontSize',
//                             '|',
//                             'outdent',
//                             'indent',
//                             '|',
//                             'imageUpload',
//                             'insertTable',
//                             'mediaEmbed',
//                             'undo',
//                             'redo',
//                         ],
//                     },
//                     language: 'en',
//                     image: {
//                         toolbar: [
//                             'imageTextAlternative',
//                             'toggleImageCaption',
//                             'imageStyle:inline',
//                             'imageStyle:block',
//                             'imageStyle:side',
//                         ],
//                     },
//                     table: {
//                         contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
//                     },
//                 }}
//             />
//         );
//     }


// export default Editor;