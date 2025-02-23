import { FlightSearchParams } from "../types/FlightSearch";

export const searchFlights = async (searchParams: FlightSearchParams) => {
  const response = await fetch(import.meta.env.VITE_FLIGHT_SEARCH_BE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
