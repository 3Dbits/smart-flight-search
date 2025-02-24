import { LocationInfo } from "@/types/FlightSearch";
import { airports, formatDate } from "@/utils/CommonUtils";
import { Text, Box, Heading } from "@chakra-ui/react";

function FlightSegment(locationInfo: LocationInfo) {
  const airportName = airports.find(
    (airport) => airport.iata === locationInfo.iataCode
  )?.name;

  return (
    <Box>
      <Heading>{locationInfo.iataCode}</Heading>
      <Text>{airportName}</Text>
      <Text>{formatDate(locationInfo.at)}</Text>
    </Box>
  );
}

export default FlightSegment;
