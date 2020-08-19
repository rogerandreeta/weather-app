import React from "react";

const SearchBox = ({ value, onChange }) => {
  
  return ( 
        <input
          type="text"
          name="query"
          className="form-control my-3"
          placeholder="Type an Australian city.."
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
  );
};

export default SearchBox;
