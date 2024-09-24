import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default RootLayout;
