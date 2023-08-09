import React, { useState } from "react";
import "./Search.scss";

const Search = ({ searchFilter }) => {
  return (
    <form className="search">
      <input
        type="search"
        placeholder="Search notes..."
        className="search-input"
        onChange={searchFilter}
      />
    </form>
  );
};

export default Search;
