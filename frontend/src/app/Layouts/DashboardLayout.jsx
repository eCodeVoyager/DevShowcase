import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Footer from "../components/shared/footer";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen lg:gap-5">
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>
      <div className="h-screen  overflow-y-auto flex-1">
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default DashboardLayout;
