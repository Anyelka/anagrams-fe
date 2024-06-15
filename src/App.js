import "./App.css";
import { useState } from "react";
import arrow from "./resources/arrow.png";
import { motion, useAnimationControls } from "framer-motion";
import Words from "./components/Words";
import { getAnagrams } from "./agent";

function App() {
  const resultControls = useAnimationControls();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [areAnagrams, setAreAnagrams] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [words, setWords] = useState([]);

  const addWords = (word1, word2) => {
    const newWords = [];
    !words.includes(word1) && newWords.push(word1);
    !words.includes(word2) && newWords.push(word2);
    newWords.length > 0 && setWords([...words, ...newWords]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    initialized && (await resultControls.start({ scale: 0 }));

    const response = await getAnagrams(text1, text2);
    setAreAnagrams(response.data);
    !initialized && setInitialized(true);

    await resultControls.start({ scale: 1 });
    addWords(text1, text2);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left-side-container">
          <motion.form
            id="input-form"
            class="input-form"
            onSubmit={handleSubmit}
            layout
          >
            <div id="text-inputs" class="text-inputs">
              <input
                title="Text1"
                type="text"
                class="text-input"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="first text"
              ></input>
              <input
                title="Text2"
                type="text"
                class="text-input"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="second text"
              ></input>
            </div>
            <motion.button
              type="submit"
              class="submit-button"
              whileHover={{ scale: 1.1 }}
            >
              <motion.img
                src={arrow}
                class="submit-button-image"
                whileTap={{ scale: 1.5 }}
              ></motion.img>
            </motion.button>
          </motion.form>

          {initialized && (
            <motion.div
              id="result"
              className="result"
              animate={resultControls}
              style={{ color: areAnagrams ? "green" : "red" }}
            >
              {
                <h1 style={{ color: areAnagrams ? "green" : "red" }}>
                  {areAnagrams ? "ANAGRAMS!" : "Not anagrams..."}
                </h1>
              }
            </motion.div>
          )}
        </div>
        <motion.div className="right-side-container">
          <Words words={words} />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
