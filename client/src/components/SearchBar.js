import React, { useState } from "react";
import "./SearchBar.css";
import SearchResult from "./searchResult";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";


function SearchBar() {


  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [resultList, setResultList] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

  };


// console.log(wordEntered)

  return (
    <div className="search">
      <div className="searchInputs">
        <input
         id="search-input"
          type="text"
          placeholder="Anything in your mind?"
          value={wordEntered}
          onChange={handleFilter}
        />
        
        <Link to={{
              pathname: `/search/${wordEntered}`,
            }} component={SearchResult} className="button">
            Search
        </Link>
        
      </div>

    </div>
  );
}

export default SearchBar;