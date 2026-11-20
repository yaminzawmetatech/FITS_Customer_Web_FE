import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import NavGroup from "./NavGroup";

vi.mock("./NestedMenuItem", () => ({
  default: ({ menuItem }) => <div>{menuItem.title}</div>,
}));

describe("dashboard navigation groups", () => {
  it("omits menu entries marked for temporary hiding", () => {
    const store = configureStore({
      reducer: { menu: () => ({ drawerOpen: true }) },
    });

    render(
      <Provider store={store}>
        <NavGroup
          item={{
            id: "system",
            title: "Management",
            children: [
              { id: "available", title: "Available page" },
              {
                id: "unfinished",
                title: "Unfinished page",
                temporarilyHidden: true,
              },
            ],
          }}
        />
      </Provider>
    );

    expect(screen.getByText("Available page")).toBeInTheDocument();
    expect(screen.queryByText("Unfinished page")).not.toBeInTheDocument();
  });
});
