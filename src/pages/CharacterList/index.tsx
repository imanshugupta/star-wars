import { Loader } from "components/Loader";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Character,
  characterSelector,
  fetchData,
} from "store/reducers/characters";
import { Badge, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const CharacterList = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { characters, isLoading, error, previous, next, totalPages, page } =
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
    <div className="text-light">
      <div className="list-view">
        <div className="row font-bold">
          <div className="col-1">#</div>
          <div className="col-md-4 col-6">Name</div>
          <div className="col-md-2 col-3">Gender</div>
          <div className="col d-none d-md-block">Home Planet</div>
          <div className="col-md-1 col-2 text-center">Action</div>
        </div>
        {characters.map((character, i) => (
          <div className="row list-item" key={i}>
            <div className="col-1">{i + 1}</div>
            <div className="col-md-4 col-6">{character.name}</div>
            <div className="col-md-2 col-3">{character.gender} </div>
            <div className="col d-none d-md-block">{character.homeworld}</div>
            <div className="col-md-1 col-2 text-center">
              <b
                role="button"
                className="text-danger"
                onClick={() => handleViewClick(character)}
                style={{ fontSize: "18px" }}
              >
                {">>"}
              </b>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex">
        <Button
          className="ms-4"
          color="danger"
          size="sm"
          disabled={!previous}
          onClick={() => handlePrevNext(false)}
        >
          Prev
        </Button>
        <Button
          className="ms-3"
          color="danger"
          size="sm"
          disabled={!next}
          onClick={() => handlePrevNext(true)}
        >
          Next
        </Button>
        <div className="ms-auto">
          <Badge color="dark">
            {page}/{totalPages} page
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
