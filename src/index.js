import ClipboardJS from "clipboard";

import "./styles.css";

const Plugin = () => {
  const getCodeBlocks = function (codeblocks) {
    const buildStructure = function (codeblock) {
      let button = document.createElement("button");
      button.className = "run-code";
      button.innerHTML = "Run";
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
        return trigger.parentElement.firstChild;
      },
    });

    clipboard.on("success", function (e) {
      e.clearSelection();
      eval(e.text);
    });
  };

  const init = function (deck) {
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
