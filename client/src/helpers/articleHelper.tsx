import type { ObjectId } from "mongodb";
import { TOO_MANY_REQUESTS, type ReturnStatement } from "./interfaces";

let API_URL = "";
if (!import.meta.env.MODE || import.meta.env.MODE === "development") {
  console.log("Dev");
  API_URL = "http://localhost:5000/api/article";
} else {
  console.log("Production");
  API_URL = "/api/article";
}

export async function getArticles(
  volume: number,
  issue: number,
): Promise<ReturnStatement> {
  try {
    const response = await fetch(API_URL + "/" + volume + "/" + issue);

    if (response.status === TOO_MANY_REQUESTS)
      return {
        response: null,
        errorMessage: null,
        status: 429,
      };

    if (!response.ok) throw new Error("Problem fetching articles.");
    const articles = await response.json();
    return {
      response: articles,
      errorMessage: null,
    };
  } catch (err: any) {
    return {
      response: null,
      errorMessage: err.message,
    };
  }
}

export async function getStaff(staffID: ObjectId): Promise<ReturnStatement> {
  try {
    const response = await fetch("API_URL" + "/staff/" + staffID);

    if (!response.ok) throw new Error("Problem fetching staff.");
    const staff = await response.json();
    return {
      response: staff,
      errorMessage: null,
    };
  } catch (err: any) {
    return {
      response: null,
      errorMessage: err.message,
    };
  }
}
