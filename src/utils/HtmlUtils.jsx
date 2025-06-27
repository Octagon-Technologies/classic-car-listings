export const makeInputVisible = (e) => {
  // Scroll so the input is visible
  setTimeout(() => {
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300); // Slight delay to wait for the keyboard to appear (especially on mobile);
};
