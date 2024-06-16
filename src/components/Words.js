import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { getAllAnagrams } from "../agent";
import arrow from "../resources/play.png";

const Words = ({ words }) => {
  const [wordOpen, setWordOpen] = useState("");
  const [wordAnagrams, setWordAnagrams] = useState([]);

  const otherWordOpen = (word) => {
    return wordOpen.length !== 0 && wordOpen !== word;
  };

  const toggle = (word) => {
    wordOpen === word ? close() : open(word);
  };

  const open = async (word) => {
    setWordOpen(word);
    const response = await getAllAnagrams(word, words);
    setWordAnagrams(response.data);
  };

  const close = () => setWordOpen("");

  const renderAnagrams = (word) => {
    return (
      <div>
        {wordAnagrams && wordAnagrams.length > 0 ? (
          <ul>
            {wordAnagrams.map((anagram, index) => (
              <motion.li
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, type: "just" }}
              >
                {anagram}
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ color: "red" }}
          >
            No anagrams :(
          </motion.h2>
        )}
      </div>
    );
  };

  const renderWord = (word) => {
    if (otherWordOpen(word)) {
      return;
    }
    const open = wordOpen === word;
    return (
      <>
        <motion.li
          initial={{ y: -20, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          className="word-entry"
          whileHover={
            open
              ? { backgroundColor: "#ffa600" }
              : { backgroundColor: "#fbff00" }
          }
          onClick={() => toggle(word)}
          layout
        >
          <AnimatePresence>
            {open && (
              <motion.img
                src={arrow}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, rotate: 180 }}
                className="back-button"
              ></motion.img>
            )}
          </AnimatePresence>

          {word}
        </motion.li>
        {open && renderAnagrams(word)}
      </>
    );
  };

  return <ul>{words.map((word) => renderWord(word))}</ul>;
};

export default Words;
