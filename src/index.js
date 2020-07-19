import ClipboardJS from "clipboard";

import "./styles.css";

const CURRENT_FRAGMENT_SELECTOR = '.current-fragment';

const Plugin = () => {
  let options;
  let deck;

  const getCodeBlocks = function (codeblocks) {
    const buildStructure = function (codeblock) {
      let button = document.createElement("button");
      button.className = "run-code";
      button.innerHTML = options.text;
      codeblock.appendChild(button);
    };

    codeblocks.forEach((codeblock) => {
      if (
        codeblock.getAttribute("data-runnable") &&
        codeblock.getAttribute("data-runnable") === "false"
      ) {
        return;
      } else if (!codeblock.parentNode.classList.contains("codeblock")) {
        buildStructure(codeblock);
      }
    });

    let clipboard = new ClipboardJS(".run-code", {
      target: function (trigger) {
        const curFragment = trigger.parentElement.querySelector(CURRENT_FRAGMENT_SELECTOR);
        return curFragment ? curFragment : trigger.parentElement.firstChild;
      },
    });

    clipboard.on("success", function (e) {
      e.clearSelection();
      const code = e.text;
      options.run({cb: (passedCode) => eval(passedCode || code), deck, code });
    });
  };

  const init = function (reveal) {
    const defaultOptions = {
      run: (cb) => cb(),
      text: "&#9654;"
    };

    deck = reveal;

    options = {
      ...defaultOptions,
      ...deck.getConfig()["run-in-browser"],
    };

    let codeblocks = deck.getRevealElement().querySelectorAll("pre");

    if (codeblocks.length > 0) {
      getCodeBlocks(codeblocks);
    }
  };

  return {
    id: "run-in-browser",
    init: init,
  };
};

export default Plugin;
