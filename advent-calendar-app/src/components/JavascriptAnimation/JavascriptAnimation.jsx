import React, { useEffect, useRef } from 'react';

const JavascriptAnimation = ({ data }) => {    
  const animationRef = useRef(null);  
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
            // CSS is loaded, now you can load the script
            const script = document.createElement('script');
            script.src = `/src/data/${data.folder_location}/script.js`;
            script.async = true;
            animationRef.current.appendChild(script);

            return () => {
                animationRef.current.removeChild(script);
                animationRef.current.removeChild(targetDiv);
                targetDivAndScriptLoaded.current = false;
            };
            })
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
