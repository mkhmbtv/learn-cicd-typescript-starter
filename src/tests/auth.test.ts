import { describe, it, expect } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("returns null when no authorization header is present", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header is empty", () => {
    const headers: IncomingHttpHeaders = { authorization: "" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header does not start with ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when authorization header is just 'ApiKey' with no key", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns the API key when a valid ApiKey header is provided", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-test-key");
  });

  it("returns only the first token after ApiKey prefix, ignoring extra parts", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey key1 key2 key3",
    };
    expect(getAPIKey(headers)).toBe("key1");
  });
});
