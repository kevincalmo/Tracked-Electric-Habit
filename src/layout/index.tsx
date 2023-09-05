import Title from "../components/Title";
import BottomNav from "../components/BottomNav";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Title />
      <Box height="70vh" w="100%">
        {children}
      </Box>
      <BottomNav />
    </>
  );
};

export default Layout;
