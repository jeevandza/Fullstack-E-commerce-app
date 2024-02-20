import React, { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Select,
} from "@chakra-ui/react";
import { FullPageModal } from "../modal";
import axios from "axios";

export function CreateProduct({ isOpen, onClose }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    type: "",
  });
  const [productTypes, setProductTypes] = useState();

  const onChangeProduct = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * To create new post
   */
  const handleSubmitModal = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4001/v1/product/list",
        product
      );
      if (response.status === 200) {
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProductType = async () => {
    const response = await axios.get("http://localhost:4001/v1/product_types");
    if (response) {
      setProductTypes(response.data.data);
    }
  };

  useEffect(() => {
    getProductType();
  }, []);

  return (
    <FullPageModal
      title="Create product"
      isOpen={isOpen}
      onClose={onClose}
      onSubmitModal={handleSubmitModal}
    >
      <Box>
        <Box>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={product.name}
            onChange={onChangeProduct}
            variant="outline"
          />
        </Box>
        <Box>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={product.description}
            onChange={onChangeProduct}
            variant="outline"
          />
        </Box>
        <Box>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            name="price"
            value={product.price}
            onChange={onChangeProduct}
            variant="outline"
          />
        </Box>
        <Box>
          <FormLabel>Type of product</FormLabel>
          <Select
            onChange={onChangeProduct}
            value={product.type}
            name="type"
            placeholder="Select option"
          >
            {productTypes?.map((type) => {
              return (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              );
            })}
          </Select>
        </Box>
        <Flex alignItems="center" justifyContent="space-evenly" py="4">
          <Box display="flex" justifyContent="center">
            <FormLabel>Publish</FormLabel>
            <Checkbox size="lg" colorScheme="green" />
          </Box>
          <Box display="flex" justifyContent="center">
            <FormLabel>Delete</FormLabel>
            <Checkbox size="lg" colorScheme="red" />
          </Box>
        </Flex>
      </Box>
    </FullPageModal>
  );
}
