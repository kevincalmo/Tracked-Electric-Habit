import { Box, Center, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const buttons = [
    { name: "Accueil", path: "/" },
    { name: "Histo.", path: "/historique" },
    { name: "Graph.", path: "/graphique" },
    { name: "Params.", path: "/parametres" },
  ];
  return (
    <Box position="fixed" bottom={0} left={0} width={"100%"} height={"70px"}>
      <Flex
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        {buttons.map((button, index) => (
          <Box
            key={index}
            width={"100%"}
            height={"70px"}
            background="gray.500"
            _hover={{ background: "blue", cursor: "pointer" }}
          >
            <Center h="100%" w="100%">
              <Link to={button.path}>{button.name}</Link>
            </Center>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default BottomNav;
