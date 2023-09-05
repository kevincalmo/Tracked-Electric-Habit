import { useQuery } from "react-query";
import Layout from "./layout";
import { Center, IconButton, Text } from "@chakra-ui/react";
import axios from "axios";
import { SUPABASE_API_KEY, SUPABASE_URL } from "./utils/env_variab";
import { calculElectricInfo } from "./functions/calcul_electric_info";
import { convertKwhInEuro } from "./functions/convertKwhInEuro";
import { isDateInCurrentMonth } from "./functions/isDateInCurrentMonth";
import { averageElectricityConsumption } from "./functions/averageElectricityConsumption";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
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
  const averageElectricityConsumptionInMonth =
    averageElectricityConsumption(numberData);

  return (
    <Layout>
      <Center flexDirection="column" h="100%" margin="20px 0">
        <Text textAlign="center">Consommation du mois</Text>
        <Text textAlign="center">{electricConsommationOfMonth} kwH</Text>
        <Text textAlign="center">≈ {ElectricConsommationOfMonthInEuro} €</Text>
        <Text textAlign="center">
          La consommation moyenne d'électricité est de :{" "}
          {averageElectricityConsumptionInMonth} kwH
        </Text>
      </Center>
      <IconButton
        onClick={() => {
          navigate("/add-statement");
        }}
        cursor="pointer"
        width="100px"
        height="100px"
        size="lg"
        zIndex={9}
        position="fixed"
        right={5}
        bottom={90}
        color="blue"
        aria-label="add button"
        isRound={true}
        icon={<AddIcon height={50} width={50} />}
      />
    </Layout>
  );
}

export default App;
