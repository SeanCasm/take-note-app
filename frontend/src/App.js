import React, { useEffect } from "react";
import { AccountHome } from "./components/AccountHome/AccountHome";
import { Info } from "./components/Info";
import { CustomNavbar } from "./components/CustomNavbar/CustomNavbar";
import { Route, Routes } from "react-router-dom";
import { FeatureScreen } from "./components/Features/FeatureScreen";
import { LogIn, SignUp } from "./components/Form";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { useProfile } from "./hooks/useProfile";

const App = () => {
  const { status, activateSession } = useProfile();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");

    if (isLogged !== null && isLogged === "true") {
      activateSession();
    }
  }, []);
  return (
    <div>
      <div className="mb-5">
        <CustomNavbar />
      </div>
      <Routes>
        <Route path="features" element={<FeatureScreen />}></Route>
        <Route path="info" element={<Info />}></Route>
        {status === "not-logged" ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<LogIn />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="*" element={<Home />}></Route>
          </>
        ) : (
          <>
            <Route path="home" element={<AccountHome />}></Route>
            <Route path="*" element={<AccountHome />}></Route>
          </>
        )}
        <Route path="about" element={<About />}></Route>
      </Routes>
    </div>
  );
};

export default App;
