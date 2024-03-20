import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FaAsterisk } from "react-icons/fa";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({
  title = "",
  required = false,
  value = "",
  onChange = () => {},
  className,
  minheight = "250px",
  placeholder = ""
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      const contentState = convertFromRaw(JSON.parse(value));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (value) {
      const contentState = convertFromRaw(JSON.parse(value));
      const newEditorState = EditorState.push(editorState, contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      const contentState = state.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      onChange(JSON.stringify(rawContentState));
    }
  };

  return (
    <div className={`relative p-4 border border-black rounded-md border-opacity-10 dark:border-secondaryDark mb-14 ${className}`} style={{ minHeight: `${minheight}` }}>
      <div className="flex">
        <p className={`text-xs font-medium 2xl:text-sm dark:text-white ${className}`}>
          {title}
        </p>
        {required && <FaAsterisk className="text-[10px] text-rose-600" />}
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        placeholder={placeholder}
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'textAlign'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            options: ['unordered', 'ordered', 'indent'],
          },
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
        }}
        toolbarStyle={{ position: 'absolute', bottom: '-60px', left: '0', right: '0' }}
        toolbarClassName=' bg-black'
        editorClassName='h-full'
      />
    </div>
  );
};

export default TextEditor;
