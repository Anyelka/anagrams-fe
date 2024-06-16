import { useState } from "react";
import arrow from "../resources/arrow.png";
import { motion, useAnimationControls } from "framer-motion";
import Words from "./Words";
import { getAnagrams } from "../agent";

const invalidInputVariant = {
  border: "3px solid red",
  color: "red",
  x: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0, -5, 0],
  transition: {
    duration: 0.5,
  },
};

function Page() {
  const resultControls = useAnimationControls();
  const input1Controls = useAnimationControls();
  const input2Controls = useAnimationControls();

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

  const handleText1Change = (e) => {
    setText1(e.target.value);
    input1Controls.start({
      border: "0px",
      color: "#00ff88",
    });
  };

  const handleText2Change = (e) => {
    setText2(e.target.value);
    input2Controls.start({
      border: "0px",
      color: "#00ff88",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text1.length === 0 || text2.length === 0) {
      if (text1.length === 0) {
        input1Controls.start(invalidInputVariant);
      }
      if (text2.length === 0) {
        input2Controls.start(invalidInputVariant);
      }
      return;
    }
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
              <motion.input
                title="Text1"
                type="text"
                class="text-input"
                value={text1}
                onChange={handleText1Change}
                placeholder="first text"
                animate={input1Controls}
              ></motion.input>
              <motion.input
                title="Text2"
                type="text"
                class="text-input"
                value={text2}
                onChange={handleText2Change}
                placeholder="second text"
                animate={input2Controls}
              ></motion.input>
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

export default Page;
