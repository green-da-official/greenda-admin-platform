import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { NextPageContext } from "next";

function Error({ statusCode }: { statusCode: number }) {
  return (
    <Box textAlign="center" p={10}>
      <Text fontSize="3xl" fontWeight="bold" color="red.500">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Text>
    </Box>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
