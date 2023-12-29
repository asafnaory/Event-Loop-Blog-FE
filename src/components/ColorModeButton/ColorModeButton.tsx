import React, { useState } from 'react';

export function  ColorModeButton(){
    const [isLightMode, setIsLightMode] = useState(false);

    const switchColorMode = () => {
        setIsLightMode(!isLightMode);
        if (isLightMode) {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');

        }
    };

    return (
        <button onClick={switchColorMode}>{isLightMode? "🌙" : "🌞"}</button>
    );
};


