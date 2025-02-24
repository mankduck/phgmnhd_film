import React, { useEffect } from "react";

const FacebookLike = ({ url }) => {

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [url]);

    return (
        <div>
            <div class="fb-like" data-href={url} data-width="" data-layout="" data-action="" data-size="" data-share="true"></div>
        </div>
    );
};

export default FacebookLike;


