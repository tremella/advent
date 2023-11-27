import React, { useEffect, useRef } from 'react';

const JavascriptAnimation = ({ data }) => {    

  // Ref to the container for the animation
  const animationRef = useRef(null);  

  // Ref to track if the target div and script are loaded
  let targetDivAndScriptLoaded = useRef(false);

  useEffect(() => {
    if (data.folder_location && !targetDivAndScriptLoaded.current) {
      let targetDiv = document.getElementById(data.target_div || 'defaultId');
  
      if (!targetDiv) {
        targetDiv = document.createElement('div');
        targetDiv.id = data.target_div || 'defaultId';
        animationRef.current.appendChild(targetDiv);
      }
  
      import(`../../data/${data.folder_location}/style.css`)
        .then(() => import(`../../data/${data.folder_location}/script.js`))
        .then((s) => {
            s.run();
          targetDivAndScriptLoaded.current = true;
        })
        .catch(err => console.error('Error loading resources:', err));
    }
    // Cleanup function
    return () => {
      if (animationRef.current) {
        // Ensure to remove the script element specifically, not just any child
        const scriptElement = animationRef.current.querySelector('script');
        if (scriptElement) {
          animationRef.current.removeChild(scriptElement);
        }
      }
    };
  }, [data, data.folder_location]);
  
  

  return (
    <div className="javascript-animation-container" ref={animationRef}>
      {/* Other elements if needed */}
    </div>
  );
};

export default JavascriptAnimation;
