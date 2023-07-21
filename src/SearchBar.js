import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';




function SearchBar()
{
    const [pokemon, setPokemon] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    async function fetchPokemonName() {
        try {
          const url = "https://pokeapi.co/api/v2/pokemon?limit=10271";
          const response = await fetch(url);
          const pokemonData = await response.json();
          setData(pokemonData.results);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchPokemonName();
      },[])

      function handleChange(event, value)
      {
        setPokemon(value)
      }
      function getDetails()
      {
        const url = "/details/".concat(pokemon)
        navigate(url)
      }


      return(
        <Stack spacing={1} alignItems={'center'} margin={'25px'}>
            <Autocomplete
                // componentsProps={{ popper: { style: { width: '500px' } } }}
                freeSolo
                id="searchBar"
                disableClearable
                options={data.map((option) => option.name)}
                onChange={handleChange}
                renderOption={(props, option) => {
                  return (
                    <span {...props} 
                    // style={{ backgroundColor: '#535353', color: '#b3b3b3', textTransform: 'uppercase', marginTop: '0px', padding: '2%'}}
                    sx={{
                    backgroundColor: '#535353',
                    color: '#b3b3b3',
                    textTransform: 'uppercase',
                    marginTop: '0px',
                    padding: '2%',
                    '&:hover': {
                      backgroundColor: '#f1f1f1', // Change the background color when hovered
                      color: '#000000', // Change the text color when hovered
                    },
                  }}
                    >
                     {option}
                    </span>
                  );
                }}
                renderInput={(params) => (
                <TextField
                style={{ backgroundColor: '#535353', color: '#b3b3b3', textTransform: 'uppercase', width: '500px'}}
                    {...params}
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: {
                      color: '#b3b3b3',
                      textTransform: 'uppercase'
                    },
                    }}
                />
                )}
            />
            <Button variant='contained' onClick={getDetails} style={{backgroundColor: '#535353', color: '#b3b3b3'}}>Search</Button>
        </Stack>

      )
}

export default SearchBar;