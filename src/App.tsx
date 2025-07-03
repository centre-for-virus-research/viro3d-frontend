import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import API from "./pages/API";
import Home from "./pages/Home";
const NotFound = lazy(() => import("./pages/NotFound"));
import ProteinResultsPage from "./pages/ProteinResultsPage";
import StructureIndex from "./pages/StructureIndex";
import VirusResultsPage from "./pages/VirusResultsPage";
import Footer from "./components/ui/Footer";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Navbar from "./components/Navbar";
import { CookieConsent } from "react-cookie-consent";
import ReactGA from "react-ga4";
import { tracking_id } from "./utils/google-analytics-id";

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
          <Route
            path="/about"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen xs:mt-24 sm:mt-32 xs:mb-4 sm:mb-32 sm:my-auto sm:mx-4 lg:mx-8 2xl:mx-24">
                    <div className="flex items-center justify-center gap-12">
                      <LoadingSpinner />
                    </div>
                  </div>
                }
              >
                <About />
              </Suspense>
            }
          ></Route>
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
