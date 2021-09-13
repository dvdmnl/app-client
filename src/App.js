import React, {useState} from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import {AuthenticationProvider} from "./components/Authentication/AuthenticationStore";

function App() {
    const [userFiles, setUserFiles] = useState({
        profileImages: []
    });

    const updateUploadedFiles = (files) =>
        setUserFiles({...userFiles, profileImages: files});

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <AuthenticationProvider>
            <form onSubmit={handleSubmit}>
                <FileUploader
                    accept=".jpg,.png,.jpeg"
                    multiple
                    updateFilesCb={updateUploadedFiles}
                />
                <button type="submit">Create New User</button>
            </form>
        </AuthenticationProvider>
    );
}

export default App;