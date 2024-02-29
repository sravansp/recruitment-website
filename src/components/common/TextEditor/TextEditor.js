// TextEditor.js
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ initialValue, onChange, className, minheight = "250px" }) => {
  const [editorState, setEditorState] = useState(
    initialValue
      ? EditorState.createWithContent(ContentState.createFromText(initialValue))
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      const contentState = state.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const plainText = rawContentState.blocks
        .map((block) => block.text)
        .join('\n');
      onChange(plainText);
    }
  };
  
  return (
  //  <div className={`min-h-[${minheight}]`} style={{minHeight: `${minheight}`}}>
     <div className={`relative p-4 border border-black rounded-md border-opacity-10 dark:border-secondaryDark mb-14 ${className}`} style={{minHeight: `${minheight}`}}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        placeholder="Type your text here..." // Add placeholder here
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
  //  </div>
  );
};

export default TextEditor;
