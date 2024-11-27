import React, { useState, useEffect } from 'react';

// CSS for the loading bar
const loadingBarStyle = {
    width: '100%',
    height: '8px',
    backgroundColor: '#f3f3f3',
    borderRadius: '5px',
    overflow: 'hidden',
};

const loadingFillStyle = {
    height: '100%',
    backgroundColor: '#3498db',
    animation: 'loading 2s infinite',
};

// Keyframes for the loading bar animation
const loadingKeyframes = `
@keyframes loading {
    0% { width: 0%; }
    50% { width: 50%; }
    100% { width: 100%; }
}
`;

interface Ishow{
    show:boolean;
}

const LoadingBarComponent: React.FC<Ishow> = ({show}:Ishow) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(show);
    }, [show]);

    return (
        <div>
            <style>{loadingKeyframes}</style>
            {isLoading && (
                <div style={loadingBarStyle}>
                    <div style={loadingFillStyle}></div>
                </div>
            )}
        </div>
    );
};

export default LoadingBarComponent;
