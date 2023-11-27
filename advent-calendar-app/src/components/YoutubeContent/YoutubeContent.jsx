import React from 'react';

const YoutubeContent = ({ data }) => {
  // Render YouTube content from contentData.js

  const videoUrl = data["details"]["url"]
  const videoTitle = data["details"]["comment"]
  
  return (<div className="youtube">

    <iframe width="560" height="315" 
    src={videoUrl} 
    title={videoTitle}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowFullScreen
    >
    </iframe>

    </div>);
};

export default YoutubeContent;

