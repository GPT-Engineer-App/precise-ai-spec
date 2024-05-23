import { useState, useEffect } from "react";
import { Container, VStack, Text, Box, Spinner, Alert, AlertIcon, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jjfebbwwtcxyhvnkuyrh.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec';
const supabase = createClient(supabaseUrl, supabaseKey);

const Index = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCity, setNewCity] = useState({ name: "", internet_speed: "", cost_of_living: "", weather: "" });
  const [editingCity, setEditingCity] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('cities').select('*');
    if (error) {
      setError(error.message);
    } else {
      setCities(data);
    }
    setLoading(false);
  };

  const handleAddCity = async () => {
    const { data, error } = await supabase.from('cities').insert([newCity]);
    if (error) {
      setError(error.message);
    } else {
      setCities([...cities, data[0]]);
      setNewCity({ name: "", internet_speed: "", cost_of_living: "", weather: "" });
    }
  };

  const handleEditCity = async () => {
    const { data, error } = await supabase.from('cities').update(editingCity).eq('id', editingCity.id);
    if (error) {
      setError(error.message);
    } else {
      fetchCities(); // Fetch the updated city data
      setEditingCity(null);
    }
  };

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
                <Button onClick={() => setEditingCity(city)}>Edit</Button>
              </Box>
            ))}
          </VStack>
        )}
        <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <Text fontSize="lg" fontWeight="bold">Add New City</Text>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={newCity.name} onChange={(e) => setNewCity({ ...newCity, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Internet Speed</FormLabel>
            <Input value={newCity.internet_speed} onChange={(e) => setNewCity({ ...newCity, internet_speed: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Cost of Living</FormLabel>
            <Input value={newCity.cost_of_living} onChange={(e) => setNewCity({ ...newCity, cost_of_living: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Weather</FormLabel>
            <Input value={newCity.weather} onChange={(e) => setNewCity({ ...newCity, weather: e.target.value })} />
          </FormControl>
          <Button onClick={handleAddCity}>Add City</Button>
        </Box>
        {editingCity && (
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="lg" fontWeight="bold">Edit City</Text>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={editingCity.name} onChange={(e) => setEditingCity({ ...editingCity, name: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Internet Speed</FormLabel>
              <Input value={editingCity.internet_speed} onChange={(e) => setEditingCity({ ...editingCity, internet_speed: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Cost of Living</FormLabel>
              <Input value={editingCity.cost_of_living} onChange={(e) => setEditingCity({ ...editingCity, cost_of_living: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Weather</FormLabel>
              <Input value={editingCity.weather} onChange={(e) => setEditingCity({ ...editingCity, weather: e.target.value })} />
            </FormControl>
            <Button onClick={handleEditCity}>Save Changes</Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;