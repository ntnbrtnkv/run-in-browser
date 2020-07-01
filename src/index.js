import ClipboardJS from "clipboard";

import "./styles.css";

const Plugin = () => {
  const getCodeBlocks = function (codeblocks) {
    const buildStructure = function (codeblock) {
      let wrapper = document.createElement("div");
      wrapper.classList.add("codeblock");
      codeblock.parentNode.insertBefore(wrapper, codeblock);
      wrapper.appendChild(codeblock);
      let button = document.createElement("button");
      button.innerHTML = "Run";
      wrapper.insertBefore(button, codeblock);
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

    let clipboard = new ClipboardJS(".codeblock > button", {
      target: function (trigger) {
        return trigger.nextElementSibling.firstChild;
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
