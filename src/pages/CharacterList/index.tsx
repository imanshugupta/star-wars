import { Loader } from "components/Loader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Character,
  characterSelector,
  fetchData,
} from "store/reducers/characters";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const CharacterList = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { characters, isLoading, error, previous, next } =
    useSelector(characterSelector);

  useEffect(() => {
    if (!characters.length) dispatch(fetchData(true));
  }, [dispatch]);

  const handlePrevNext = (next: boolean) => {
    dispatch(fetchData(next));
  };
  const handleViewClick = (character: Character) => {
    const id = character.url
      ?.split("https://swapi.dev/api/people/")[1]
      ?.split("/")[0];

    navigate("/character-detail/" + id);
  };

  if (isLoading) return <Loader />;
  else if (error) return <div>{error}</div>;

  return (
    <div>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Gender </th>
            <th>Home Planet </th>
            <th>Suffice </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{character.name}</td>
              <td>{character.gender} </td>
              <td>{character.homeworld}</td>
              <td>{character.url} </td>
              <td>
                <Button
                  color="success"
                  size="sm"
                  onClick={() => handleViewClick(character)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-4 text-center">
        <Button
          color="primary"
          disabled={!previous}
          onClick={() => handlePrevNext(false)}
        >
          Prev
        </Button>
        <Button
          className="ms-3"
          color="primary"
          disabled={!next}
          onClick={() => handlePrevNext(true)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CharacterList;
