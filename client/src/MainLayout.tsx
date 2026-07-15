import { Fragment } from "react/jsx-runtime";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

export default function MainLayout() {
  return (
    <Fragment>
      <div className="invisible w-0 h-0 md:visible md:w-full md:h-full">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
}
