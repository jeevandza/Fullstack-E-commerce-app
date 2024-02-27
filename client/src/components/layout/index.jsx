import React, { useEffect } from "react";
import Navbar from "./navbar";
import { Footer } from "./footer";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export function Layout({ children }) {
  const navigation = useNavigate();
  useEffect(() => {
    const isUserPresent = localStorage.getItem("user");
    if (!isUserPresent) {
      navigation("/auth");
    }
  }, []);

  return (
    <Box w="100vw" h="100vh" overflow="hidden">
      <Box width="100%" position="fixed" top="0" height="60px">
        <Navbar />
      </Box>
      <Box
        overflow="scroll"
        width="100vw"
        height="100vh "
        mt="100px"
      >
        {children}
      </Box>
      <Box
        width="100%"
        position="fixed"
        bottom="0"
        height="120px"
      >
        <Footer />
      </Box>
    </Box>
  );
}
