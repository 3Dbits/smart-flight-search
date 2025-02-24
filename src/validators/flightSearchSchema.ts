import { stripTime } from "@/utils/CommonUtils";
import { z } from "zod";

const currencyRegex = /^[A-Z]{3}$/;

// ISO 8601 date format regex (YYYY-MM-DD)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const numberRegex = /^[1-9]$/;

export const flightSearchSchema = z.object({
  origin: z
    .string()
    .min(3, "Origin must be at least 3 characters")
    .max(3, "Origin must be exactly 3 characters")
    .toUpperCase(),

  destination: z
    .string()
    .min(3, "Destination must be at least 3 characters")
    .max(3, "Destination must be exactly 3 characters")
    .toUpperCase(),

  departureDate: z
    .string()
    .regex(dateRegex, "Departure date must be in YYYY-MM-DD format")
    .refine((date) => {
      const selectedDate = stripTime(new Date(date));
      const today = stripTime(new Date());
      return selectedDate >= today;
    }, "Departure date must be today or in the future"),

  returnDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || dateRegex.test(val),
      "Arrival date must be in YYYY-MM-DD format"
    )
    .refine((val) => {
      if (!val) return true;
      const selectedDate = stripTime(new Date(val));
      const today = stripTime(new Date());
      return selectedDate >= today;
    }, "Arrival date must be today or in the future"),

  adults: z
    .string()
    .regex(
      numberRegex,
      "Number of adults must be a single digit between 1 and 9"
    )
    .transform((val) => parseInt(val)),

  currencyCode: z
    .string()
    .regex(currencyRegex, "Currency must be a 3-letter code (e.g. USD)")
    .toUpperCase(),
});
