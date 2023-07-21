import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import {Pagination, PaginationItem} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from "./SearchBar";



function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1);

  const navigate = useNavigate();


  async function fetchPokemonData() {
    try {
      setIsLoading(true);
      const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=".concat((page - 1) * 10);
      const response = await fetch(url);
      const pokemonData = await response.json();
      setData(pokemonData.results);
      setTotalCount(pokemonData.count);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  },[page])

  function handleChange(event, value)
  {
    setPage(value);
  }

  function handlePokemonClick(event)
  {
    // console.log(event);
    const url = "/details/".concat(event.target.id)
    navigate(url)
  }

  return (
    <div>
    <SearchBar />
    <Stack spacing={2} alignItems={'center'}>
      <Typography style={{color: '#b3b3b3'}}>Page: {page}</Typography>
      <Pagination count={Math.floor(totalCount / 10)} page={page} onChange={handleChange} 
          renderItem={(item) => (
          <PaginationItem
            style={{
                color: item.page === page ? '#212121' : '#b3b3b3',
                border: item.page !== page ? '1px solid #b3b3b3' : 'none',
                backgroundColor: item.page === page ? '#1db954' : 'transparent',
                '&:hover': {
                  backgroundColor: item.page === page ? '#1db954' : 'transparent',
                },
              }}
            {...item}
          />
        )}
      />
    </Stack>
    <Grid container spacing={2} style={{padding: '1%'}} justifyContent={'center'} alignItems={'center'} display={'flex'}>
    {
        !isLoading &&
        (
            data.map((item, index) => (
                <Grid item xs={3}>
                    <Card variant="outlined" sx={{'&:hover': {boxShadow: '0px 0px 50px 10px rgba(0, 0, 0, 0.2)'}, borderRadius: '10%', padding:'1%', backgroundColor: '#535353'}}>
                      <Typography style={{textAlign : 'center', verticalAlign: 'center'}}>                            <img 
                            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'.concat((10 * (page - 1) + index + 1)).concat('.png')} 
                            alt='pokemon'
                            width={'280px'}
                            height={'280px'}></img></Typography>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{textAlign : 'center', textTransform: 'uppercase', color: '#b3b3b3', fontFamily: "'Courier New', monospace"}}>
                                {item.name}
                            </Typography>
                            <Typography style={{textAlign : 'center'}}><Button variant="contained" onClick={handlePokemonClick} id={item.name} style={{backgroundColor: '#121212'}}>Get Details</Button></Typography>
                            </CardContent>
                    </Card>
                </Grid>
            ))
        )
    }
    </Grid>

    </div>
  );
}

export default Home;
