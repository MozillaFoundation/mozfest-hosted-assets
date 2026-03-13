function sendHeight() {
  const card = document.querySelector(".speaker-card");
  const height = card ? card.scrollHeight : document.body.scrollHeight;
  window.parent.postMessage({ type: "resize", height }, "*");
}

window.addEventListener("load", sendHeight);

const target = document.querySelector(".speaker-card") ?? document.body;
new ResizeObserver(sendHeight).observe(target);
