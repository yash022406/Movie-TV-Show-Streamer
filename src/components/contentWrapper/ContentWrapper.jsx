import React from "react";


const ContentWrapper = ({ children }) => {
    return <div className="w-[100%] max-w-[1200px] mx-auto px-5 flex justify-between contentWrapper">{children}</div>;
};

export default ContentWrapper;