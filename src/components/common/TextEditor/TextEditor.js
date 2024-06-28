import React, { useState, useEffect } from "react";
import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML,
    Modifier,

} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FaAsterisk } from "react-icons/fa";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { BeatLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import draftToHtml from 'draftjs-to-html';
import { Select } from "antd";

const TextEditor = ({
    title = "",
    required = false,
    initialValue = "",
    onChange = () => { },
    changetoHtml = () => { },
    className,



    minheight = "250px",
    height = "",
    placeholder = "",
    loader = false,
    error = "",
    trigger = ""
}) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [Trigger, setTrigger] = useState(false)
    console.log(initialValue)
    console.log(trigger)

    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        if (trigger) {
            setTrigger(false)
        }
    }, [trigger])

    useEffect(() => {
        if (initialValue && !isInitialized && !trigger) {
            const blocksFromHTML = convertFromHTML(initialValue);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(content));

            setIsInitialized(true);
            console.log("HIII")

        } else if (initialValue && trigger && !Trigger) {
            const blocksFromHTML = convertFromHTML(initialValue);
            const content = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(content));
            setIsInitialized(true);
            setTrigger(false)


            console.log("GGG")
        }
    }, [initialValue, isInitialized, trigger]);
    const handleEditorChange = (editorState) => {

        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState)
        onChange(htmlContent || "");
        console.log(htmlContent)
        setTrigger(true)
    };

    // useEffect(()=>{
    //     handleEditorChange()
    // },[initialValue])
    const handleItemClick = (value) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const newContentState = Modifier.insertText(
            contentState,
            selectionState,
            value
        );
        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-characters'
        );
        setEditorState(newEditorState);
    };
    const items = [
        { value: '[Enter Name Here]', label: 'Enter Name' },
        { value: '[Enter Date Here]', label: 'Enter Date' },
        { value: '[Enter Location Here]', label: 'Enter Location' },
    ];

    const DropdownComponent = () => (
        <Select
            placeholder="Insert Placeholder"
            // style={{ width: 200 }}
            onChange={handleItemClick}
        >
            {items.map(item => (
                <Select.Option key={item.value} value={item.value}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
    );

    return (
        <>
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
                        toolbarCustomButtons={[<DropdownComponent key="dropdown" />]}

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
            {error && (
                <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
                    <span className="text-[10px] pl-1">{error}</span>
                </p>
            )}
        </>
    );
};

export default TextEditor;
