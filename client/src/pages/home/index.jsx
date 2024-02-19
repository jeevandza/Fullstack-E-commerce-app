import React from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/dataTable";
import { createColumnHelper } from "@tanstack/react-table";


export function HomePage() {
  const navigate = useNavigate();



  const data = [ {
    fromUnit: "inches",
    toUnit: "millimetres (mm)",
    factor: 25.4
  },
  {
    fromUnit: "feet",
    toUnit: "centimetres (cm)",
    factor: 30.48
  },
  {
    fromUnit: "yards",
    toUnit: "metres (m)",
    factor: 0.91444
  }]


  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("fromUnit", {
      cell: (info) => info.getValue(),
      header: "To convert"
    }),
    columnHelper.accessor("toUnit", {
      cell: (info) => info.getValue(),
      header: "Into"
    }),
    columnHelper.accessor("factor", {
      cell: (info) => info.getValue(),
      header: "Multiply by",
      meta: {
        isNumeric: true
      }
    })
  ];
    return (
    <Box>
      <Flex w="100" justifyContent="center">
        <Button
          onClick={() => navigate("/products")}
          type="button"
          variant="primary"
          b="1px"
        >
          Goto products listing
        </Button>
      </Flex>
      <Box>
        <DataTable data={data} columns={columns} />
      </Box>
    </Box>
  );
}
