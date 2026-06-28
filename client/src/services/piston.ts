import axios from "axios";

const API = "https://emkc.org/api/v2/piston/execute";

export async function executeCode(
  language: string,
  version: string,
  code: string
) {
  const { data } = await axios.post(API, {
    language,
    version,
    files: [
      {
        content: code,
      },
    ],
  });

  return data.run;
}