import { PropsWithChildren } from "react";
import Title from "../components/Title";
import BottomNav from "../components/BottomNav";

const Layout = ({ children }: { children: PropsWithChildren }) => {
  return (
    <>
      <Title />
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
