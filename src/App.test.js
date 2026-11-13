import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import HeaderSlider from "./pages/HeaderSlider/HeaderSlider";
import languageReducer from "./features/language/languageSlice";
import Logo from "./components/Logo/Logo";

describe("homepage hero", () => {
  it("renders FITS Finance messaging and primary navigation", () => {
    const store = configureStore({
      reducer: { language: languageReducer },
      preloadedState: { language: { lang: "en" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <>
            <Logo />
            <HeaderSlider />
          </>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole("img", { name: "FITS Finance" }).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /make room for what's next/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore financing/i })).toHaveAttribute(
      "href",
      "/apply-now"
    );
    expect(
      screen.getByRole("link", { name: /try the calculator/i })
    ).toHaveAttribute("href", "/loan-calculator");
  });
});
