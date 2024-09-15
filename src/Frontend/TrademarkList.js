import React from 'react';
import TrademarkItem from './TrademarkItem';
import SearchResults from './SearchResults';

const TrademarkList = ({ results, query }) => {
    console.log(results);
    return (
        <div className="p-6">
            {results.length > 0 ? (
                <>
                    {/* Display search results info with results count and query */}
                    <SearchResults resultsCount={results.length} query={query} />
                    
                    {/* Render the table headers just once */}
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-300">
                                <th className="w-1/5 pb-1 pr-4">Mark</th>
                                <th className="w-2/5 pb-1 px-4">Details</th>
                                <th className="w-1/5 pb-1 px-4">Status</th>
                                <th className="w-1/5 pb-1 pl-4">Class/Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <TrademarkItem key={index} item={item._source} />
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default TrademarkList;
