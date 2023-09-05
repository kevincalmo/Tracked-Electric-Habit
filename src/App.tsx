import { useQuery } from "react-query";
import Layout from "./layout";
import { Box, Center, Text } from "@chakra-ui/react";
import axios from "axios";
import { SUPABASE_API_KEY, SUPABASE_URL } from "./utils/env_variab";
import { calculElectricInfo } from "./functions/calcul_electric_info";
import { convertKwhInEuro } from "./functions/convertKwhInEuro";
import { isDateInCurrentMonth } from "./functions/isDateInCurrentMonth";

function App() {
  const { data, isLoading, error } = useQuery("data", async () => {
    const dataFetch = await axios.get(SUPABASE_URL + "statement?select=*", {
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    const returnData = dataFetch.data.map((data: any) => {
      if (isDateInCurrentMonth(new Date(data.created_at))) {
        return data;
      }
    });
    return returnData;
  });

  if (isLoading) {
    return <>Loading....</>;
  }

  if (error) {
    return (
      <Center h="100%" w="100%">
        Une erreur est survenue lors du chargement des données
      </Center>
    );
  }

  //data est retourné
  const numberData = data.map((data: any) => {
    const { quantity } = data;
    return quantity;
  });

  const electricConsommationOfMonth = calculElectricInfo(numberData);
  const ElectricConsommationOfMonthInEuro = convertKwhInEuro(
    electricConsommationOfMonth
  );

  return (
    <Layout>
      <Box margin="20px 0">
        <Text textAlign="center">Consommation du mois</Text>
        <Text textAlign="center">{electricConsommationOfMonth} kwH</Text>
        <Text textAlign="center">≈ {ElectricConsommationOfMonthInEuro}</Text>
      </Box>
    </Layout>
  );
}

export default App;
