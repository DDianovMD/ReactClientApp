import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from '../navbar/NavBar';
import { Home } from '../home/Home.js'
import { Edit } from '../edit/Edit';
import { Add } from '../add/Add'

const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route exact path="/add" element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
