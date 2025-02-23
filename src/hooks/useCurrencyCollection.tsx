import { createListCollection } from "@chakra-ui/react/collection";
import { useMemo } from "react";

const useCurrencyCollection = () => {
  const currencyCollection = useMemo(() => {
    return createListCollection({
      items: [
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "AUD", value: "AUD" },
      ],
    });
  }, []);

  return currencyCollection;
};

export default useCurrencyCollection;
