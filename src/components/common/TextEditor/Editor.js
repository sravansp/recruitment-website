import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    handlers: {
      'image': function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            this.quill.editor.insertEmbed(this.quill.selection.savedRange.index, 'image', `data:image/png;base64,${base64}`);
          };
          reader.readAsDataURL(file);
        };
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    displaySize: {
      name: 'imageSize',
      toolbar: ['imageSize100', 'imageSize50', 'imageSize25'],
    },
    toolbar: {
      imageSize100: {
        name: 'imageSizeFull',
        action: 'resizeImage',
        value: 1,
      },
      imageSize50: {
        name: 'imageSizeHalf',
        action: 'resizeImage',
        value: 0.5,
      },
      imageSize25: {
        name: 'imageSizeQuarter',
        action: 'resizeImage',
        value: 0.25,
      },
    },
  },
};

const formats = [
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent',
  'link', 'image', 'video', 'header', 'font', 'size',
];

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const ref = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
    console.log(html);
  };

  return (
    <ReactQuill
      ref={ref}
      theme={null}
      onChange={handleChange}
      value={editorHtml}
      modules={modules}
      formats={formats}
      bounds="#root"
      placeholder={placeholder}
    />
  );
};

export default Editor;