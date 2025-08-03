import React, { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../../home/BooksCard";
import BooksTable from "../../home/BooksTable";
import { useSnackbar } from "notistack";
import api from "../../utils/api";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSubgenre, setFilterSubgenre] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    const [filterPublishYear, setFilterPublishYear] = useState('');
    const [highlightedBookId, setHighlightedBookId] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchBooks = async () => {
        setLoading(true);
        setHighlightedBookId(null);
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (filterSubgenre) params.append('subgenre', filterSubgenre);
            if (filterAuthor) params.append('author', filterAuthor);
            if (filterPublishYear) params.append('publishYear', filterPublishYear);

            const url = `/books?${params.toString()}`;
            const response = await api.get(url);
            const fetchedBooks = response.data.data;

            const isFilterActive = searchQuery || filterSubgenre || filterAuthor || filterPublishYear;

            if (isFilterActive) {
                // Find a book that is an EXACT MATCH for ALL active criteria
                const exactMatchBook = fetchedBooks.find(book => {
                    // Check if the book matches the searchQuery (if present)
                    const matchesSearch = !searchQuery || (
                        book.title.toLowerCase() === searchQuery.toLowerCase() ||
                        book.author.toLowerCase() === searchQuery.toLowerCase() ||
                        (book.subgenre && book.subgenre.toLowerCase() === searchQuery.toLowerCase())
                    );

                    // Check if the book matches the dedicated filters (if present)
                    const matchesSubgenre = !filterSubgenre || (book.subgenre && book.subgenre.toLowerCase() === filterSubgenre.toLowerCase());
                    const matchesAuthor = !filterAuthor || (book.author && book.author.toLowerCase() === filterAuthor.toLowerCase());
                    const matchesYear = !filterPublishYear || (book.publishYear && book.publishYear.toString() === filterPublishYear.toString());

                    // A book is an exact match only if it satisfies ALL conditions
                    return matchesSearch && matchesSubgenre && matchesAuthor && matchesYear;
                });

                if (exactMatchBook) {
                    setHighlightedBookId(exactMatchBook._id);
                    setBooks(fetchedBooks);
                    enqueueSnackbar("Book found!", { variant: "success" });
                } else {
                    enqueueSnackbar("Book Not Found", { variant: "error" });
                    setBooks([]);
                }
            } else {
                setBooks(fetchedBooks);
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar("An error occurred during search.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [searchQuery, filterSubgenre, filterAuthor, filterPublishYear]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchBooks();
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setFilterSubgenre('');
        setFilterAuthor('');
        setFilterPublishYear('');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto my-8">
                <div className="flex justify-center items-center gap-x-4 mb-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => setShowType('table')}>
                        Table
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={() => setShowType('card')}>
                        Card
                    </button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Books List</h1>
                    <Link to="/Books/create">
                        <MdOutlineAddBox className="text-blue-600 hover:text-blue-800 text-5xl transition duration-300 ease-in-out" />
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 my-6">
                    <input
                        type="text"
                        placeholder="Search by title, author, or subgenre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />

                    <input
                        type="text"
                        placeholder="Filter by Subgenre"
                        value={filterSubgenre}
                        onChange={(e) => setFilterSubgenre(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                    <input
                        type="text"
                        placeholder="Filter by Author"
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />
                    <input
                        type="number"
                        placeholder="Filter by Year"
                        value={filterPublishYear}
                        onChange={(e) => setFilterPublishYear(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                    />

                    <button
                        onClick={handleClearFilters}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 w-full md:w-auto"
                    >
                        Clear
                    </button>
                </div>

                {loading ? <Spinner /> : showType === 'table' ? (
                    <BooksTable books={books} highlightedBookId={highlightedBookId} />
                ) : (<BooksCard books={books} />)}
            </div>
        </div>
    );
};

export default Home;