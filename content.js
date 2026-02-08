let isFlashlightOn = false;
let flashlightOverlay = null;

// Default Settings
let currentSize = "250px";
let currentDarkness = "0.6";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "get_status") {
    sendResponse({ isOn: isFlashlightOn });
  }
  else if (message.command === "turn_on") {
    if (message.setting) updateSettingsLocally(message.setting);
    enableFlashlight();
  } 
  else if (message.command === "turn_off") {
    disableFlashlight();
  }
  else if (message.command === "update_settings") {
    if (message.setting) updateSettingsLocally(message.setting);
    updateStyles();
  }
});

function updateSettingsLocally(settings) {
  currentSize = settings.size + "px";
  currentDarkness = settings.darkness;
}

function enableFlashlight() {
  if (isFlashlightOn) return;

  // 1. Create the Visual Overlay
  flashlightOverlay = document.createElement("div");
  flashlightOverlay.id = "focus-flashlight";
  document.body.appendChild(flashlightOverlay);
  
  // 2. Add the class that enables the Paragraph Animation
  document.body.classList.add("focus-mode-active");

  updateStyles();
  
  // Fade in
  setTimeout(() => flashlightOverlay.classList.add("active"), 10);
  
  // Start tracking
  document.addEventListener("mousemove", moveLight);
  isFlashlightOn = true;
}

function disableFlashlight() {
  if (!isFlashlightOn) return;

  // 1. Remove the Visual Overlay
  if (flashlightOverlay) flashlightOverlay.remove();
  
  // 2. Remove the class (Stops the animation)
  document.body.classList.remove("focus-mode-active");

  document.removeEventListener("mousemove", moveLight);
  isFlashlightOn = false;
}

function updateStyles() {
  if (flashlightOverlay) {
    flashlightOverlay.style.setProperty('--radius', currentSize);
    flashlightOverlay.style.setProperty('--darkness', currentDarkness);
  }
}

function moveLight(e) {
  if (flashlightOverlay) {
    flashlightOverlay.style.setProperty('--x', e.clientX + 'px');
    flashlightOverlay.style.setProperty('--y', e.clientY + 'px');
  }
}