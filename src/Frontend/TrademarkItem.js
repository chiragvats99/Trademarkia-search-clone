import React, { useState } from 'react';

const TrademarkItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to truncate the description to the first 60 words
    const getTruncatedDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 60) {
            return words.slice(0, 30).join(' ') + '...';
        }
        return description;
    };

    // Description text
    const descriptionText = item.mark_description_description.join(", ");

    return (
        <tr className="border-b border-gray-200 py-1">
            <td className="align-top px-4 py-2">
                {/* Dummy image for trademark */}
                <img
                    src="https://via.placeholder.com/80"
                    alt="Trademark logo"
                    className="mb-2 w-20 h-20 object-cover"
                />
                {/* <p className="font-bold text-base mb-1">{item.mark_identification}</p> */}
            </td>
            <td className="align-top px-4 py-2">
                <p className="text-gray-600 mb-1">{item.current_owner}</p>
                <p className="text-gray-600 mb-1">Serial Number: {item.serial_number || "N/A"}</p>
                <p className="text-gray-600">Filing Date: {new Date(item.filing_date * 1000).toLocaleDateString()}</p>
            </td>
            <td className="align-top px-4 py-2">
                <p className="text-green-500 mb-1">{item.status_type}</p>
                <p className="text-gray-600 mb-1">Registered on: {new Date(item.registration_date * 1000).toLocaleDateString()}</p>
                <p className="text-red-500">Expiry Date: {new Date(item.renewal_date * 1000).toLocaleDateString()}</p>
            </td>
            <td className="align-top px-4 py-2">
                <p className="text-gray-600 mb-2">
                    {isExpanded ? descriptionText : getTruncatedDescription(descriptionText)}
                </p>
                {descriptionText.split(' ').length > 60 && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 hover:underline"
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                    {item.class_codes.map((cls, idx) => (
                        <span key={idx} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                            {cls}
                        </span>
                    ))}
                </div>
            </td>
        </tr>
    );
};

export default TrademarkItem;
