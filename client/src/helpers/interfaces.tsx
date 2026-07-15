export interface PaperResponse {
  issue: number;
  pdfLink: string;
  volume: number;
}

export interface ReturnStatement {
  response: any;
  errorMessage: string | null;
  status?: number;
}


const TOO_MANY_REQUESTS: number = 429;
export { TOO_MANY_REQUESTS };