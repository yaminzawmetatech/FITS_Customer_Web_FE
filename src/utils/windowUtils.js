// windowUtils.js

const openNewWindow = (url, windowName = "_blank") => {
  const win = window.open(url, windowName);
  if (win) {
    win.focus();
  }
};

export default openNewWindow;
