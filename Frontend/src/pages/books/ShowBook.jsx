import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/spinner";
import { useSnackbar } from "notistack";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { _id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        api.get(`/books/${_id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Failed to fetch book details.", { variant: "error" });
                setLoading(false);
            });
    }, [_id, enqueueSnackbar]); // Added enqueueSnackbar to dependency array

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
            <BackButton />
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Details</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">ID</span>
                            <span className="text-md text-blue-700 bg-blue-100 rounded-sm px-2 py-1">
                                id{book.id}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Title</span>
                            <span className="text-md text-gray-800">{book.title}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Subgenre</span>
                            <span className="text-md text-gray-800">{book.subgenre}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Author</span>
                            <span className="text-md text-gray-800">{book.author}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Publish Year</span>
                            <span className="text-md text-gray-800">{book.publishYear}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Create Time</span>
                            <span className="text-md text-gray-800">{new Date(book.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-medium text-gray-600 w-48">Last Update Time</span>
                            <span className="text-md text-gray-800">{new Date(book.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowBook;