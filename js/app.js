const heroArt = document.querySelector(".hero-art");
const winterScene = document.querySelector(".winter-scene");
const warmthToggle = document.querySelector(".warmth-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (
  heroArt instanceof HTMLElement &&
  winterScene instanceof HTMLElement &&
  warmthToggle instanceof HTMLButtonElement
) {
  warmthToggle.hidden = false;

  warmthToggle.addEventListener("click", () => {
    const isWarm = warmthToggle.getAttribute("aria-pressed") !== "true";
    warmthToggle.setAttribute("aria-pressed", String(isWarm));
    heroArt.classList.toggle("is-warm", isWarm);
  });

  winterScene.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || event.pointerType === "touch") return;

    const bounds = winterScene.getBoundingClientRect();
    winterScene.style.setProperty(
      "--warmth-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    winterScene.style.setProperty(
      "--warmth-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  });

  winterScene.addEventListener("pointerleave", () => {
    winterScene.style.removeProperty("--warmth-x");
    winterScene.style.removeProperty("--warmth-y");
  });
}
