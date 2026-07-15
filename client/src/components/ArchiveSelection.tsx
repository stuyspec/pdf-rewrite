import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getIssues, getVolumes } from "../helpers/pdfHelper";
import { TOO_MANY_REQUESTS, type ReturnStatement } from "../helpers/interfaces";
import RateLimitModal from "./RateLimitModal";

export default function ArchiveSelection() {
  const [hasReacted, setHasReacted] = useState(false);
  const [volumeSelected, setVolumeSelected] = useState<number>(-1);

  const [volumes, setVolumes] = useState<number[]>([]);
  const [issues, setIssues] = useState<number[]>([]);

  const [volumeLoading, setVolumeLoading] = useState<boolean>(true);
  const [issueLoading, setIssueLoading] = useState<boolean>(true);

  const [volumeError, setVolumeError] = useState<string | null>(null);
  const [issueError, setIssueError] = useState<string | null>(null);

  const [tmrModal, setTmrModal] = useState<boolean>(false);

  //FETCH THE VOLUMES
  useEffect(() => {
    const fetchVolumes = async () => {
      try {
        setVolumeLoading(true);
        setTmrModal(false);
        const response: ReturnStatement = await getVolumes();
        if (response.errorMessage) throw new Error(response.errorMessage);

        if (response.status === TOO_MANY_REQUESTS) {
          setTmrModal(true);
          return <h2>TOO MANY REQUESTS</h2>;
        }

        setVolumes(response.response);
      } catch (err: any) {
        setVolumeError(err.message);
      } finally {
        setVolumeLoading(false);
      }
    };

    fetchVolumes();
  }, []);

  //FETCH THE ISSUES
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIssueLoading(true);
        setTmrModal(false);

        const response: ReturnStatement = await getIssues(volumeSelected);
        if (response.errorMessage) throw new Error(response.errorMessage);

        if (response.status === TOO_MANY_REQUESTS) {
          setTmrModal(true);
          return;
        }

        setIssues(response.response);
      } catch (err: any) {
        setIssueError(err.message);
      } finally {
        setIssueLoading(false);
      }
    };

    fetchIssues();
  }, [volumeSelected]);

  return (
    <>
      {tmrModal ? <RateLimitModal /> : null}
      <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
        <div
          className={`order-last md:order-first ${hasReacted ? "col-span-2" : "col-span-3 "}`}
        >
          <h3 className="text-2xl mb-3">Volume</h3>
          <div
            className={`grid gap-2 grid-cols-2 ${hasReacted ? "md:grid-cols-2" : "md:grid-cols-3"}`}
          >
            {volumeLoading ? (
              <div className="loading loading-bars loading-xl"></div>
            ) : volumeError ? (
              <div>
                <h2>Error Fiding Volumes</h2>
              </div>
            ) : volumes.length === 0 ? (
              <h2>No Volumes Found</h2>
            ) : (
              volumes.map((value, index) => (
                <button
                  className={`
                btn btn-info dark:btn-soft
                ${volumeSelected != -1 && volumeSelected != value ? "btn-secondary" : ""}
                `}
                  onClick={() => {
                    setHasReacted(true);
                    setVolumeSelected(value);
                  }}
                  key={index}
                >
                  {value}
                </button>
              ))
            )}
          </div>
        </div>
        <div
          className={hasReacted ? "col-span-3 visible" : "invisible w-0 h-0"}
        >
          <h3 className="text-2xl mb-3">Issue</h3>
          <div
            className={`grid gap-2 -order-1 md:order-1 grid-cols-2 md:grid-cols-3`}
          >
            {issueLoading ? (
              <div className="loading loading-bars loading-xl"></div>
            ) : issueError ? (
              <div>Error Finding Issues</div>
            ) : issues.length === 0 ? (
              <h2>No Issues Found</h2>
            ) : (
              issues.map((value, index) => (
                <Link
                  to={volumeSelected != -1 ? `${volumeSelected}/${value}` : ""}
                  key={index}
                >
                  <button
                    className={`btn btn-error dark:btn-soft relative w-full`}
                  >
                    {value}
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
