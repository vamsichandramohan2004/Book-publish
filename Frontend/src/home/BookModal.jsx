import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
            onClick={onClose}>
            <div
                className="w-full max-w-lg bg-white rounded-xl p-8 flex flex-col relative shadow-2xl animate-fade-in-up"
                onClick={(event) => event.stopPropagation()}
            >
                <AiOutlineClose
                    className="absolute right-4 top-4 text-3xl text-gray-500 hover:text-red-600 cursor-pointer transition-colors duration-200"
                    onClick={onClose}
                />
                <h2 className="w-fit px-4 py-1 bg-blue-100 text-blue-800 text-lg font-semibold rounded-full mb-4">
                    {book.publishYear}
                </h2>
                <h4 className="my-2 text-gray-600 text-sm font-medium">ID: {book._id}</h4> {/* Added "ID:" for clarity */}
                <div className="flex items-center gap-x-3 my-2">
                    <PiBookOpenTextLight className="text-blue-500 text-3xl" />
                    <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                </div>
                <div className="flex items-center gap-x-3 my-2">
                    <BiUserCircle className="text-blue-500 text-3xl" />
                    <h2 className="text-xl text-gray-700">{book.author}</h2>
                </div>
                {/* Additional book details from ShowBook can be added here for a richer modal */}
                <div className="my-2 text-gray-700">
                    <span className="font-semibold">Subgenre:</span> {book.subgenre}
                </div>
                <div className="my-2 text-gray-700">
                    <span className="font-semibold">Create Time:</span> {new Date(book.createdAt).toLocaleString()}
                </div>
                <div className="my-2 text-gray-700">
                    <span className="font-semibold">Last Update Time:</span> {new Date(book.updatedAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default BookModal;