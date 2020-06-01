import React, { useState, useEffect } from "react";

export default function Ex06solved() {
    /*
        We can also make custom hooks in our apps, which make for greater re-usability.
        Let's make a custom hook that tracks when a certain key is pressed.
        We can use the event listeners for keydown and keyup to do this,
        whilst setting the hooks internal state to pressed -or not pressed-

    */
    const happyEmoji = '😊', sadEmoji = '😢';
    const happyPress = useKeyPress('h');
    const sadPress = useKeyPress('s');

    return (
        <>
            <h2>Ex06solved</h2>
            <div>
                {happyPress && happyEmoji}
                {sadPress && sadEmoji}
            </div>
        </>
    );
}

function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    const downKeyHandler = key => {
        key === targetKey && setKeyPressed(true)
    };
    const upKeyHandler = key => {
        key === targetKey && setKeyPressed(false)
    };

    useEffect(() => {
        window.addEventListener('keydown', e => downKeyHandler(e.key));
        window.addEventListener('keyup', e => upKeyHandler(e.key));

        //it's usually good to removeEvent listeners in the return of useEffect
        return () => {
            window.removeEventListener('keydown', downKeyHandler);
            window.removeEventListener('keyup', upKeyHandler);
        }
    }, []);

    return keyPressed;
}