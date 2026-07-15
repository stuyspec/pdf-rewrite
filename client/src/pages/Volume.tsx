import { Link, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import Dock from "../components/Dock";
import { useEffect, useState } from "react";
import { getIssues } from "../helpers/pdfHelper";
import { TOO_MANY_REQUESTS } from "../helpers/interfaces";
import RateLimitModal from "../components/RateLimitModal";

export default function Volume() {
  const { volume } = useParams();

  const [issues, setIssues] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  //FOR RATE LIMITING
  const [tmrModal, setTmrModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        setTmrModal(false);
        const response = await getIssues(Number(volume));
        if (response.errorMessage) throw new Error(response.errorMessage);

        if (response.status === TOO_MANY_REQUESTS) {
          setTmrModal(true);
          return;
        }

        setIssues(response.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [volume]);

  return (
    <Fragment>
      {tmrModal ? <RateLimitModal /> : null}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[50vh] mb-3 md:mb-0 relative">
          <div className="bg-[url(./assets/newspaperbg.webp)]">
            <div className="bg-base-300/75 md:h-full h-[50vh]">
              <h1 className="text-2xl text-center h-full flex items-center justify-center">
                Volume {volume}
              </h1>
            </div>
          </div>
          <div className="p-5 flex justify-center items-center flex-col w-full bg-base-300 gap-5">
            <h1 className="text-2xl">Issue Selection</h1>
            {loading ? (
              <div className="loading loading-bars loading-xl"></div>
            ) : error === null ? (
              <div>
                <h2>Error Finding Issues</h2>
              </div>
            ) : issues.length === 0 ? (
              <div>
                <h2>No Issues Found</h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full">
                {issues.map((value, index) => (
                  <Link to={`/archive/${volume}/${value}`} key={index}>
                    <button className="btn btn-soft btn-error w-full">
                      {value}
                    </button>
                  </Link>
                ))}
              </div>
            )}

            <button className="btn btn-secondary btn-soft">
              <Link
                to="/archive"
                className="h-full w-full flex justify-center items-center"
              >
                Back to Archive
              </Link>
            </button>
          </div>
        </div>
      </div>

      <Dock activePage="" />
    </Fragment>
  );
}
