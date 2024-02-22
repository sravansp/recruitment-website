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
    <div style={{ border: '1px solid #ccc', borderRadius: '4px', position: 'relative' }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            options: ['left', 'center', 'right'],
          },
          blockType: {
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
          },
          colorPicker: {
            colors: [
              'rgba(0, 0, 0, 0.87)',
              'rgba(255, 0, 0, 1)',
              'rgba(0, 128, 0, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(255, 0, 255, 1)',
            ],
          },
        }}
        toolbarStyle={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}
      />
    </div>
  );
};

export default TextEditor;
