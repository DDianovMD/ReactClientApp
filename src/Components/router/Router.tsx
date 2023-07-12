import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from '../navbar/NavBar';
import { Home } from '../home/Home'
import { Edit } from '../edit/Edit';
import { Add } from '../add/Add'

const Router = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/add" element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
