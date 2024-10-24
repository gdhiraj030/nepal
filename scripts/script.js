// Disable right-click context menu
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Disable drag and drop
document.addEventListener("dragstart", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});

// Disable image selection
document.addEventListener("selectstart", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
