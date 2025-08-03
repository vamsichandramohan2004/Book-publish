import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
    return (
        <div className="flex my-4"> {/* Added vertical margin */}
            <Link
                to={destination}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg w-fit transition-colors duration-200 flex items-center gap-x-2 shadow-sm" /* Softer color, better hover, consistent padding */
            >
                <BsArrowLeft className="text-xl" /> {/* Slightly smaller icon */}
                <span className="text-base font-medium">Back</span> {/* Added text for clarity */}
            </Link>
        </div>
    )
}

export default BackButton;