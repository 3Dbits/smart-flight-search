export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  currencyCode: string;
}

export interface FlightResponse {
  data: FlightDestination[];
}

export interface FlightDestination {
  itineraries: Itineraries[];
  price: Price;
  oneWay: boolean;
  numberOfBookableSeats: number;
}

interface Itineraries {
  duration: string;
  segments: Segments[];
}

export interface Segments {
  departure: Departure;
  arrival: Arrival;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface LocationInfo {
  iataCode: string;
  terminal: string;
  at: string;
}

type Departure = LocationInfo;

type Arrival = LocationInfo;

interface Aircraft {
  code: string;
}

interface Operating {
  carrierCode: string;
}

interface Price {
  grandTotal: string;
  currency: string;
}

export interface FlightCardsProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  currencyCode: string;
}

export const createFlightPropsHash = (props: FlightCardsProps): string => {
  const values = [
    props.origin,
    props.destination,
    props.departureDate,
    props.returnDate,
    props.adults.toString(),
    props.currencyCode,
  ];

  const stringToHash = values.join("|:|");

  let hash = 0;
  for (let i = 0; i < stringToHash.length; i++) {
    const char = stringToHash.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(36);
};
