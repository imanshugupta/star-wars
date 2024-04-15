import { render } from "@testing-library/react";
import { Loader } from "..";

describe("<Loader />", () => {
  test("match the snapshot", () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
