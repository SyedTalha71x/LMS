import Home from "./pages/home";
import Navbar from "./components/navbar";
import Statistics from "./pages/statistics";
import BenefitsLms from "./pages/benefits-lms";
import BestCourse from "./pages/best-course";
import PricingSection from "./pages/pricing";
import ContactPage from "./pages/contact";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Statistics />
      <BenefitsLms />
      <BestCourse />
      <PricingSection />
      <ContactPage />
      <Footer/>
    </>
  );
}

export default App;
