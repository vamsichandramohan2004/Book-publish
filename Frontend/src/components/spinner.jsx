import React from "react";

const Spinner = () => {
    return (
        // The outer div with flexbox classes centers the spinner horizontally and vertically on the screen.
        <div className="flex justify-center items-center h-screen">
            {/* The inner div is the spinner itself, a circle with a spinning border. */}
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
        </div>
    );
}

export default Spinner;
