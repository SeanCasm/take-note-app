import React, { useEffect } from "react";
import { AccountHome } from "./components/AccountHome/AccountHome";
import { CustomNavbar } from "./components/CustomNavbar/CustomNavbar";
import { Route, Routes } from "react-router-dom";
import { FeatureScreen } from "./components/Features/FeatureScreen";
import { LogIn, SignUp } from "./components/Form";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { useProfile } from "./hooks/useProfile";
import { BookConfig } from "./components/Books/BookConfig";
import { Editor } from "./components/AccountHome/Editor";
import { paths } from "./utils/paths";

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
        <Route path={paths.features} element={<FeatureScreen />}></Route>
        <Route path={paths.about} element={<About />}></Route>
        {status === "not-logged" ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path={paths.login} element={<LogIn />}></Route>
            <Route path={paths.signup} element={<SignUp />}></Route>
            <Route path="*" element={<Home />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<AccountHome />}>
              <Route path={paths.noteEditor} element={<Editor />}></Route>
              <Route
                path="book-config/:bookTitle"
                element={<BookConfig />}
              ></Route>
            </Route>

            <Route path="/*" element={<AccountHome />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
