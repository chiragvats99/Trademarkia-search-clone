import React, { useState } from 'react';
import { FaFilter, FaShareAlt, FaClipboard } from 'react-icons/fa';

function Sidebar({
    owners,
    lawFirms,
    attorneys,
    selectedOwners,
    setSelectedOwners,
    selectedLawFirms,
    setSelectedLawFirms,
    selectedAttorneys,
    setSelectedAttorneys,
    activeStatus,
    setActiveStatus,
}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [activeFilter, setActiveFilter] = useState('owners');
    const [ownerSearchQuery, setOwnerSearchQuery] = useState('');
    const [lawFirmSearchQuery, setLawFirmSearchQuery] = useState('');
    const [attorneySearchQuery, setAttorneySearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [copySuccess, setCopySuccess] = useState(''); // State for copy success message

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleOwnerSelection = (owner) => {
        setSelectedOwners((prevSelected) =>
            prevSelected.includes(owner)
                ? prevSelected.filter((o) => o !== owner)
                : [...prevSelected, owner]
        );
    };

    const toggleLawFirmSelection = (lawFirm) => {
        setSelectedLawFirms((prevSelected) =>
            prevSelected.includes(lawFirm)
                ? prevSelected.filter((l) => l !== lawFirm)
                : [...prevSelected, lawFirm]
        );
    };

    const toggleAttorneySelection = (attorney) => {
        setSelectedAttorneys((prevSelected) =>
            prevSelected.includes(attorney)
                ? prevSelected.filter((a) => a !== attorney)
                : [...prevSelected, attorney]
        );
    };

    // Handle copying the link
    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopySuccess('Link copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Reset success message after 2 seconds
            })
            .catch(() => {
                setCopySuccess('Failed to copy!');
            });
    };

    const renderFilterContent = () => {
        switch (activeFilter) {
            case 'owners':
                return (
                    <div className="max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder="Search Owners"
                            value={ownerSearchQuery}
                            onChange={(e) => setOwnerSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                        />
                        {owners
                            .filter((owner) =>
                                owner.toLowerCase().includes(ownerSearchQuery.toLowerCase())
                            )
                            .map((owner) => (
                                <div key={owner} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={selectedOwners.includes(owner)}
                                        onChange={() => toggleOwnerSelection(owner)}
                                    />
                                    <label className="text-gray-700">{owner}</label>
                                </div>
                            ))}
                    </div>
                );
            case 'lawFirms':
                return (
                    <div className="max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder="Search Law Firms"
                            value={lawFirmSearchQuery}
                            onChange={(e) => setLawFirmSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                        />
                        {lawFirms
                            .filter((lawFirm) =>
                                lawFirm.toLowerCase().includes(lawFirmSearchQuery.toLowerCase())
                            )
                            .map((lawFirm) => (
                                <div key={lawFirm} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={selectedLawFirms.includes(lawFirm)}
                                        onChange={() => toggleLawFirmSelection(lawFirm)}
                                    />
                                    <label className="text-gray-700">{lawFirm}</label>
                                </div>
                            ))}
                    </div>
                );
            case 'attorneys':
                return (
                    <div className="max-h-48 overflow-y-auto">
                        <input
                            type="text"
                            placeholder="Search Attorneys"
                            value={attorneySearchQuery}
                            onChange={(e) => setAttorneySearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                        />
                        {attorneys
                            .filter((attorney) =>
                                attorney.toLowerCase().includes(attorneySearchQuery.toLowerCase())
                            )
                            .map((attorney) => (
                                <div key={attorney} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={selectedAttorneys.includes(attorney)}
                                        onChange={() => toggleAttorneySelection(attorney)}
                                    />
                                    <label className="text-gray-700">{attorney}</label>
                                </div>
                            ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const statuses = [
        { label: 'All' },
        { label: 'Registered', color: 'text-green-500' },
        { label: 'Pending', color: 'text-yellow-500' },
        { label: 'Abandoned', color: 'text-red-500' },
        { label: 'Others', color: 'text-blue-500' },
    ];

    return (
        <div className="p-6">
            <div className="flex space-x-2 mt-4 py-3">
                <button
                    className="flex items-center justify-center border border-gray-300 rounded-lg p-2 hover:bg-gray-100"
                    style={{ width: '80px' }}
                    onClick={handleToggleSidebar}
                >
                    <FaFilter className="text-gray-600" />
                    <span className="ml-1">Filter</span>
                </button>
                <button
                    className="flex items-center justify-center border border-gray-300 rounded-lg p-2 hover:bg-gray-100"
                    style={{ width: '80px' }}
                    onClick={() => setIsModalOpen(true)} // Open modal
                >
                    <FaShareAlt className="text-gray-600" />
                    <span className="ml-1">Share</span>
                </button>
            </div>
            {showSidebar && (
                <div className="px-3 py-4 mt-2 border border-gray-200 rounded-lg shadow-lg">
                    {/* Status Sidebar */}
                    <div className="mb-4">
                        <p className="font-bold">Status</p>
                        <div className="flex flex-wrap mt-2">
                            {statuses.map(({ label, color }) => (
                                <button
                                    key={label}
                                    onClick={() => setActiveStatus(label)}
                                    className={`flex items-center border border-gray-300 px-4 py-1 rounded-lg mr-2 mb-2 ${
                                        activeStatus === label
                                            ? 'bg-blue-200 text-blue-700'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    <span
                                        className={`mr-2 ${color} before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-current`}
                                    ></span>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Filters Sidebar (Owners, Law Firms, Attorneys) */}
                    <div className="flex space-x-2 mb-4">
                        <button
                            className={`py-2 px-4 rounded-lg ${
                                activeFilter === 'owners' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveFilter('owners')}
                        >
                            Owners
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg ${
                                activeFilter === 'lawFirms'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveFilter('lawFirms')}
                        >
                            Law Firms
                        </button>
                        <button
                            className={`py-2 px-4 rounded-lg ${
                                activeFilter === 'attorneys'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => setActiveFilter('attorneys')}
                        >
                            Attorneys
                        </button>
                    </div>
                    <div className="border rounded-lg p-4 shadow-lg">
                        {renderFilterContent()}
                    </div>
                </div>
            )}

            {/* Modal for Share Button */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Share this page</h2>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={window.location.href}
                                readOnly
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-2"
                            />
                            <button
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={handleCopy}
                            >
                                <FaClipboard className="mr-1" />
                                Copy
                            </button>
                        </div>
                        {copySuccess && (
                            <p className="text-green-500 mt-2">{copySuccess}</p>
                        )}
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
