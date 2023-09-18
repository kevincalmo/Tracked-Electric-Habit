import Layout from "../layout";
import {
  Button,
  ButtonGroup,
  Center,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { SUPABASE_API_KEY, SUPABASE_URL } from "../utils/env_variab";
import { useMutation, useQuery } from "react-query";

const Historique = () => {

  const { data, isLoading, error }: any = useQuery(
    "data",
    async () => {
      const dataFetch = await axios.get(
        SUPABASE_URL + "statement?select=*,electric_meter(id,name)",
        {
          headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${SUPABASE_API_KEY}`,
          },
        }
      );
      console.log(dataFetch);

      const data = dataFetch.data.sort(
        (a: any, b: any) => b.created_at > a.created_at
      );
      return data;
    }
  );

  const deleteStatement = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(SUPABASE_URL + "statement?id:" + id, {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
        },
      });
    },
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

  return (
    <Layout>
      <Stack margin="20px 0">
        <Table variant="striped">
          <TableCaption>Relevé journalier du compteur électrique</TableCaption>
          <Thead>
            <Th>Date</Th>
            <Th>Quantité ( KwH )</Th>
            <Th>Compteur</Th>
            <Th>Actions</Th>
          </Thead>
          <Tbody>
            {data.map((data: any) => (
              <Tr>
                <Td>{data.created_at}</Td>
                <Td>{data.quantity}</Td>
                <Td>{data.electric_meter.name}</Td>
                <Td>
                  <ButtonGroup>
                    <Button colorScheme="yellow">Modifier</Button>
                    <Button
                      onClick={() => {
                        if (
                          confirm(
                            "Voulez-vous vraiment supprimer cette enregistrement ?"
                          )
                        ) {
                          deleteStatement.mutate(data.id);
                        }
                      }}
                      colorScheme="red"
                    >
                      Supprimer
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Layout>
  );
};

export default Historique;
