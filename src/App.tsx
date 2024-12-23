import { Route, Routes } from "react-router-dom";
import "./App.css";
import ReactGA from "react-ga4";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import StructureIndex from "./pages/StructureIndex";
import Footer from "./components/ui/Footer";
import ProteinResultsPage from "./pages/ProteinResultsPage";
import VirusResultsPage from "./pages/VirusResultsPage";
import About from "./pages/About";
import { tracking_id } from "./utils/google-analytics-id";
import { useEffect, useState } from "react";
import { CookieConsent } from "react-cookie-consent";
import API from "./pages/API";
import NotFound from "./pages/NotFound";

function App() {
  const [hasConsented, setHasConsented] = useState<boolean | null>(false);

  useEffect(() => {
    if (hasConsented) {
      ReactGA.initialize(tracking_id);
      ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    }
  }, [hasConsented]);

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/docs" element={<API />}></Route>
          <Route
            path="/resultspage/:filterParam/:searchParam"
            element={<VirusResultsPage />}
          ></Route>
          <Route
            path="/proteinresultspage/:filterParam/:searchParam"
            element={<ProteinResultsPage />}
          ></Route>
          <Route
            path="/structureindex/:filterParam/:searchParam"
            element={<StructureIndex />}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <p className="fixed z-50 2xl:text-4xl lg:text-xl  text-[#b6b6b6] bottom-0 left-0 my-2 mx-4">
          Viro3D Beta
        </p>
        <Footer />
        <CookieConsent
          enableDeclineButton
          onDecline={() => {
            setHasConsented(false);
          }}
          onAccept={() => {
            setHasConsented(true);
          }}
          style={{ background: "#e7e7e7", color: "#6c828d" }}
          buttonStyle={{
            background: "#4eb4e4",
            border: "0px",
            borderRadius: "8px",
            color: "white",
          }}
          declineButtonStyle={{
            background: "#e65b56",
            border: "0px",
            borderRadius: "8px",
          }}
          flipButtons={true}
        >
          This website uses Google Analytics First Party cookies for collecting
          usage statistics and some user-related data including geography and IP
          address. We use this facility to understand our users and improve our
          website.
        </CookieConsent>
      </main>
    </>
  );
}

export default App;
