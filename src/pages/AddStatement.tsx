import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Layout from "../layout";
import { useRef, useState } from "react";
import axios from "axios";
import { SUPABASE_API_KEY, SUPABASE_URL } from "../utils/env_variab";

const AddStatement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const quantityRef: any = useRef();

  const handleSendData = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!Number(quantityRef.current.value)) {
      setIsLoading(false);
      toast({
        title: "Erreur",
        description: "La quantité doit être un nombre ex : 4,50",
        isClosable: true,
        status: "error",
        duration: 30000,
      });
      return;
    }
    const quantity = quantityRef.current.value;

    try {
      //envoie vers supabase
      await axios.post(
        SUPABASE_URL + "statement",
        {
          quantity: quantity,
          created_at: new Date(),
          updated_at: new Date(),
          is_start: false,
          electric_meter: 1,
        },
        {
          headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${SUPABASE_API_KEY}`,
            Prefer: "return=minimal",
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      toast({
        title: "Succès",
        description: "L'enregistrement a bien été pris en compte",
        isClosable: true,
        status: "success",
        duration: 30000,
      });

      quantityRef.current.value = null;
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Erreur",
        description: error.message,
        isClosable: true,
        status: "error",
        duration: 30000,
      });
    }
  };

  return (
    <Layout>
      <Stack margin="5%">
        <form onSubmit={handleSendData}>
          <FormControl>
            <FormLabel>Quantité</FormLabel>
            <Input
              ref={quantityRef}
              isRequired={true}
              type="number"
              step="0.01"
              min="0"
            />
          </FormControl>
          <Button
            isActive={isLoading}
            isLoading={isLoading}
            loadingText="Donnée en cours d'envoie"
            colorScheme={isLoading ? "green" : "blue"}
            margin="20px 0"
            type="submit"
          >
            Valider
          </Button>
        </form>
      </Stack>
    </Layout>
  );
};

export default AddStatement;
