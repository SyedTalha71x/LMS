import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from './authentication/signin'
import Main from "./pages/main";

function App() {
  const location = useLocation();

  const isLoginRoute = location.pathname.startsWith('/login');
  
  return (
    <>
      {!isLoginRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!isLoginRoute && <Footer />}
    </>
  );
}

export default App;
