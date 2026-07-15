import { Fragment } from "react/jsx-runtime";
import Dock from "../components/Dock";
import ArchiveSelection from "../components/ArchiveSelection";

export default function Archive() {
  return (
    <Fragment>
      <div className="h-[30vh] flex justify-center items-center bg-[url(./assets/newspaperbg.webp)]">
        <div className="bg-base-300/75 flex h-full w-full items-center justify-center">
          <h1 className="text-2xl">Archive</h1>
        </div>
      </div>
      <div className="bg-base-300">
        <ArchiveSelection />
      </div>

      <Dock activePage="archive" />
    </Fragment>
  );
}
