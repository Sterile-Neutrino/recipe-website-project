import React, { useState } from "react";
import "./SearchBar.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function SearchBar() {

  const list=[
    {id:1, datas: "abc"},
    {id:1, datas: "abcde"},
    {id:1, datas: "ccc"},
    {id:1, datas: "fcc"},
    {id:1, datas: "fff"},
  ]

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    //axios.post("http://localhost:4000/recipe/search", searchWord)
   // .then((res) => {
      const newFilter = list.filter((value) => {
        //get the title containnig this searchWord
        return value.datas.includes(searchWord)//.title.toLowerCase().includes(searchWord.toLowerCase());
     });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        //Set up array of cooresponding titles
        setFilteredData(newFilter);
      }

   // })  
  };



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
        
        <button className="button" type="button" >
                        Search
                    </button>
        
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link component={Link} to="/RecipePage" className="dataItem"  target="_blank">
                <p>{value.datas} </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;