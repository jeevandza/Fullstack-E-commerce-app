"use client";

import { Box, Text, Image, Flex } from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function Product({ data }) {
  return (
    <Box
      width="250px"
      height="300px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid gray"
      p="8px"
      borderRadius="16px"
      m="4px"
    >
      <Image
        rounded="lg"
        height={150}
        width={230}
        objectFit="cover"
        src={IMAGE}
        alt="#"
      />
      <Box>
        <Flex alignItems="center">
          <Text color="black" fontSize="18px">
            Type:
          </Text>
          <Text color="gray" marginLeft="8px" fontSize="12px">
            {data.type}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Text color="black" fontSize="18px">
            Name:
          </Text>
          <Text color="gray" marginLeft="8px" fontSize="12px">
            {data.name}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Text color="black" fontSize="18px">
            Price:
          </Text>
          <Text color="gray" marginLeft="8px" fontSize="12px">
            {data.price}
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Text color="black" fontSize="18px">
            Description:
          </Text>
          <Text color="gray" marginLeft="8px" fontSize="12px" whiteSpace="wrap">
            {data.description.slice(0, 20)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
