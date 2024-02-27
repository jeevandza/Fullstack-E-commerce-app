import React, { useEffect, useState } from "react";
import { Flex, Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/dataTable";
import { createColumnHelper } from "@tanstack/react-table";
import axios from 'axios'


export function HomePage() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([])





  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name"
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: "Email"
    }),
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: "Status"
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => info.getValue(),
      header: "Created on",
      meta: {
        isNumeric: true
      }
    })
  ];

  const getUserList = async()=>{
    try{
      const response = await axios.get("http://localhost:4001/v1/users");
      if(response){
        setUserList(response.data.data)
      }
    }catch(err){
      throw new Error(err)
    }
  }

  useEffect(()=>{
    getUserList()
  },[])





    return (
    <Box>
      <Flex w="100" justifyContent="end" px="10px">
      </Flex>
      <Box>
      <Text px="10px" fontSize='3xl'>Users</Text>
        <DataTable data={userList} columns={columns} />
      </Box>
    </Box>
  );
}
