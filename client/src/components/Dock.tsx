import { Link, useNavigate } from "react-router";

export default function Dock({
  activePage,
}: {
  activePage: "home" | "archive" | "";
}) {
  return (
    <div className="dock dock-sm visible md:hidden text-center">
      <Link to="/">
        <button
          className={
            activePage === "home"
              ? "dock-active cursor-pointer flex flex-col justify-center items-center gap-1.5"
              : "cursor-pointer flex flex-col justify-center items-center gap-1.5"
          }
          onClick={() => {
            let navigate = useNavigate();
            navigate("/");
          }}
        >
          {activePage === "home" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-[1.2em]"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-[1.2em]"
              viewBox="0 0 16 16"
            >
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          )}
          <span className="dock-label">Home</span>
        </button>
      </Link>

      <Link to="/archive">
        <button
          className={
            activePage === "archive"
              ? "dock-active cursor-pointer flex flex-col justify-center items-center gap-1.5"
              : "cursor-pointer flex flex-col justify-center items-center gap-1.5"
          }
        >
          {activePage == "archive" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-[1.2em]"
              viewBox="0 0 16 16"
            >
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-[1.2em]"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
            </svg>
          )}
          <span className="dock-label">Archive</span>
        </button>
      </Link>
    </div>
  );
}
