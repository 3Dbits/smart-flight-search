export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleString("en-GB", options).replace(",", "");
};

export const getCurrentDay = () => {
  return new Date().toISOString().split("T")[0];
};

export const formatDuration = (duration: string): string => {
  const matchWithMinutes = duration.match(/PT(\d+)H(\d+)M/);
  const matchHoursOnly = duration.match(/PT(\d+)H$/);

  if (matchWithMinutes) {
    const [, hours, minutes] = matchWithMinutes;
    return `${parseInt(hours)}h ${parseInt(minutes)}min`;
  } else if (matchHoursOnly) {
    const [, hours] = matchHoursOnly;
    return `${parseInt(hours)}h 0min`;
  } else {
    console.log(`Invalid duration format: ${duration}`);
    return "";
  }
};

export const stripTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

type Airport = {
  name: string;
  iata: string;
};

export const airports: Airport[] = [
  { name: "Los Angeles International Airport", iata: "LAX" },
  { name: "John F. Kennedy International Airport", iata: "JFK" },
  { name: "San Francisco International Airport", iata: "SFO" },
  { name: "Chicago O'Hare International Airport", iata: "ORD" },
  { name: "Hartsfield-Jackson Atlanta International Airport", iata: "ATL" },
  { name: "Dallas/Fort Worth International Airport", iata: "DFW" },
  { name: "Denver International Airport", iata: "DEN" },
  { name: "Seattle-Tacoma International Airport", iata: "SEA" },
  { name: "Miami International Airport", iata: "MIA" },
  { name: "Orlando International Airport", iata: "MCO" },
  { name: "Zagreb Airport", iata: "ZAG" },
];
