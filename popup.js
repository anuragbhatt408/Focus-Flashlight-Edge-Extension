document.addEventListener('DOMContentLoaded', () => {
  const sizeSlider = document.getElementById('size');
  const darknessSlider = document.getElementById('darkness');
  const btnOn = document.getElementById('btn-on');
  const btnOff = document.getElementById('btn-off');
  
  // --- FIX START: Add Close Button Logic ---
  const btnClose = document.getElementById('btn-close');
  
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      window.close(); // This closes the popup
    });
  }
  // --- FIX END ---

  // 1. Initial State Check
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "get_status" }, (response) => {
        if (chrome.runtime.lastError) {
          console.log("Not a valid page");
          return; 
        }
        
        if (response && response.isOn) {
          showOffButton();
        } else {
          showOnButton();
        }
      });
    }
  });

  function showOffButton() {
    btnOn.classList.remove('active');
    btnOff.classList.add('active');
  }

  function showOnButton() {
    btnOff.classList.remove('active');
    btnOn.classList.add('active');
  }

  function sendUpdate(command) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.id) return;

      chrome.tabs.sendMessage(activeTab.id, { 
        command: command, 
        setting: { size: sizeSlider.value, darkness: darknessSlider.value }
      });
    });
  }

  // --- Button Listeners ---
  btnOn.addEventListener('click', () => {
    sendUpdate("turn_on");
    showOffButton();
  });

  btnOff.addEventListener('click', () => {
    sendUpdate("turn_off");
    showOnButton();
  });

  sizeSlider.addEventListener('input', () => sendUpdate("update_settings"));
  darknessSlider.addEventListener('input', () => sendUpdate("update_settings"));
});