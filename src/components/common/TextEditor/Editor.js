import React, { useEffect, useRef } from 'react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import Editor from '@ckeditor/ckeditor5-react';
// import '@ckeditor/ckeditor5-build-classic/build/translations/en';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageResize, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';

const CKEditorWrapper = ({ data, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.editorInstance.setData(data);
        }
    }, [data]);

    return (
        <Editor
            editor={ClassicEditor}
            config={{
                plugins: [
                    Alignment,
                    Autoformat,
                    Bold,
                    Essentials,
                    FontColor,
                    FontFamily,
                    FontSize,
                    Heading,
                    Image,
                    ImageResize,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    Italic,
                    Link,
                    List,
                    Paragraph,
                    PasteFromOffice,
                    Table,
                    TableToolbar,
                    TextTransformation,
                    Undo
                ],
                toolbar: {
                    items: [
                        'heading',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'alignment',
                        'outdent',
                        'indent',
                        '|',
                        'imageUpload',
                        'insertTable',
                        'undo',
                        'redo'
                    ]
                },
                language: 'en',
                image: {
                    toolbar: ['imageTextAlternative']
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                }
            }}
            data={data}
            onChange={(event, editor) => {
                const newData = editor.getData();
                onChange(newData);
            }}
            ref={editorRef}
        />
    );
};

export default CKEditorWrapper;
