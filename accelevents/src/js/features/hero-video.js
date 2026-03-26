/**
 * Hero background video pause/play toggle
 *
 * Wires up the #hero_video_pause_button placeholder to control the Vimeo background video in the hero row.
 * Requires the Vimeo Player SDK, which is loaded dynamically from the Vimeo CDN.
 *
 * Expected DOM:
 *   - Button:  #hero_video_pause_button > .bee-button-content > span
 *   - Video:   .bee-iframe-video-container > iframe (src must be player.vimeo.com)
 */
function initHeroVideoPauseButton() {
  const button = document.getElementById("hero_video_pause_button");
  const iframe = document.querySelector(
    ".bee-iframe-video-container iframe"
  );

  if (!button || !iframe) return;

  // Guard: only proceed if the iframe is a Vimeo player
  if (!iframe.src.includes("player.vimeo.com")) return;

  const LABEL_PAUSE = "Pause Video";
  const LABEL_PLAY = "Play Video";

  const player = new window.Vimeo.Player(iframe);
  const label = button.querySelector("span");
  let paused = false;

  button.style.cursor = "pointer";

  button.addEventListener("click", () => {
    if (paused) {
      player.play();
      paused = false;
      label.textContent = LABEL_PAUSE;
    } else {
      player.pause();
      paused = true;
      label.textContent = LABEL_PLAY;
    }
  });

  // Set initial label once the player is ready (video autoplays on load)
  player.ready().then(() => {
    label.textContent = LABEL_PAUSE;
  });
}

// Dynamically load the Vimeo Player SDK, then initialise the button
const vimeoScript = document.createElement("script");
vimeoScript.src = "https://player.vimeo.com/api/player.js";
vimeoScript.onload = initHeroVideoPauseButton;
document.head.appendChild(vimeoScript);
