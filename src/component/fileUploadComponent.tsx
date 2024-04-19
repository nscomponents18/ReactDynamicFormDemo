import React, { useState, ChangeEvent, forwardRef } from 'react';

interface FileDetails {
    name: string;
    size: number;
    type: string;
}

interface FileUploadComponentProps {
    value?: FileDetails[];
    onChange: (files: FileDetails[]) => void;
}

const FileUploadComponent = forwardRef<HTMLInputElement, FileUploadComponentProps>((props, ref) => {
    const [files, setFiles] = useState<FileDetails[]>(props.value || []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            }));
            setFiles(fileArray);
            props.onChange(fileArray);
        }
    };

    return (
        <div className="card">
            <div className="card-header">Upload Multiple Files</div>
            <div className="card-body">
                <input
                    ref={ref}
                    type="file"
                    onChange={handleFileChange}
                    multiple
                />
                {files.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Size (KB)</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index}>
                                    <td>{file.name}</td>
                                    <td>{(file.size / 1024).toFixed(2)}</td>
                                    <td>{file.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
});

export default FileUploadComponent;