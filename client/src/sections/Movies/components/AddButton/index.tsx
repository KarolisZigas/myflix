import React, { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

interface Props {
    onSaveMovie: () => void;
    onDeleteMovie: () => void;
    isSaved: boolean | null | undefined;
}

export const AddButton = ({ onSaveMovie, onDeleteMovie, isSaved: initialSaved }: Props) => {
    const [isSaved, setIsSaved] = useState(initialSaved);

    const handleClick = () => {
        if (isSaved) {
            onDeleteMovie();
            setIsSaved(false);
        } else {
            onSaveMovie();
            setIsSaved(true);
        }
    }

    return (
        <div 
            className={`add-to-list-button ${isSaved ? 'bg-green-600 text-white' : ''}`}
            style={{width: isSaved ? 'auto' : 50}}
            onClick={handleClick}
        >
            {isSaved ? 'Added' : 'Add'}
            {isSaved && <CheckCircleOutlined className="ml-[8px]" />}
        </div>
    );
}