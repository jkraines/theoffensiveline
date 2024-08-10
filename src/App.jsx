import React from "react";
import SleeperLogin from "./pages/SleeperLogin";
import Home from "./pages/Home";
import News from "./pages/News";
import Submit from "./pages/Submit";
import Default from "./pages/Default";
import Bylaws from './pages/Bylaws';
import Newsletter from "./pages/Newsletter";
import ComingSoon from "./pages/ComingSoon";
import NavBar from "./components/NavBar";
import CommissionerNote from './league/commishNote1';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";

const BackgroundWrapper = styled.div`
  background: #ECECDF;
  min-height: 100vh;
`;

function App() {
    return (
        <BackgroundWrapper>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<SleeperLogin />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/coming-soon" element={<ComingSoon />} />
                        <Route path="news" element={<News />} />
                        <Route path="submit" element={<Submit />} />
                        <Route path="bylaws" element={<Bylaws />} />
                        <Route path="newsletter" element={<Newsletter />} />
                        <Route path="*" element={<Default />} />
                        <Route path="league/commishNote1" element={<CommissionerNote />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </BackgroundWrapper>
    );
}

export default App;
