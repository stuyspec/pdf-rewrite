import { Fragment } from "react/jsx-runtime";
import VolIssSearchHero from "./components/VolIssSearchHero";
import Dock from "./components/Dock";

//DECLARE PROPERTIES OF WINDOW
declare global {
  interface Window {
    BASE_URL: string;
  }
}
function App() {
  //SET THE BASE URL
  window.BASE_URL = "http://localhost:3000/api";

  return (
    <Fragment>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 bg-[url(./assets/newspaperbg.webp)] min-h-[75vh]">
        <div className="h-full min-h-[30vh] flex justify-center items-center bg-base-300/75">
          <div>
            <h1 className="text-3xl  text-center mb-8">pdf.stuyspec.com</h1>
            <VolIssSearchHero />
          </div>
        </div>
        <div className="h-full flex justify-center items-center bg-base-300">
          <div className="p-10">
            <h1 className="text-3xl text-center mt-10 mb-10">
              Welcome to The Spectator's Achive
            </h1>
            <p className="indent-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center h-[30vh]">
        <div className="bg-base-300 border-2 border-primary px-20 py-10 rounded-lg text-center">
          <h1 className="text-3xl text-center mb-8">Browse the Archive</h1>
          <button className="btn btn-lg btn-primary rounded-full">Explore Now</button>
        </div>
      </div> */}

      <Dock activePage="home" />
    </Fragment>
  );
}

export default App;
