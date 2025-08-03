import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/spinner";
import api from "../../utils/api"; // Import the api instance
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [subgenre, setSubgenre] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { _id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        // Use 'api' instance for the GET request
        api.get(`/books/${_id}`)
            .then((response) => {
                setTitle(response.data.title);
                setSubgenre(response.data.subgenre);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("An error happened. Please check console", { variant: "error" });
                console.log(error);
            });
    }, [_id, navigate]);

    const handleEditbook = () => {
        const data = {
            title,
            subgenre,
            author,
            publishYear
        };
        setLoading(true);
        // Use 'api' instance for the PUT request
        api.put(`/books/${_id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book edited successfully", { variant: "success" });
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
            <h1 className="text-3xl font-bold text-gray-800 my-8">Edit Book</h1>
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
                    onClick={handleEditbook}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditBook;