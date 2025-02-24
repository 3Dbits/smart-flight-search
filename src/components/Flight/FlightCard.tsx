import { Text, Card, Flex, SimpleGrid, Separator } from "@chakra-ui/react";
import FlightSegment from "./FlightSegment";
import FlightDuration from "./FlightDuration";
import { FlightDestination } from "@/types/FlightSearch";

function FlightCard(flight: FlightDestination) {
  return (
    <Card.Root width="800px">
      <Card.Header>
        <Flex direction={"column"} gap={"2"}>
          <SimpleGrid columns={3}>
            <FlightSegment {...flight.itineraries[0].segments[0].departure} />

            <FlightDuration
              duration={flight.itineraries[0].duration}
              segments={flight.itineraries[0].segments}
            />

            <FlightSegment
              {...flight.itineraries[0].segments[
                flight.itineraries[0].segments.length - 1
              ].arrival}
            />
          </SimpleGrid>
          <Separator />

          {flight.itineraries.length === 2 && (
            <>
              <SimpleGrid columns={3}>
                <FlightSegment
                  {...flight.itineraries[1].segments[0].departure}
                />

                <FlightDuration
                  duration={flight.itineraries[1].duration}
                  segments={flight.itineraries[1].segments}
                />

                <FlightSegment
                  {...flight.itineraries[1].segments[
                    flight.itineraries[1].segments.length - 1
                  ].arrival}
                />
              </SimpleGrid>
              <Separator />
            </>
          )}
        </Flex>
      </Card.Header>

      <Card.Body>
        <Text>
          Total price: {flight.price.grandTotal} {flight.price.currency}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}

export default FlightCard;
