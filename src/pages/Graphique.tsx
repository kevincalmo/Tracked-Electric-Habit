import { Center, Stack } from "@chakra-ui/react";
import Layout from "../layout";
import { useQuery } from "react-query";
import { SUPABASE_API_KEY, SUPABASE_URL } from "../utils/env_variab";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graphique = () => {
  const { data, isLoading, error }: any = useQuery("data", async () => {
    const dataFetch = await axios.get(SUPABASE_URL + "statement?select=*", {
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    return dataFetch.data;
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
  const valuesTab = data.map((data: any) => {
    return data.quantity;
  });
  const labelTab = data.map((data: any) => {
    return data.created_at;
  });

  const dataLine = {
    labels: labelTab,
    datasets: [
      {
        label: "Consommation ( en KwH )",
        data: valuesTab,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Layout>
      <Stack margin="20px 0">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" as const },
              title: {
                display: true,
                text: "Evolution De La Consommation Electrique En Fonction Du Temps",
              },
            },
          }}
          data={dataLine}
        />
      </Stack>
    </Layout>
  );
};

export default Graphique;
