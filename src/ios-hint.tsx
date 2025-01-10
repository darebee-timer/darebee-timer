import React from "react";

const KEY = 'HAS_IOS_HINT_SEEN';

function isIos() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function IosHint() {
    const [seen, setSeen] = React.useState(() =>
        !isIos() ||
        Boolean(localStorage.getItem(KEY))
    );
    if (seen) return null;
    return <div className="alert alert-info alert-dismissible" role="alert">
        Turn off silent mode of your phone to hear sound.
        <button type="button" className="btn-close"
            aria-label="Close"
            onClick={() => {
                localStorage.setItem(KEY, "true");
                setSeen(true);
            }} />
    </div>;
}

export default IosHint;