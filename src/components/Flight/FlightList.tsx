import { Center, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";
import FlightCard from "./FlightCard";
import {
  createFlightPropsHash,
  FlightCardsProps,
  FlightDestination,
} from "@/types/FlightSearch";
import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "@/api/FlightSearch";
import { SkeletonCircle, SkeletonText } from "../ui/skeleton";

function FlightList(flightCardsProps: FlightCardsProps) {
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
          <FlightCard key={index} {...flight} />
        ))}
      </Flex>
    </Center>
  );
}

export default FlightList;
