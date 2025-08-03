import React from "react";
import PropTypes from "prop-types";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
    return(
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((item, index) => (
                <BookSingleCard key={item._id} book={item} index={index + 1} />
            ))}
        </div>
    )
}

BooksCard.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string,
            author: PropTypes.string,
            publishYear: PropTypes.number
        })
    )
}

export default BooksCard;