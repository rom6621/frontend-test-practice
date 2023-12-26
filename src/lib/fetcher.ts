import { HttpError } from "@/errors";

type FetchMethod = "GET" | "POST";

const HOST = "https://dev-datti.haebeal.net";
export const fetcher = async <T>(
  path: string,
  method: FetchMethod = "GET",
  body?: unknown,
) => {
  const endpoint = `${HOST}/${path}`;

  const response = await fetch(endpoint, {
    method,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new HttpError(response);
  }

  const data = await response.json();
  return data as T;
};
