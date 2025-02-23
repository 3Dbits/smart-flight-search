import { useMemo } from "react";
import { createListCollection } from "@chakra-ui/react/collection";
import { airports } from "@/utils/CommonUtils";

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
