import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

useEffect(()=>{
    console.log(value);
},[value])
  console.log(value);
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")

    };
  }, []);
// Configuration of the formatting dropdown.

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={{
            ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command
              // You have to change this address to your server that has the ckfinder php connector
              uploadUrl: "" //Enter your upload url
            },
            toolbar: [
                'undo',
                'redo',
                '|',
                {
                    label: 'Text',
                    icon: false,
                    items: [
                       
                        'fontFamily',
                        'fontSize',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'removeFormat'
                    ]
                },
                '|',
                'link',
                'blockQuote',
                'uploadImage',
                'insertTable',
                'mediaEmbed',
                'horizontalLine',
                '|',
                {
                    label: 'Lists',
                    icon: false,
                    items: [ 'bulletedList', 'numberedList', '|', 'outdent', 'indent' ]
                }
                
            ],
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
