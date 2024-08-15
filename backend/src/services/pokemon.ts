import {
  GetAllPokemonProps,
  PokeApiPokemonList,
  PokeApiPokemon,
  PokeApiTypes,
} from "../types/types";
import { formatPokemonData } from "../utils/formatPokemonData";
import { handleAxiosError } from "../utils/errorHandler";
import axiosInstance from "../config/axiosConfig";

const getAllpokemon = async ({ page, limit, type }: GetAllPokemonProps) => {
  const offset = limit !== undefined ? (page - 1) * limit : 0;

  try {
    if (type) {
      const pokemonByType = (await axiosInstance.get<PokeApiTypes>(`/type/${type}`)).data.pokemon;

      if (!pokemonByType?.length) {
        return { data: [], total: 0 };
      }
      const detailedData = await Promise.all(
        pokemonByType.map(
          async ({ pokemon }) => (await axiosInstance.get<PokeApiPokemon>(pokemon.url)).data
        )
      );

      const formattedData = formatPokemonData(detailedData);

      return { data: formattedData, total: pokemonByType.length };
    }

    const pokemonData = (
      await axiosInstance.get<PokeApiPokemonList>(`/pokemon?limit=${limit}&offset=${offset}`)
    ).data;

    const detailedData = await Promise.all(
      pokemonData.results.map(
        async (pokemon) => (await axiosInstance.get<PokeApiPokemon>(pokemon.url)).data
      )
    );

    const formattedData = formatPokemonData(detailedData);

    return { data: formattedData, total: pokemonData.count };
  } catch (error) {
    handleAxiosError(error);
  }
};

export default { getAllpokemon };
