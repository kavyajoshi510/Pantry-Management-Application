// components/Search.js
import { TextField } from '@mui/material';

const Search = ({ searchTerm, onSearch }) => {
  return (
    <TextField
      label="Search Items"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;
