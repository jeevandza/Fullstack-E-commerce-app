import React, { useEffect, useState } from "react";
import { Button, Flex, Box, Input } from "@chakra-ui/react";
import { Product } from "../../components/product";
import { CreateProduct } from "../../components/createProduct";

import axios from "axios";

export function Products() {
  const [productList, setProductList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getProductList = async () => {
    const response = await axios.get("http://localhost:4001/v1/product/list");
    if (response) {
      setProductList(response.data.data);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);


  return (
    <>
      <Box>
        <Box
          p="4"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            onClick={() => setOpenModal(true)}
            type="button"
            variant="solid"
          >
            Create product
          </Button>
          <Box
            spacing="5"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Input
              width="500px"
              name="productSearch"
              type="text"
              placeholder="Search product"
              value={""}
            />
          </Box>
        </Box>
        <Flex justifyContent="center" h="100%" w="100%" wrap="wrap" px="4px">
          {productList.map((product) => {
            return <Box px="4px"><Product data={product} /></Box>;
          })}
        </Flex>
      </Box>
      {openModal && (
        <CreateProduct
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
