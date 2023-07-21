import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from "@mui/material/LinearProgress";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Pokemon() {
  const { pokemonName } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [stats, setStats] = useState([]);
  const [species, setSpecies] = useState();
  const [pokeId, setPokeId] = useState();

  const goBack = () => {
    navigate("/");
  };

  async function fetchPokemonData() {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/".concat(pokemonName);
      const response = await fetch(url);
      const pokemonData = await response.json();
      setDetails(pokemonData);
      setSpecies(pokemonData.species.name);
      setStats(pokemonData.stats)
      setPokeId(pokemonData.id)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  },[])

  return (
    <div>
      <Typography variant="h1" component="h3" color="primary" style={{textAlign : 'center', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', color: '#b3b3b3'}}>{pokemonName}</Typography>
      <Grid container>
        <Grid item xs={4} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          <Typography style={{textAlign : 'center', verticalAlign: 'center'}}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`.concat(pokeId).concat('.png')} height={"300px"} alt="Pokemon"/>
          </Typography>
        </Grid>
        <Grid item xs={3} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          <Card style={{padding: '10%', color: '#1db954', backgroundColor:'#212121', boxShadow: '0px 0px 0px 4px rgba(179, 179, 179, 1)'}}>
            <Typography gutterBottom variant="h5" color= "#b3b3b3" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    Base Experience
                    </Typography>
                    <Typography gutterBottom variant="h5" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    {details.base_experience}
                    </Typography>
                    <Typography gutterBottom variant="h5" color= "#b3b3b3" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    Height
                    </Typography>
                    <Typography gutterBottom variant="h5" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    {details.height}
                    </Typography>
                    <Typography gutterBottom variant="h5" color= "#b3b3b3" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    Weight
                    </Typography>
                    <Typography gutterBottom variant="h5" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    {details.weight}
                    </Typography>
                    <Typography gutterBottom variant="h5" color= "#b3b3b3" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    Species
                    </Typography>
                    <Typography gutterBottom variant="h5" style={{textAlign : 'center', fontFamily: 'monospace'}}>
                    {species}
                    </Typography>
          </Card>
 
        </Grid>
        <Grid item xs={5} padding={'3%'}>
                    {
                      stats.map((item) => (
                        <>
                        <Typography variant="h5" style={{ color: '#b3b3b3', textTransform: 'uppercase', fontFamily: 'monospace'}}>{item.stat.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" color="secondary" value={item.base_stat} style={{height: "20px"}} classes={{bar: 'backgroundColor: "#1db954"'}}/>
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="h5" style={{ color: '#1db954', fontFamily: 'monospace'}}>{item.base_stat}</Typography>
                          </Box>
                        </Box>
                        </>

                      ))
                    }
        </Grid>

      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button variant="contained" onClick={goBack} style={{backgroundColor: '#121212', alignSelf: 'center', fontFamily: 'monospace'}}>Go Back</Button>
      </div>
      
    </div>
  );
}

export default Pokemon;
