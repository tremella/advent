import React, { useState, useEffect } from 'react';

const StyledText = ({ data }) => {    

    // content variable for later use, and setContent function to update it
    const [content, setContent] = useState([]);    

    // useEffect hook updates content with imported data
    useEffect(() => {
        if (data) {
        // imports the data we're displaying 
        import(`../../data/${data.folder_location}/style.css`).then(() =>
        import(`../../data/${data.folder_location}/index.json`)
            .then((jsonData) => {              
              
            // updates content variable with the content from the json file
            setContent(jsonData.default.content);            
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