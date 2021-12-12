import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Pokemoncard from "./components/Pokemoncard";


function App() {

    const [pokemonData, setPokemonData] = useState([]);
    const [pageUrl, setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

    async function getPokemonData() {
        try {
            const result = await axios.get(pageUrl);
            setPokemonData(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPokemonData();
    }, []);

    useEffect(() => {
        getPokemonData();
    }, [pageUrl])

    return (
        <>

            <h1>Pokemon app</h1>
            <div className="pokemon-button-wrapper">
                <button className="pokemon-button" onClick={() =>
                    setPageUrl(pokemonData.previous)}
                        disabled={pokemonData.previous === null}>
                    Previous
                </button>
                <button className="pokemon-button" onClick={() =>
                    setPageUrl(pokemonData.next)}>
                    Next
                </button>
            </div>
            <section className="pokemon-overview">
                {pokemonData.count &&
                    pokemonData.results.map((pokemon) => {
                        return <Pokemoncard cardUrl={pokemon.url} key={pokemon.id} />
                    })
                }
            </section>

        </>
    );
}

export default App;
