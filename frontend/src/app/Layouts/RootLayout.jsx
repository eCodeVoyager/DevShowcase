import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/footer";
import Sidebar from "../components/shared/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen" id="root-layout">
      {/* <div> */}
      <Navbar />
      {/* <Sidebar /> */}
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
