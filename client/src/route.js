import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import { Products } from "./pages/products";
import { HomePage } from "./pages/home";
import { Users } from "./pages/users";
import { Auth } from "./pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/auth",
    element: (
        <Auth />
    ),
  },
  {
    path: "/products",
    element: (
      <Layout>
        <Products />
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <Users />
      </Layout>
    ),
  },
]);



export default router 