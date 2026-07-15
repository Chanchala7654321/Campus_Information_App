import Navbar from "./components/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
