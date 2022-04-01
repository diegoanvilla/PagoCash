import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Access from "../access";
import Navbar from "../navbar";
import Inicio from "../Inicio";
import Session from "../Session/";
import Main from "../Session/Main";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/authContext.js";
import BlockchainContext from "../context/BlockchainContext";
import AddWallet from "../Session/AddWallet";
import Success from "../Session/Operaciones/Success";
import "../../styles/index.css";
import Operacion from "../Session/Operaciones/Operacion";
function Index() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BlockchainContext>
            <Routes>
              <Route exact path="/" element={<Inicio />}></Route>
              <Route exact path="/access" element={<Access />}></Route>
              <Route exact path="/session" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/session"
                  element={
                    <Session>
                      <Main />
                    </Session>
                  }
                />
              </Route>
              <Route exact path="/new-wallet" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/new-wallet"
                  element={
                    <Session>
                      <AddWallet />
                    </Session>
                  }
                />
              </Route>
              <Route exact path="/operacion" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/operacion"
                  element={
                    <Session>
                      <Operacion />
                    </Session>
                  }
                />
              </Route>
              <Route exact path="/success" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/success"
                  element={
                    <Session>
                      <Success />
                    </Session>
                  }
                />
              </Route>
            </Routes>
          </BlockchainContext>
        </AuthProvider>
      </Router>
    </>
  );
}
export default Index;
