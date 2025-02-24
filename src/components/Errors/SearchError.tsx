import { Text, Button, Heading, Center, VStack } from "@chakra-ui/react";

function SearchError() {
  return (
    <Center className="dashboard-error">
      <VStack>
        <Heading>Search Error</Heading>
        <Text>
          There was a problem loading the results. Please try again later.
        </Text>
        <Button onClick={() => window.location.reload()}>
          Reload Dashboard
        </Button>
      </VStack>
    </Center>
  );
}

export default SearchError;
