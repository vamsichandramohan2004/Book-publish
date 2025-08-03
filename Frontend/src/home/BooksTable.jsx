import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books, highlightedBookId }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 rounded-tl-lg">No</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600">Title</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden">Subgenre</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden">Author</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden rounded-tr-lg">Publish Year</th>
                        <th className="p-4 text-center text-sm font-semibold text-gray-600">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        const isHighlighted = book._id === highlightedBookId;
                        return (
                            <tr
                                key={book._id}
                                className={`h-12 border-b border-gray-100 transition-all duration-200 ease-in-out
                                ${isHighlighted ? 'bg-yellow-100 shadow-md scale-[1.01]' : 'hover:bg-gray-50'}`}
                            >
                                <td className="p-4 text-sm text-gray-700 text-center">{index + 1}</td>
                                <td className="p-4 text-sm text-gray-700">{book.title}</td>
                                <td className="p-4 text-sm text-gray-700 max-md:hidden">{book.subgenre}</td>
                                <td className="p-4 text-sm text-gray-700 max-md:hidden">{book.author}</td>
                                <td className="p-4 text-sm text-gray-700 max-md:hidden">{book.publishYear}</td>
                                <td className="p-4 text-center">
                                    {/* Updated styles for the operation icons */}
                                    <div className="flex justify-center items-center gap-x-2">
                                        <Link
                                            to={`/Books/details/${book._id}`}
                                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
                                        >
                                            <BsInfoCircle className="text-xl text-green-700" />
                                        </Link>
                                        <Link
                                            to={`/Books/edit/${book._id}`}
                                            className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors duration-200"
                                        >
                                            <AiOutlineEdit className="text-xl text-yellow-700" />
                                        </Link>
                                        <Link
                                            to={`/Books/delete/${book._id}`}
                                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
                                        >
                                            <MdOutlineDelete className="text-xl text-red-700" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BooksTable;