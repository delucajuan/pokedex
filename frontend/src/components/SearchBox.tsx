'use client';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import usePokemonNames from '@/hooks/usePokemonNames';

// Styled search component
const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: 500,
}));

function SearchBox() {
  const [searchValue, setSearchValue] = useState(''); // Search input value
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue); // Debounced search value
  const [searchResult, setSearchResult] = useState<string[]>([]); // Autocomplete names options

  const router = useRouter();
  const searchParams = useSearchParams();
  const nameParam = searchParams.get('name');
  const name = nameParam ? decodeURIComponent(nameParam) : undefined;
  const { data: autocompleteData } = usePokemonNames({
    limit: 6,
    searchValue: debouncedSearchValue,
  });
  const MAX_SEARCH_LENGTH = 50;

  // Update search value based on URL search parameters
  useEffect(() => {
    if (name) {
      setSearchValue(name);
    } else {
      setSearchValue('');
      setSearchResult([]);
    }
  }, [name]);

  // Update search results when autocomplete data changes
  useEffect(() => {
    if (autocompleteData) {
      setSearchResult(autocompleteData);
    }
  }, [autocompleteData]);

  // Debounce search value updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms delay

    // Cleanup the timeout if searchValue changes before 300ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const handleInputChange = (_event: SyntheticEvent, newInputValue: string) => {
    // Enforce character limit
    if (newInputValue.length > MAX_SEARCH_LENGTH) {
      newInputValue = newInputValue.slice(0, MAX_SEARCH_LENGTH);
    }
    setSearchValue(newInputValue);

    // Clear search results to close the autocomplete if input is empty
    if (newInputValue.trim() === '') {
      setSearchResult([]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.trim()) {
      router.push(`/?name=${encodeURIComponent(searchValue)}`);
    }
  };

  // Handler for selecting a Pokémon name from the autocomplete options
  const handleNameSelect = (_event: SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      router.push(`/${newValue}`);
    }
  };

  return (
    <Search onSubmit={handleSubmit}>
      <Autocomplete
        freeSolo
        sx={{ padding: 0 }}
        options={searchResult}
        getOptionLabel={(result) => result}
        getOptionKey={(result) => result}
        inputValue={searchValue}
        onInputChange={handleInputChange}
        onChange={handleNameSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                paddingY: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiButtonBase-root': {
                color: 'inherit',
              },
            }}
          />
        )}
      />
    </Search>
  );
}

export default SearchBox;
