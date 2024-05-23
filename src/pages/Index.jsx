import { useState, useEffect } from "react";
import { Container, VStack, Text, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.example.com/nomad-cities");
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

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