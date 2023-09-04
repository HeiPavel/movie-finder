import React from "react";
import { MainPage } from "../mainPage/MainPage";
import { MoviePage } from "../moviePage/MoviePage";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<MainPage/>} />
    <Route path="/movie/:id" element={<MoviePage />} />
  </>
));

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
