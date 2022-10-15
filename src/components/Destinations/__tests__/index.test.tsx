import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Destinations from "..";
import userEvent from "@testing-library/user-event";

describe("Destinations", () => {
  afterEach(() => {
    // cleanup on exiting
    jest.clearAllMocks();
  });

  test("On initial load, loader is displayed", () => {
    render(<Destinations />);
    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  test("renders trendingDestinations list", async () => {
    render(<Destinations />);

    await waitFor(() => {
      const trendingDestination = screen.getAllByRole("list")[0];
      expect(trendingDestination).toBeInTheDocument();
    });
  });

  test("renders favourites list", async () => {
    render(<Destinations />);

    await waitFor(() => {
      const favouritesList = screen.getAllByRole("list")[1];
      expect(favouritesList).toBeInTheDocument();
    });
  });

  test("render the initial no favourites text", async () => {
    render(<Destinations />);

    await waitFor(() => {
      const initialFavouritesText = screen.getByText(
        /Nothing added to your list yet/i
      );
      expect(initialFavouritesText).toBeInTheDocument();
    });
  });

  test("renders correct flight list data", async () => {
    render(<Destinations />);

    await waitFor(() => {
      const Gwenborough = screen.getByText(/Gwenborough/i);
      expect(Gwenborough).toBeInTheDocument();
    });
  });

  test("When we select a trending destination then it gets added to our favourites list", async () => {
    render(<Destinations />);

    const Gwenborough = await waitFor(() => screen.findByText(/Gwenborough/i));
    userEvent.click(Gwenborough);

    const favouritesList = screen.getAllByRole("list")[1];
    expect(favouritesList).toHaveTextContent("Gwenborough");
  });
});
