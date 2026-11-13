import React from 'react';

const CustomChip = ({ label, onDragStart }) => {
    const handleDragStart = (event) => {
        onDragStart(event);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            style={{
                padding: '8px',
                margin: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'move',
                background: '#f2f0f0'
            }}
        >
            {label}
        </div>
    );
};

export default CustomChip;