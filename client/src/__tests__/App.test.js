import React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";

test("renders app component", () => {
  const { getByText } = render(<App />);
  const element = getByText(/Loading/i);
  expect(element).toBeInTheDocument();
});
