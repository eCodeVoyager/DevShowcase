import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer";
import Navbar from "../components/shared/Navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen" id="root-layout">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default RootLayout;
