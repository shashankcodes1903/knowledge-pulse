import "@testing-library/jest-dom/vitest";
import { webcrypto } from "node:crypto";

if (!globalThis.crypto?.subtle) {
  // @ts-expect-error polyfill webcrypto in jsdom
  globalThis.crypto = webcrypto;
}