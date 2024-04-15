import axios from "axios";
import { Loader } from "components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "store/reducers/characters";

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const CharacterDetail = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<Character>();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [movies, setMovies] = useState<string[]>([]);

  const fetchMovies = () => {
    const urls = character?.films;
    if (urls?.length) {
      Promise.allSettled(
        urls.map((url) => axios.get(url).then((res) => res.data))
      )
        .then((res) => {
          const movies = res
            .filter((i) => i.status === "fulfilled")
            .map((item: any) => item.value?.title);
          setMovies(movies);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/" + params.id)
      .then((res) => {
        const character = res.data;
        if (character) {
          setCharacter(character);
          return axios.get(character.homeworld);
        } else throw new Error("Error");
      })
      .then((res) => {
        setPlanet(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (character) fetchMovies();
  }, [character]);

  if (isLoading) return <Loader />;
  return (
    <div className="bg-light p-4 rounded mt-3">
      <div className="d-flex">
        <h1>
          <b>{character?.name}</b>
        </h1>
        <div className="mt-3 ms-3">
          <i>{`(${character?.gender})`}</i>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <b>Hair Color - {character?.hair_color}</b>
        </div>
        <div>
          <b>Eye Color - {character?.eye_color}</b>
        </div>

        {planet && (
          <div className="row">
            <h4 className="col-12 mt-4 border-bottom pb-2">
              <b>Planet - {planet?.name}</b>
            </h4>
            <div className="col-12 col-md-4">
              Rotation Period - {planet?.rotation_period}
            </div>
            <div className="col-12 col-md-4">
              Orbital Period - {planet?.orbital_period}
            </div>
            <div className="col-12 col-md-4">Diameter - {planet.diameter}</div>
            <div className="col-12 col-md-4">climate - {planet.climate}</div>
            <div className="col-12 col-md-4">Gravity - {planet.gravity}</div>
            <div className="col-12 col-md-4">terrain - {planet.terrain}</div>
            <div className="col-12 col-md-4">
              surface_water - {planet.surface_water}
            </div>
            <div className="col-12 col-md-4">
              population - {planet.population}
            </div>
          </div>
        )}

        <h4 className="col-12 mt-4 border-bottom pb-2">
          <b>Movies</b>
        </h4>
        {movies.map((movie, i) => (
          <div key={i}>{movie}</div>
        ))}
      </div>
    </div>
  );
};

export default CharacterDetail;
