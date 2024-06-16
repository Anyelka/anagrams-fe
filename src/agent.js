import axios from "axios";

const requestProps = (data, url) => {
  return {
    method: "POST",
    /* url: "https://europe-west3-anagrams-426317.cloudfunctions.net/anagrams-cloud", */
    url,
    data,
    headers: {
      /* Authorization:
          "bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWJlNDEzYjIyNjhhZTk3NjQ1OGM4MmMxNTE3OTU0N2U5NzUyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1NTgwMjg2NTg1NjU2NTE3NTc3IiwiZW1haWwiOiJhcm1hZ2VkZG9udG0yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTkpmenB0QWozNDc2eUlOWWhlMkhzdyIsImlhdCI6MTcxODM3OTQ0OCwiZXhwIjoxNzE4MzgzMDQ4fQ.M1l-PIgO9MT96H7rwtGzDJDSz1YnXd5GiQahQ8CXrFGKaRAXqTRwLckHHKRpJAaF5ti43r59xUu3ADjjnx-pV50Kvrv5UjLPPGww7eVpIBtUMKag3DztDO7Fwx2F795uXDAbihYjlKtmZcuFmrni1odh397lP_QatCA3YTM1um-VD3H6miJtN-2J7MaZpGAmIt1LS070qJBrbnbP0b4LsSIJbB9BrwrPMQPp--KC3YW6wLTb2xNJZ815ea57oUS87tT3cYV3jvU4nfUI0GW7ZrnDpi3PEeXq5IEfJcstjIJTcxrE4vpzY37dYnOyUZgvgPx5X5-b26czuHr-TL_ueA", */
      "Content-Type": "application/json",
    },
  };
};

const anagramsProps = (text1, text2) => {
  /* return requestProps({ text1, text2 }, "http://localhost:8080"); */
  return requestProps(
    { text1, text2 },
    "https://europe-west3-anagrams-426317.cloudfunctions.net/anagrams-cloud"
  );
};

export const getAnagrams = async (text1, text2) => {
  let result;
  try {
    result = await axios.request(anagramsProps(text1, text2));
  } catch (error) {
    console.error(error);
  }
  return result;
};

const allAnagramsProps = (text, texts) => {
  /* return requestProps({ text, texts }, "http://localhost:8081"); */
  return requestProps(
    { text, texts },
    "https://europe-west3-anagrams-426317.cloudfunctions.net/anagrams-cloud-2"
  );
};

export const getAllAnagrams = async (text, texts) => {
  let result;
  try {
    result = await axios.request(allAnagramsProps(text, texts));
  } catch (error) {
    console.error(error);
  }
  return result;
};
