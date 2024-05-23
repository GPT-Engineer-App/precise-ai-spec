import { useState } from "react";
import { Container, VStack, Text, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const Index = () => {
  const [cities, setCities] = useState([
    { id: 1, name: "City A", internet_speed: 50, cost_of_living: 1000, weather: "Sunny" },
    { id: 2, name: "City B", internet_speed: 70, cost_of_living: 1200, weather: "Cloudy" },
    { id: 3, name: "City C", internet_speed: 60, cost_of_living: 1100, weather: "Rainy" },
    { id: 4, name: "City D", internet_speed: 80, cost_of_living: 1300, weather: "Windy" },
    { id: 5, name: "City E", internet_speed: 90, cost_of_living: 1400, weather: "Snowy" },
    { id: 6, name: "City F", internet_speed: 55, cost_of_living: 1050, weather: "Sunny" },
    { id: 7, name: "City G", internet_speed: 65, cost_of_living: 1150, weather: "Cloudy" },
    { id: 8, name: "City H", internet_speed: 75, cost_of_living: 1250, weather: "Rainy" },
    { id: 9, name: "City I", internet_speed: 85, cost_of_living: 1350, weather: "Windy" },
    { id: 10, name: "City J", internet_speed: 95, cost_of_living: 1450, weather: "Snowy" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Top 10 Nomad Destinations</Text>
        {loading && <Spinner size="xl" />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {!loading && !error && (
          <VStack spacing={4} width="100%">
            {cities.map((city, index) => (
              <Box key={city.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
                <Text fontSize="lg" fontWeight="bold">{index + 1}. {city.name}</Text>
                <Text>Internet Speed: {city.internet_speed} Mbps</Text>
                <Text>Cost of Living: ${city.cost_of_living} / month</Text>
                <Text>Weather: {city.weather}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;