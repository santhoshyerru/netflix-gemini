import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import MovieDetails from "./MovieDetails";
import Header from "./Header";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <>
          <Header />
          <Browse />
        </>
      ),
    },
    {
      path: "/movie/:id",
      element: (
        <>
          {/* <Header /> */}
          <MovieDetails />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
