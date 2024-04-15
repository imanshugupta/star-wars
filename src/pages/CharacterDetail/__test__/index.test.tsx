/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CharacterDetail from "..";

const axios = require("axios");

jest.mock("axios", () => ({
  get: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<CharacterDetail />", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "Luke Skywalker",
        gender: "male",
        hair_color: "blond",
        eye_color: "blue",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [
          "https://swapi.dev/api/films/1/",
          "https://swapi.dev/api/films/2/",
        ],
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        name: "Tatooine",
        rotation_period: "23",
        orbital_period: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surface_water: "1",
        population: "200000",
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        title: "A New Hope",
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        title: "The Empire Strikes Back",
      },
    });
  });

  test("renders loader while fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/characters/1"]}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders character details", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/characters/1"]}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
      expect(screen.getByText("(male)")).toBeInTheDocument();
      expect(screen.getByText("Hair Color - blond")).toBeInTheDocument();
      expect(screen.getByText("Eye Color - blue")).toBeInTheDocument();
    });
  });

  test("renders planet details", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/characters/1"]}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Planet - Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Rotation Period - 23")).toBeInTheDocument();
      expect(screen.getByText("Orbital Period - 304")).toBeInTheDocument();
      expect(screen.getByText("Diameter - 10465")).toBeInTheDocument();
      expect(screen.getByText("climate - arid")).toBeInTheDocument();
      expect(screen.getByText("Gravity - 1 standard")).toBeInTheDocument();
      expect(screen.getByText("terrain - desert")).toBeInTheDocument();
      expect(screen.getByText("surface_water - 1")).toBeInTheDocument();
      expect(screen.getByText("population - 200000")).toBeInTheDocument();
    });
  });

  test("renders movies", async () => {
    await act(() => {
      render(
        <MemoryRouter initialEntries={["/characters/1"]}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Movies")).toBeInTheDocument();
      expect(screen.getByText("A New Hope")).toBeInTheDocument();
      expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    });
  });
});
