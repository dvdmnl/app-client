import React, {Fragment, useEffect, useRef, useState} from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon
} from "./FileUploader.style";
import Login from "../Authentication/Login";
import {useAuthenticationValue} from "../Authentication/AuthenticationStore";
import {getUserFiles} from "../../API";
import FilePreview from "./FilePreview";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUploader = ({
                          label,
                          updateFilesCb,
                          maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
                          ...otherProps
                      }) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState([]);
    const {isLoggedIn, userData} = useAuthenticationValue()

    useEffect(() => {
        (async () => {
            if(isLoggedIn) {
                const token = userData?.tokens?.refresh?.token
                const userFilesFromDB = await getUserFiles(token)
                if (userFilesFromDB) {
                    console.log('userFilesFromDB', userFilesFromDB)
                    setFiles({...files,...userFilesFromDB})
                }
            }
        })()

    }, [userData])

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return {file};
                }
                files[file.name] = file;
            }
        }
        return {...files};
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const {files: newFiles} = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({...files});
        callUpdateFilesCb({...files});
    };

    return (
        <FileUploadContainer>
            <DragDropText>Super Simplistic Storage Solution (S4)</DragDropText>
            {!isLoggedIn ? <Login/> :
                <Fragment>
                    <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                        <i className="fas fa-file-upload"/>
                        <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                    </UploadFileBtn>
                    <FormField
                        type="file"
                        ref={fileInputField}
                        onChange={handleNewFileUpload}
                        title=""
                        value=""
                        {...otherProps}
                    />
                    {files && <FilePreview
                        files={files}
                        convertBytesToKB={convertBytesToKB}
                        removeFile={removeFile}
                    />}
                </Fragment>}
        </FileUploadContainer>
    );
};

export default FileUploader;