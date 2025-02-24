import { Segments } from "@/types/FlightSearch";
import { formatDuration } from "@/utils/CommonUtils";
import { Text, Box, HStack, Separator } from "@chakra-ui/react";

type FlightDurationProps = {
  duration: string;
  segments: Segments[];
};

function FlightDuration(props: FlightDurationProps) {
  const stopCount = props.segments.length - 2;
  return (
    <Box>
      <Text textAlign={"center"}>{formatDuration(props.duration)}</Text>
      <HStack maxW={"100px"} margin={"auto"}>
        <Separator flex="1" />
        <Text flexShrink="0">*</Text>
        <Separator flex="1" />
      </HStack>
      <Text textAlign={"center"}>
        {props.segments.length === 2
          ? "Direct flight"
          : `${stopCount} stop${stopCount > 1 ? "s" : ""}`}
      </Text>
    </Box>
  );
}

export default FlightDuration;
