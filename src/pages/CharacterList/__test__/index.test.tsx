/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CharacterList from "..";
import { fetchData } from "store/reducers/characters"; // Adjust the import path

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("store/reducers/characters", () => ({
  ...jest.requireActual("store/reducers/characters"),
  fetchData: jest.fn(),
}));

const mockStore = configureStore();

describe("<CharacterList />", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      characters: {
        characters: [
          {
            name: "Luke Skywalker",
            gender: "male",
            homeworld: "Tatooine",
            url: "https://swapi.dev/api/people/1/",
            films: ["hello world", "haanji"],
          },
        ],
        isLoading: false,
        error: null,
        previous: true,
        next: true,
      },
    });
  });

  test("renders characters list", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    // expect(
    //   screen.getByText("https://swapi.dev/api/people/1/")
    // ).toBeInTheDocument();
  });

  test("renders loader while fetching data", () => {
    store = mockStore({
      characters: {
        characters: [],
        isLoading: true,
        error: null,
        previous: null,
        next: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message if there is an error", () => {
    store = mockStore({
      characters: {
        characters: [],
        isLoading: false,
        error: "Error fetching characters",
        previous: null,
        next: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Error fetching characters")).toBeInTheDocument();
  });

  test("navigates to character detail page on view click", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText(">>"));
    });

    expect(navigate).toHaveBeenCalledWith("/character-detail/1");
  });

  test("calls handlePrevNext on prev and next button click", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Prev"));
      fireEvent.click(screen.getByText("Next"));
    });

    expect(fetchData).toHaveBeenCalledTimes(2);
    expect(fetchData).toHaveBeenCalledWith(false);
    expect(fetchData).toHaveBeenCalledWith(true);
  });
});
