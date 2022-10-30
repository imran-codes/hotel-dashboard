import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import ReactQueryDestinations from "..";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";

describe("ReactQueryDestinations", () => {
  afterEach(() => {
    // cleanup on exiting
    cleanup();
    jest.clearAllMocks();
  });

  test("On initial load, loader is displayed", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );
    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });

  test("renders trendingReactQueryDestinations list", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const trendingDestination = screen.getAllByRole("list")[0];
      expect(trendingDestination).toBeInTheDocument();
    });
  });

  test("renders favourites list", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const favouritesList = screen.getAllByRole("list")[1];
      expect(favouritesList).toBeInTheDocument();
    });
  });

  test("render the initial no favourites text", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const initialFavouritesText = screen.getByText(
        /Nothing added to your list yet/i
      );
      expect(initialFavouritesText).toBeInTheDocument();
    });
  });

  test("renders correct flight list data", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const Gwenborough = screen.getByText(/Gwenborough/i);
      expect(Gwenborough).toBeInTheDocument();
    });
  });

  test("When we select a trending destination then it gets added to our favourites list", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ReactQueryDestinations />
      </QueryClientProvider>
    );

    const Gwenborough = await waitFor(() => screen.findByText(/Gwenborough/i));
    userEvent.click(Gwenborough);

    const favouritesList = screen.getAllByRole("list")[1];
    expect(favouritesList).toHaveTextContent("Gwenborough");
  });
});
