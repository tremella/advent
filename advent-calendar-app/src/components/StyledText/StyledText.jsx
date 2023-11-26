import React, { useState, useEffect } from 'react';

const StyledText = ({ data }) => {    
    const [content, setContent] = useState([]);        
    useEffect(() => {
        if (data) {
        import(`../../data/${data.folder_location}/style.css`).then(() =>
        import(`../../data/${data.folder_location}/index.json`)
            .then((data) => {                
            setContent(data.default.content);            
            })
            .catch((error) => {
            console.error('Error loading content:', error);
            }));
        }
    }, [data]);

    const formattedContent = content.join('');

    return (
        <div className="styled-text">
            <h2 className="styled-text-title">{data.title}</h2>
            <div className="styled-text-content" dangerouslySetInnerHTML={{ __html: formattedContent }} />            
        </div>        
    );
};

export default StyledText;