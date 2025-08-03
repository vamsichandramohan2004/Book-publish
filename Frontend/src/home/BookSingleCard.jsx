import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative border border-gray-200 rounded-lg shadow-md p-6 m-4 bg-white flex flex-col justify-between h-auto transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            {/* Adjusted position and added z-index to ensure it doesn't overlap */}
            <h2 className="absolute top-3 right-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full z-10">
                {book.publishYear}
            </h2>
            {/* Updated h4 to display the new custom ID */}
            <h4 className="my-2 text-blue-700 text-sm rounded-sm px-1">id{book.id}</h4>

            <div className="flex items-center gap-x-3 my-2 pr-12">
                <PiBookOpenTextLight className="text-blue-500 text-3xl" />
                <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            </div>
            <div className="flex items-center gap-x-3 my-2">
                <BiUserCircle className="text-blue-500 text-3xl" />
                <h2 className="text-lg text-gray-700">{book.author}</h2>
            </div>
            <div className="flex justify-between items-center gap-x-2 mt-4 p-2 border-t border-gray-100 pt-4">
                {/* Professionally styled operation buttons */}
                {/* <button
                    onClick={() => setShowModal(true)}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                >
                    <BiShow className="text-2xl text-blue-700" />
                </button> */}
                <Link
                    to={`/books/details/${book._id}`}
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
                >
                    <BsInfoCircle className="text-2xl text-green-700" />
                </Link>
                <Link
                    to={`/books/edit/${book._id}`}
                    className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200"
                >
                    <AiOutlineEdit className="text-2xl text-yellow-700" />
                </Link>
                <Link
                    to={`/books/delete/${book._id}`}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
                >
                    <MdOutlineDelete className="text-2xl text-red-700" />
                </Link>
            </div>
            {
                showModal && (
                    <BookModal book={book} onClose={() => setShowModal(false)} />
                )}
        </div>
    )
}

export default BookSingleCard;