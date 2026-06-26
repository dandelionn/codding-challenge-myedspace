/// <reference types="vitest/globals" />
import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import { handlers } from "./src/mocks/handlers";
import { setDemoAuthenticated } from "./src/mocks/api/demo-session";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  setDemoAuthenticated(false);
});

afterAll(() => {
  server.close();
});
