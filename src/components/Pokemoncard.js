import React, {useEffect, useState} from 'react';
import axios from "axios";

function Pokemoncard({cardUrl}) {
    const [pokemonCardData, setPokemonCardData] = useState([]);

    async function getPokemonCardData(cardUrl) {
        try {
            const result = await axios.get(cardUrl);
            setPokemonCardData(result.data);
            // console.log(result.data.abilities)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPokemonCardData(cardUrl);
    }, []);

    useEffect(() => {
        getPokemonCardData(cardUrl);
    }, [cardUrl]);

    return (
        <>
            {pokemonCardData.name && <div className="pokemon-card">
                <h2>{pokemonCardData.name}</h2>
                <img src={pokemonCardData.sprites.front_default} alt={pokemonCardData.name} width="150px"/>
                <p className="pokemon-card-text">Moves: {pokemonCardData.moves.length}</p>
                <p className="pokemon-card-text">Weight: {pokemonCardData.weight}</p>
                <p className="pokemon-card-text">Abilities:</p>
                {pokemonCardData.abilities.map((ability) => {
                    // console.log(ability.ability.name);
                    return <span className="pokemon-card-ability">{ability.ability.name}</span>
                })}
            </div>}
        </>
    );
}

export default Pokemoncard;