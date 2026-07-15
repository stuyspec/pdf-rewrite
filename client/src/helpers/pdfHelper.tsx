import {
  TOO_MANY_REQUESTS,
  type PaperResponse,
  type ReturnStatement,
} from "./interfaces";

let API_URL = "";
if (!import.meta.env.MODE || import.meta.env.MODE === "development") {
  console.log("Dev");
  API_URL = "http://localhost:5000/api/pdf";
} else {
  console.log("Production");
  API_URL = "/api/pdf";
}

export async function getVolumes(): Promise<ReturnStatement> {
  try {
    const response = await fetch(API_URL + "/volumes");

    if (response.status === TOO_MANY_REQUESTS)
      return {
        response: null,
        errorMessage: null,
        status: 429,
      };

    if (!response.ok) throw new Error("Problem fetching volumes.");
    const volumes: number[] = await response.json();
    return {
      response: volumes,
      errorMessage: null,
    };
  } catch (err: any) {
    return {
      response: null,
      errorMessage: err.message,
    };
  }
}

export async function getIssues(volume: number): Promise<ReturnStatement> {
  try {
    const response = await fetch(API_URL + "/" + volume);

    if (response.status === TOO_MANY_REQUESTS)
      return {
        response: null,
        errorMessage: null,
        status: 429,
      };

    if (!response.ok) throw new Error("Problem fetching issues.");
    const issues: PaperResponse[] = await response.json();

    const issuesStripped = issues.map((value) => value.issue);
    return {
      response: issuesStripped,
      errorMessage: null,
    };
  } catch (err: any) {
    return {
      response: null,
      errorMessage: err.message,
    };
  }
}

export async function getPdf(
  volume: number,
  issue: number,
): Promise<ReturnStatement> {
  try {
    const response = await fetch(API_URL + "/" + volume + "/" + issue);

    if (!response.ok) throw new Error("Problem fetching the PDF link");
    const pdf: PaperResponse[] = await response.json();
    return {
      response: pdf[0].pdfLink,
      errorMessage: null,
    };
  } catch (err: any) {
    return {
      response: null,
      errorMessage: err.message,
    };
  }
}
