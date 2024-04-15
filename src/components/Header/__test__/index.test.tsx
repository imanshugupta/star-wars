import { render, screen } from "@testing-library/react";
import { Header } from "..";

describe("<Header />", () => {
  test("renders the Star Wars logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/star-wars-logo.png");
    expect(logo).toHaveAttribute("height", "100");
  });

  test("match the snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
