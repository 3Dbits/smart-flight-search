import { describe, it, expect } from "vitest";
import { flightSearchSchema } from "../src/validators/flightSearchSchema";

describe("flightSearchSchema", () => {
  it("should validate correct input", () => {
    const validData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2026-10-10",
      returnDate: "2026-10-15",
      adults: "2",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should invalidate incorrect departure date format", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "10-10-2026",
      returnDate: "2026-10-15",
      adults: "2",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Departure date must be in YYYY-MM-DD format"
    );
  });

  it("should invalidate past departure date", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2020-10-10",
      returnDate: "2023-10-15",
      adults: "2",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Departure date must be today or in the future"
    );
  });

  it("should invalidate incorrect return date format", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2026-10-10",
      returnDate: "10-15-2026",
      adults: "2",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Arrival date must be in YYYY-MM-DD format"
    );
  });

  it("should invalidate past return date", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2026-10-10",
      returnDate: "2023-10-15",
      adults: "2",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Arrival date must be today or in the future"
    );
  });

  it("should invalidate incorrect number of adults", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2026-10-10",
      returnDate: "2026-10-15",
      adults: "10",
      currencyCode: "USD",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Number of adults must be a single digit between 1 and 9"
    );
  });

  it("should invalidate incorrect currency code", () => {
    const invalidData = {
      origin: "JFK",
      destination: "LAX",
      departureDate: "2026-10-10",
      returnDate: "2026-10-15",
      adults: "2",
      currencyCode: "US",
    };
    const result = flightSearchSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Currency must be a 3-letter code (e.g. USD)"
    );
  });
});
