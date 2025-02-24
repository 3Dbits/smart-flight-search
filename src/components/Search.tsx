import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useAirportsCollection from "@/hooks/useAirportsCollection";
import { getCurrentDay } from "@/utils/CommonUtils";
import useCurrencyCollection from "@/hooks/useCurrencyCollection";
import { NativeSelect } from "@chakra-ui/react/native-select";
import { Input } from "@chakra-ui/react/input";
import { Button, Center, Field } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "./ui/number-input";
import { flightSearchSchema } from "@/validators/flightSearchSchema";
import FlightList from "./Flight/FlightList";

type Inputs = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  currencyCode: string;
};

function Search() {
  const [formData, setformData] = useState<Inputs | null>(null);
  const currency = useCurrencyCollection();
  const airportsCollection = useAirportsCollection();
  const currentDay = getCurrentDay();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(flightSearchSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setformData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center gap={"2"} m={"8"}>
          <Field.Root invalid={!!errors.origin} width={"250px"}>
            <Field.Label>Origin</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field {...register("origin")} defaultValue={"ZAG"}>
                {airportsCollection.items
                  .filter((airport) => airport.value !== watch("destination"))
                  .map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.origin?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.destination} width={"250px"}>
            <Field.Label>Destination</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                {...register("destination")}
                defaultValue={"LAX"}
              >
                {airportsCollection.items
                  .filter((airport) => airport.value !== watch("origin"))
                  .map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.destination?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.departureDate} width={"140px"}>
            <Field.Label>Departure Date</Field.Label>
            <Input
              type="date"
              defaultValue={currentDay}
              min={currentDay}
              {...register("departureDate")}
            />
            <Field.ErrorText>{errors.departureDate?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.returnDate} width={"140px"}>
            <Field.Label>Return Date</Field.Label>
            <Input
              type="date"
              width={"140px"}
              min={currentDay}
              {...register("returnDate")}
            />
            <Field.ErrorText>{errors.returnDate?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.adults} width={"90px"}>
            <Field.Label>Adults</Field.Label>
            <NumberInputRoot min={1} max={9} allowMouseWheel defaultValue={"1"}>
              <NumberInputLabel />
              <NumberInputField {...register("adults")} />
            </NumberInputRoot>
            <Field.ErrorText>{errors.adults?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.currencyCode} width={"90px"}>
            <Field.Label>Currency</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                {...register("currencyCode")}
                defaultValue={"EUR"}
              >
                {currency.items.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>{errors.currencyCode?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit" alignSelf={"end"}>
            Search
          </Button>
        </Center>
      </form>

      {formData && <FlightList {...formData} />}
    </>
  );
}

export default Search;

/*

*/
