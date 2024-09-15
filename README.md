# Trademark Search Application

This is a React and Express-based application designed to search trademarks. It utilizes a backend server to forward search queries to an external trademark API and displays the results on a web frontend. The application includes features for filtering search results and displaying suggestions.

## Features

- **Search Trademarks**: Enter a trademark query and get search results from the external API.
- **Filtering**: Filter results based on owners, law firms, attorneys, and status.
- **Suggestions**: Get search suggestions based on the entered query.
- **Error Handling**: Display error messages if no results are found or if there is an issue with the search.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)


## Project Structure

- **`server/`**: Contains the Express server code.
  - `server.js`: Sets up the Express server, handles API requests, and forwards them to the external trademark API.
  
- **`client/`**: Contains the React frontend code.
  - `src/`:
    - `components/Header.js`: The header component that handles search input and error modals.
    - `components/Main.js`: Main component that integrates the header, sidebar, and trademark list.
    - `components/Sidebar.js`: Sidebar component for filtering and additional features.
    - `components/SearchResults.js`: Displays search results and suggestions.
    - `components/TrademarkList.js`: Lists the trademark results.

## Usage

1. **Perform a search**: Enter a trademark query in the search input on the frontend and click "Search".
2. **Filter results**: Use the sidebar to apply filters based on owners, law firms, attorneys, and status.
3. **View suggestions**: Get search suggestions based on your query.


