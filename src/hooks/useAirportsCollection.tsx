import { useMemo } from "react";
import { airports } from "@nwpr/airport-codes";
import { createListCollection } from "@chakra-ui/react/collection";

const useAirportsCollection = () => {
  const airportsCollection = useMemo(() => {
    const airportsList = airports.map((airport) => ({
      label: airport.name,
      value: airport.iata,
    }));
    return createListCollection({
      items: airportsList,
    });
  }, []);

  return airportsCollection;
};

export default useAirportsCollection;
