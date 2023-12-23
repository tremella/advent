import React, { useState, useEffect } from 'react';
import './Envelope.css';

function Envelope() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLetterVisible, setIsLetterVisible] = useState(false);
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    const openEnvelope = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const showLetter = () => {
        if (isOpen && !isLetterVisible) {
            setIsLetterVisible(true);
            setIsZoomedIn(true);
        }
    };

    useEffect(() => {
        const closeButton = document.querySelector('.modal-close');
        if (closeButton) {
            if (isZoomedIn) {
                // Adjust these values as needed
                closeButton.style.position = 'absolute';
                closeButton.style.top = '-20%';
                closeButton.style.right = '-30%';
            } else {
                // Reset styles when not zoomed in
                closeButton.style.position = '';
                closeButton.style.top = '';
                closeButton.style.right = '';
            }
        }
    }, [isZoomedIn]);


    return (
        <div className="letter-image">
            <div className={`animated-mail ${isOpen ? 'open' : ''} ${isLetterVisible ? 'letter-only' : ''} ${isZoomedIn ? 'final-view' : ''}`} 
                 onClick={!isOpen ? openEnvelope : !isLetterVisible ? showLetter: undefined}>
                <div className="back-fold"></div>
                <div className="letter">
                    <div className="letter-border"></div>
                    <div className="letter-content">                        
                        <p>Thank you for being part of our Advent Calendar journey!</p>
                        <p> This was our second project together, and we had a lot of fun making it.
                        You can find <a href="https://x.com/BeagleRampage"> Jess </a>
                        and <a href="https://x.com/mayankdaswani"> Mayank </a> on X/twitter. 
                        Do tweet at us if you liked the website!
                        </p>
                        <p>
                        This time around, we also had help from our talented friend 
                        <a href="https://x.com/tichaelmurvey"> Michael Turvey</a>, 
                        find more of his projects at <a href="https://funwebsite.fun/"> funwebsite.fun</a>
                        </p>
                    </div>
                    <div className="letter-stamp">
                        <div className="letter-stamp-inner"></div>
                    </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
            </div>
            <div className={`shadow ${isOpen ? 'open' : ''}`}></div>
        </div>
    );
    
}

export default Envelope;
