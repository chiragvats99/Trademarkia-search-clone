import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import logo from '../pics/logo_trademarkia.webp';

function Modal({ message, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Error</h2>
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
                    Close
                </button>
            </div>
        </div>
    );
}

function Header({ onSearch }) {
    const [query, setQuery] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        if (query.length === 0) {
            setErrorMessage('Kindly enter the query to search');
            setShowErrorModal(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/search', { query });
            console.log('Search results:', response.data); // Debugging line
            if (typeof onSearch === 'function') {
                onSearch(response.data, query); // Pass the search results to the parent component
            } else {
                console.error('onSearch is not a function');
            }
        } catch (error) {
            console.error('Error during search:', error);
            setErrorMessage('NO RESULTS FOUND');
            setShowErrorModal(true);
        }
    };

    return (
        <>
            <header className="flex items-center justify-between py-4 px-8"
                style={{
                    background: 'linear-gradient(to top, rgba(173, 216, 230, 0.2), rgba(255, 255, 255, 0.9))',
                }}
            >
                <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                        <img src={logo} alt="Trademarkia Logo" className="h-6" />
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Trademark Here eg. Mickey Mouse"
                                className="border border-gray-300 rounded-lg px-9 py-2 w-96"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white font-semibold px-6 py-2 ml-4 rounded-lg hover:shadow-lg focus:outline-none">
                            Search
                        </button>
                    </div>
                </div>
            </header>
            <div className="h-1 bg-gradient-to-t from-gray-300 to-transparent"></div>

            {/* Error Modal */}
            {showErrorModal && (
                <Modal
                    message={errorMessage}
                    onClose={() => setShowErrorModal(false)}
                />
            )}
        </>
    );
}

export default Header;
