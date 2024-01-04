import  { useState } from 'react';

export function  ColorModeButton(){
    const [isLightMode, setIsLightMode] = useState(false);

    const switchColorMode = () => {
        setIsLightMode(!isLightMode);
        if (isLightMode) {
            document.body.classList.remove('dark');
            // document.body.classList.add('light-theme');
        } else {
            // document.body.classList.remove('light-theme');
            document.body.classList.add('dark');
        }
    };

    return (
        <button onClick={switchColorMode}>{isLightMode? "🌙" : "🌞"}</button>
    );
};


