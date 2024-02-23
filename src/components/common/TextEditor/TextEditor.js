// TextEditor.js
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ initialValue, onChange }) => {
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
    <div className='relative p-4 border border-black rounded-md h-52 border-opacity-10 dark:border-secondaryDark'>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'fontSize', 'list', 'textAlign'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            options: ['left', 'center', 'right', 'justify'],
          },
        }}
        toolbarStyle={{ position: 'absolute', bottom: '-60px', left: '0', right: '0' }}
        toolbarClassName=' bg-black'
      />
    </div>
  );
};

export default TextEditor;
