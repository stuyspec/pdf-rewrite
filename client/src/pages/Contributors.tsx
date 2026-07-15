import { Fragment } from "react/jsx-runtime";
import Dock from "../components/Dock";

export default function Contributors() {
  return (
    <Fragment>
      <div className="bg-[url(./assets/newspaperbg.webp)] ">
        <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3 bg-base-300/75">
          <h1 className="text-2xl">Contributors</h1>
          <h2>Maximiliano Pettica</h2>
        </div>
      </div>

      <Dock activePage="" />
    </Fragment>
  );
}
