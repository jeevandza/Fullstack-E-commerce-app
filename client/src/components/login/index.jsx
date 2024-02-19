import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Login = ({ handleShowSignUp }) => {
  const navigate = useNavigate()
  const [signIn, setSignIn] = useState({
    name: "",
    password: "",
  });
  const handleLogin = (e) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async() => {
    try {
      const loginUser = await axios.post("http://localhost:4001/v1/auth/login", signIn);
      const user = loginUser.data.data;
      const token = loginUser.data.access_token;
      if(loginUser.status === 200){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access_token', JSON.stringify(token))
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="email"
                  name="name"
                  type="text"
                  value={signIn.name}
                  onChange={handleLogin}
                />
              </FormControl>
            </Stack>
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={signIn.password}
                  onChange={handleLogin}
                />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button onClick={handleSignIn}>Sign in</Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with{" "}
                  <Text onClick={handleShowSignUp}>Sign up</Text>
                </Text>
                <Divider />
              </HStack>
              {/* <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
