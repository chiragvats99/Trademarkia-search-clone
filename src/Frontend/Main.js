import React, { useState, useEffect } from 'react';
import Header from './Header';
import TrademarkList from './TrademarkList';
import Sidebar from './Sidebar';

function Main() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    
    // States to manage selected filters
    const [selectedOwners, setSelectedOwners] = useState([]);
    const [selectedLawFirms, setSelectedLawFirms] = useState([]);
    const [selectedAttorneys, setSelectedAttorneys] = useState([]);
    const [activeStatus, setActiveStatus] = useState('All');

    const handleSearch = (results, query) => {
        console.log('Received results in handleSearch:', results);
        
        if (results?.body?.hits?.hits) {
            setSearchResults(results.body.hits.hits);
            setQuery(query);
        } else {
            console.error("Unexpected results format:", results);
        }
    };

    useEffect(() => {
        console.log('Updated searchResults:', searchResults);
    }, [searchResults]);

    // Extract unique values for filters
    const getUniqueValues = (key) => {
        const values = searchResults.map(result => result._source[key]).flat();
        return [...new Set(values)];
    };

    const owners = getUniqueValues('current_owner');
    const lawFirms = getUniqueValues('law_firm');
    const attorneys = getUniqueValues('attorney_name');
    const statuses = getUniqueValues('status_type');

    // Function to filter search results based on selected filters
    const applyFilters = () => {
        return searchResults.filter((result) => {
            const { current_owner, law_firm, attorney_name, status_type } = result._source;
            
            // Apply owner filter
            const ownerFilter = selectedOwners.length === 0 || selectedOwners.includes(current_owner);
            // Apply law firm filter
            const lawFirmFilter = selectedLawFirms.length === 0 || selectedLawFirms.includes(law_firm);
            // Apply attorney filter
            const attorneyFilter = selectedAttorneys.length === 0 || selectedAttorneys.includes(attorney_name);
            // Apply status filter
            const statusFilter = activeStatus === 'All' || status_type === activeStatus;
            
            return ownerFilter && lawFirmFilter && attorneyFilter && statusFilter;
        });
    };

    // Get the filtered results
    const filteredResults = applyFilters();

    return (
        <div className="container mx-auto">
            <Header onSearch={handleSearch} />
            <div className="mt-8 flex">
                <div className="w-3/4 pr-6">
                    {filteredResults.length > 0 ? (
                        <TrademarkList results={filteredResults} query={query} />
                    ) : (
                        <p className="text-gray-700 ml-4">No search results yet. Please perform a search.</p>
                    )}
                </div>
                <div className="w-1/4 ml-6 px-2">
                    {searchResults.length > 0 && (
                        <Sidebar
                            owners={owners}
                            lawFirms={lawFirms}
                            attorneys={attorneys}
                            statuses={statuses}
                            selectedOwners={selectedOwners}
                            setSelectedOwners={setSelectedOwners} // Pass the state setters to Sidebar
                            selectedLawFirms={selectedLawFirms}
                            setSelectedLawFirms={setSelectedLawFirms}
                            selectedAttorneys={selectedAttorneys}
                            setSelectedAttorneys={setSelectedAttorneys}
                            activeStatus={activeStatus}
                            setActiveStatus={setActiveStatus}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;
