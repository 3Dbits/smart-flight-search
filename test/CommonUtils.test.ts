import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatDuration,
  getCurrentDay,
  stripTime,
} from "../src/utils/CommonUtils";

describe("CommonUtils", () => {
  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = "2023-10-05T14:48:00.000Z";
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("05/10/2023 16:48"); // local date from UTC time
    });
  });

  describe("getCurrentDay", () => {
    it("should return current day in YYYY-MM-DD format", () => {
      const currentDay = getCurrentDay();
      const expectedDay = new Date().toISOString().split("T")[0];
      expect(currentDay).toBe(expectedDay);
    });
  });

  describe("formatDuration", () => {
    it("should format duration with hours and minutes", () => {
      const duration = "PT2H30M";
      const formattedDuration = formatDuration(duration);
      expect(formattedDuration).toBe("2h 30min");
    });

    it("should format duration with hours only", () => {
      const duration = "PT2H";
      const formattedDuration = formatDuration(duration);
      expect(formattedDuration).toBe("2h 0min");
    });

    it("should return empty string for invalid duration format", () => {
      const duration = "2H30M";
      const formattedDuration = formatDuration(duration);
      expect(formattedDuration).toBe("");
    });
  });

  describe("stripTime", () => {
    it("should strip time from date", () => {
      // 2023-10-05T14:48:00.000Z to be  2023-10-05
      const date = new Date("2023-10-05T14:48:00.000Z");
      const strippedDate = stripTime(date);
      const expectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      expect(strippedDate).toEqual(expectedDate);
    });
  });
});
