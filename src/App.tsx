import { RecoilRoot, useRecoilValue } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import theme from "./theme";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";

import { ColorModeScript } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { NAV_ITEMS } from "./constants";

import { loadingState } from "./atoms";

function App() {
  const loading = useRecoilValue(loadingState);
  return (
    <>
      <ColorModeScript initialColorMode="dark" />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar navItems={NAV_ITEMS} loading={loading} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
