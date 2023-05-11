import Search from "../components/Search";
import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";

describe("Test filter options in search compontents", () => {
  test("Checks if search filter radio is set to default 'all' ", () => {
    render(<Search />);
    const allRadio = screen.getByTestId("all");
    expect(allRadio).toHaveAttribute("checked");
  });

  test("Test if search filter radios are switching on click", () => {
    render(<Search />);

    const movieRadio = screen.getByTestId("movie");
    const allRadio = screen.getByTestId("all");
    const podcastRadio = screen.getByTestId("podcast");
    const audioBookRadio = screen.getByTestId("audiobook");
    const shortFilmRadio = screen.getByTestId("shortFilm");
    const tvShowRadio = screen.getByTestId("tvShow");
    const eBookRadio = screen.getByTestId("ebook");

    expect(movieRadio).not.toHaveAttribute("checked");

    fireEvent.click(movieRadio);

    expect(movieRadio).toHaveAttribute("checked");
    expect(allRadio).not.toHaveAttribute("checked");
    expect(podcastRadio).not.toHaveAttribute("checked");
    expect(audioBookRadio).not.toHaveAttribute("checked");
    expect(shortFilmRadio).not.toHaveAttribute("checked");
    expect(audioBookRadio).not.toHaveAttribute("checked");
    expect(eBookRadio).not.toHaveAttribute("checked");
    expect(tvShowRadio).not.toHaveAttribute("checked");
  });
});
