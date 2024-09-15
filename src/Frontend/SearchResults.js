import React from 'react';

function SearchResults({ resultsCount, query }) {
    // Generate search suggestions with '*' in different positions
    const generateSuggestions = (query) => {
        const suggestions = [];
        
        // Add permutations where '*' replaces one or more characters in the query
        for (let i = 0; i <= query.length; i++) {
            // Start variations (word + *)
            if (i !== query.length) suggestions.push(`${query.slice(0, i)}*`);
            
            // End variations (* + word)
            if (i !== 0) suggestions.push(`*${query.slice(i)}`);
            
            // Middle variations (inserting '*' within the word)
            if (i !== 0 && i !== query.length) {
                suggestions.push(`${query.slice(0, i)}*${query.slice(i)}`);
            }
        }

        // Filter out duplicates if any
        return [...new Set(suggestions)];
    };

    // Limit suggestions to 4
    const suggestions = generateSuggestions(query).slice(0, 4);

    return (
        <div className="px-4">
            {/* Paragraph with margin and semi-bold font */}
            <p className="text-gray-700 font-semibold mb-2">
                About {resultsCount} {resultsCount === 1 ? 'Trademark' : 'Trademarks'} found for "{query}"
            </p>

            {/* Line break with fading blur effect */}
            <div className="h-1 bg-gradient-to-t from-gray-200 to-transparent mb-2"></div>

            {/* Render suggestions */}
            <div className="flex justify-between items-center">
                <p className="text-[#E7760E] font-semibold">
                    Also try searching for:
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="border border-[#E7760E] text-[#E7760E] font-semibold px-4 py-1 rounded-lg ml-2"
                        >
                            {suggestion}
                        </button>
                    ))}
                </p>
            </div>
        </div>
    );
}

export default SearchResults;
