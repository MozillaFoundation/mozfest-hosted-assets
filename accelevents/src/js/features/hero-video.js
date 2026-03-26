/**
 * Hero background video pause/play toggle
 *
 * Replaces the non-semantic .bee-button-content div inside #hero_video_pause_button
 * with a real <button> element to control the Vimeo background video in the hero row.
 * Requires the Vimeo Player SDK, which is loaded dynamically from the Vimeo CDN.
 *
 * Expected DOM:
 *   - Button placeholder:  #hero_video_pause_button (any element)
 *   - Video:               .bee-iframe-video-container > iframe (src must be player.vimeo.com)
 */
function initHeroVideoPauseButton() {
  const placeholder = document.getElementById("hero_video_pause_button");
  const iframe = document.querySelector(
    ".bee-iframe-video-container iframe"
  );

  const beeButtonContent = placeholder.querySelector(".bee-button-content");

  if (!placeholder || !iframe || !beeButtonContent) return;

  // Guard: only proceed if the iframe is a Vimeo player
  if (!iframe.src.includes("player.vimeo.com")) return;

  const LABEL_PAUSE = "Pause Video";
  const LABEL_PLAY = "Play Video";

  // Remove the non-semantic .bee-button-content div and insert a real <button> in its place
  const button = document.createElement("button");
  button.type = "button";
  button.id = "hero_video_pause_button_accessible";
  button.textContent = LABEL_PAUSE;
  beeButtonContent.replaceWith(button);

  const player = new window.Vimeo.Player(iframe);
  let paused = false;

  button.addEventListener("click", () => {
    if (paused) {
      player.play();
      paused = false;
      button.textContent = LABEL_PAUSE;
    } else {
      player.pause();
      paused = true;
      button.textContent = LABEL_PLAY;
    }
  });

  // Set initial label once the player is ready (video autoplays on load)
  player.ready().then(() => {
    button.textContent = LABEL_PAUSE;
  });
}

// Dynamically load the Vimeo Player SDK, then initialise the button.
// This script must be placed at the end of <body> so the DOM is ready when it runs.
const vimeoScript = document.createElement("script");
vimeoScript.src = "https://player.vimeo.com/api/player.js";
vimeoScript.onload = initHeroVideoPauseButton;
document.head.appendChild(vimeoScript);
