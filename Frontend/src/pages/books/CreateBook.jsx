import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/spinner";
import api from "../../utils/api"; // Import the api instance
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [subgenre, setSubgenre] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSavebook = () => {
        const data = {
            title,
            subgenre,
            author,
            publishYear
        };
        setLoading(true);
        api
            .post(`/books`, data) // Use the 'api' instance and the relative path
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book created successfully", { variant: "success" });
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("An error happened. Please check console", { variant: "error" });
                console.log(error);
            });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-800 my-8">Create New Book</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border border-gray-200 rounded-xl w-full max-w-2xl p-6 mx-auto bg-white shadow-lg">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Subgenre</label>
                    <input
                        type="text"
                        value={subgenre}
                        onChange={(e) => setSubgenre(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-700 font-medium mb-2 block">Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                </div>
                <button
                    className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleSavebook}
                >
                    Save Book
                </button>
            </div>
        </div>
    );
};
export default CreateBook;