const SPEAKER_WIDGET_IFRAME_SELECTOR =
  "#module_f6f9247e-e182-4e1a-a3ca-1d2c68f5b350 iframe";

window.addEventListener("message", (event) => {
  console.log("message received:", event.data);
  if (event.data?.type === "resize") {
    const iframe = document.querySelector(SPEAKER_WIDGET_IFRAME_SELECTOR);
    console.log("iframe found:", iframe);
    iframe.style.height = event.data.height + "px";
    const wrapper = document.getElementById("widgetContainer");
    if (wrapper) wrapper.style.height = event.data.height + "px";
  }
});
