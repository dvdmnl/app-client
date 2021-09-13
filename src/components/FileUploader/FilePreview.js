import React from 'react';
import {
    FileMetaData,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    RemoveFileIcon
} from "./FileUploader.style";

const FilePreview = ({
                         files,
                         convertBytesToKB,
                         removeFile
                     }) => {
    return (
        <FilePreviewContainer>
            <PreviewList>
                {Object.keys(files).map((fileName, index) => {
                    let file = files[fileName];
                    let isImageFile = file.type.split("/")[0] === "image";
                    return (
                        <PreviewContainer key={fileName}>
                            <div>
                                {isImageFile && (
                                    <ImagePreview
                                        src={URL.createObjectURL(file)}
                                        alt={`file preview ${index}`}
                                    />
                                )}
                                <FileMetaData isImageFile={isImageFile}>
                                    <span>{file.name}</span>
                                    <aside>
                                        <span>{convertBytesToKB(file.size)} kb</span>
                                        <RemoveFileIcon
                                            className="fas fa-trash-alt"
                                            onClick={() => removeFile(fileName)}
                                        />
                                    </aside>
                                </FileMetaData>
                            </div>
                        </PreviewContainer>
                    );
                })}
            </PreviewList>
        </FilePreviewContainer>
    )
}

export default FilePreview