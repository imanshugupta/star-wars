import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

test("renders without fail", () => {
  const store = mockStore({
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
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
});
