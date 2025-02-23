import { searchFlights } from "@/api/FlightSearch";
import { HStack, Stack } from "@chakra-ui/react/stack";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, SkeletonCircle, SkeletonText } from "./ui/skeleton";
import { Center } from "@chakra-ui/react/center";
import { Flex } from "@chakra-ui/react/flex";
import { Card } from "@chakra-ui/react/card";
import { Heading, Text } from "@chakra-ui/react/typography";
import { formatDate } from "@/utils/CommonUtils";
import {
  createFlightPropsHash,
  FlightCardsProps,
  FlightDestination,
} from "@/types/FlightSearch";
import { airports } from "@nwpr/airport-codes";
import { Box } from "@chakra-ui/react/box";
import { Spacer } from "@chakra-ui/react";

function FlightCards(flightCardsProps: FlightCardsProps) {
  const flightPropsHash = createFlightPropsHash(flightCardsProps);
  const { isPending, isError, data, error } = useQuery({
    queryKey: [{ flightPropsHash }],
    queryFn: async () => searchFlights(flightCardsProps),
  });

  if (isPending) {
    return (
      <Flex justify="center" align="center" mt={"4"}>
        <Stack gap="6" width="full" maxW={"xs"}>
          <HStack width="full">
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={2} />
          </HStack>
          <Skeleton height="200px" />
        </Stack>
      </Flex>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data?.data.length === 0) {
    return <span>No flights found.</span>;
  }

  return (
    <Center mt={"4"}>
      <Flex direction={"column"} gap={"4"}>
        {data?.data.map((flight: FlightDestination, index: number) => (
          <Card.Root width="600px" key={index}>
            <Card.Header>
              <Flex>
                <Box>
                  <Heading>
                    {flight.itineraries[0].segments[0].departure.iataCode}
                  </Heading>
                  <Text>
                    {
                      airports.find(
                        (airport) =>
                          airport.iata ===
                          flight.itineraries[0].segments[0].departure.iataCode
                      )?.name
                    }{" "}
                  </Text>
                  <Text>
                    {formatDate(flight.itineraries[0].segments[0].departure.at)}
                  </Text>
                </Box>
                <Spacer />
                <Box alignSelf={"center"}>
                  <Heading>-</Heading>
                </Box>
                <Spacer />
                <Box>
                  <Heading>
                    {
                      flight.itineraries[0].segments[
                        flight.itineraries[0].segments.length - 1
                      ].arrival.iataCode
                    }
                  </Heading>
                  <Text>
                    {
                      airports.find(
                        (airport) =>
                          airport.iata ===
                          flight.itineraries[0].segments[
                            flight.itineraries[0].segments.length - 1
                          ].arrival.iataCode
                      )?.name
                    }
                  </Text>
                  <Text>
                    {formatDate(
                      flight.itineraries[0].segments[
                        flight.itineraries[0].segments.length - 1
                      ].arrival.at
                    )}
                  </Text>
                </Box>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Text>
                Number of stops: {flight.itineraries[0].segments.length - 1}
              </Text>
              <Text>Free seats: {flight.numberOfBookableSeats}</Text>
              <Text>
                Price: {flight.price.grandTotal} {flight.price.currency}
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>
    </Center>
  );
}

export default FlightCards;
