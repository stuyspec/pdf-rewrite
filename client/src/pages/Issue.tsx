import { Link, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import Dock from "../components/Dock";
import { useEffect, useState } from "react";
import { getPdf } from "../helpers/pdfHelper";
import { TOO_MANY_REQUESTS, type ReturnStatement } from "../helpers/interfaces";
import { getArticles } from "../helpers/articleHelper";
import RateLimitModal from "../components/RateLimitModal";
import useWindowDimensions from "../helpers/windowHelper";
interface Article {
  title: string;
  contributors: Staff[];
  section_id: number;
  slug: string;
}

interface Staff {
  name: string;
}

export default function Issue() {
  const { volume, issue } = useParams();

  //FETCH THE PDF LINKS
  const [pdfLink, setPdfLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //FOR RATE LIMITING
  const [tmrModal, setTmrModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        const response: ReturnStatement = await getPdf(
          Number(volume),
          Number(issue),
        );

        if (response.status === TOO_MANY_REQUESTS) {
          return;
        }

        if (response.errorMessage) throw new Error(response.errorMessage);

        setPdfLink(response.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [volume, issue]);

  //FETCH WHETHER ARTICLES EXIST ONLINE
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true);
        if (Number.isNaN(Number(volume)) || Number.isNaN(Number(issue)))
          throw new Error("Volume and issue must be a number.");
        const response: ReturnStatement = await getArticles(
          Number(volume),
          Number(issue),
        );

        if (response.status === TOO_MANY_REQUESTS) {
          setTmrModal(true);
          return;
        }

        if (response.errorMessage) throw new Error(response.errorMessage);

        setArticles(response.response);
      } catch (err: any) {
        setArticlesError(err.message);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchArticles();
  }, [volume, issue]);

  const { width } = useWindowDimensions();

  return (
    <Fragment>
      {tmrModal ? <RateLimitModal /> : null}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[50vh] mb-3 md:mb-0">
          <div className="bg-[url(./assets/newspaperbg.webp)]">
            <h1 className="bg-base-300/75 text-2xl text-center h-[50vh] md:h-full flex items-center justify-center">
              Vol. {volume}, Issue {issue}
            </h1>
          </div>
          <div className="bg-base-300 h-full flex items-center justify-center">
            <menu className="my-5 md:my-0 bg-base-200 menu menu-horizontal md:menu-vertical rounded-box gap-3 flex justify-center">
              <li>
                {loading || error !== null ? (
                  <button className="btn btn-error btn-soft btn-disabled">
                    {loading ? (
                      <div className="loading loading-bars loading-sm"></div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                        <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                      </svg>
                    )}

                    {loading ? "Loading" : "Error Accessing PDF"}
                  </button>
                ) : (
                  <button className="btn btn-error btn-soft">
                    <a
                      href={pdfLink}
                      rel="noopener noreferrer"
                      className="flex justify-center items-center gap-2"
                      style={{ padding: "0px" }}
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-pdf"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                        <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                      </svg>
                      Access PDF
                    </a>
                  </button>
                )}
              </li>
              <li>
                {articlesLoading ||
                articlesError !== null ||
                articles.length === 0 ? (
                  <button className="btn btn-info btn-soft btn-disabled">
                    {articlesLoading ? (
                      <div className="loading loading-bars loading-sm"></div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-up-right"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                        />
                        <path
                          fillRule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                        />
                      </svg>
                    )}

                    {articlesLoading
                      ? "Loading"
                      : "No Online Archive Avaliable"}
                  </button>
                ) : (
                  <button className="btn btn-info btn-soft ">
                    <a
                      href={`https://stuyspec.com/volume/${volume}/issue/${issue}`}
                      className="flex justify-center items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-arrow-up-right"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                        />
                        <path
                          fillRule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                        />
                      </svg>
                      View on stuyspec.com
                    </a>
                  </button>
                )}
              </li>
              <li>
                <button className="btn btn-secondary btn-soft">
                  <Link
                    to={`/archive/${volume}`}
                    className="h-full w-full flex justify-center items-center"
                  >
                    Back to Volume
                  </Link>
                </button>
              </li>
            </menu>
          </div>
        </div>
        <div className="bg-base-300">
          {articlesLoading ? (
            <div className="flex justify-center p-5">
              <div className="loading loading-bars loading-xl"></div>
            </div>
          ) : articlesError !== null || articles.length === 0 ? null : (
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th>Article Title</th>
                  <th>Author</th>
                  { width < 500 ? null : <th>Department</th> } 
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((value, index) => (
                  <tr key={index}>
                    <td>{value.title}</td>
                    <td>
                      {value.contributors.map((contributor, index) =>
                        index + 1 < value.contributors.length
                          ? contributor.name + ", "
                          : contributor.name,
                      )}
                    </td>
                    { width < 500 ? null : <td>{value.section_id}</td> }
                    <td>
                      <a
                        className="link link-info"
                        href={`https://stuyspec.com/article/${value.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go To Article
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dock activePage="" />
    </Fragment>
  );
}
