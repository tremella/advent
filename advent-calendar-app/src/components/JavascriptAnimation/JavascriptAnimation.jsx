import React, { useEffect, useRef } from 'react';

const JavascriptAnimation = ({ data }) => {    

  // Ref to the container for the animation
  const animationRef = useRef(null);  

  // Ref to track if the target div and script are loaded
  let targetDivAndScriptLoaded = useRef(false);

  useEffect(() => {
    if (data.folder_location) {        
        if (!targetDivAndScriptLoaded.current) {            
            const targetDiv = document.createElement('div');
            targetDiv.id = data.target_div || 'defaultId'; // Fallback to 'defaultId' if not provided
            animationRef.current.appendChild(targetDiv);
            targetDivAndScriptLoaded.current = true;

            import(`../../data/${data.folder_location}/style.css`)
            .then(() => {
            import(`../../data/${data.folder_location}/script.js`).then(()=> {            

            return () => {                
                animationRef.current.removeChild(targetDiv);
                targetDivAndScriptLoaded.current = false;
            };
            })})
            .catch(err => console.error('Error loading CSS:', err));
        }
    }
  }, [data]);

  return (
    <div className="javascript-animation-container" ref={animationRef}>
      {/* Other elements if needed */}
    </div>
  );
};

export default JavascriptAnimation;
