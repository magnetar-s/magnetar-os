// document.body.addEventListener("click", (e) => {
//   console.log("Clicked on:", e.target);
// });

// shout down
function shoutDown() {
  const video = document.getElementById("shoutdown");
  const powerBtn = document.querySelector(".power-icon");

  powerBtn.addEventListener("click", () => {
    video.style.display = "block";
  });
}
shoutDown();

// refresh
function refresh() {
  const refreshBtn = document.getElementById("refreshOption");
  const refreshPage = document.getElementById("refresh");

  refreshBtn.addEventListener("click", () => {
    refreshPage.style.display = "block";

    setTimeout(() => {
      refreshPage.style.display = "none";
    }, 100);
  });
}
refresh();

// start weather status
function weather() {
  // API Key & City
  let key = "f7f9eaf95dee4eff8de103014251506";
  let city = "Yellapur";

  // Weather elements
  let temp = document.querySelector(".task-weather .weather-info h2");
  let condition = document.querySelector(".task-weather .weather-info h3");

  // weather
  async function weatherApiCall() {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
    );
    let data = await response.json();

    temp.innerHTML = `${data.current.temp_c}°C`;
    condition.innerHTML = `${data.current.condition.text}`;
  }

  weatherApiCall();
}
weather();
// end weather status
// /////////////////////////////////////////////////////////////////////

// start battery / volume / wifi / time /date
// Battery status
function battery() {
  const batteryIcon = document.getElementById("battery-icon");
  const batteryStatus = document.querySelector(
    ".wsb .wsb-status .battery-status p"
  );

  navigator.getBattery().then(function (battery) {
    let hoverTimeout;

    function updateAll() {
      const level = Math.round(battery.level * 100);

      if (battery.charging) {
        batteryIcon.className = "ri-battery-charge-line";
      } else {
        if (level >= 80) {
          batteryIcon.className = "ri-battery-fill";
        } else if (level >= 30) {
          batteryIcon.className = "ri-battery-low-line";
        } else {
          batteryIcon.className = "ri-battery-line";
        }
      }

      batteryStatus.innerHTML = battery.charging
        ? `Battery status: (${level}%) remaining`
        : `Battery status: ${level}% remaining`;
    }

    updateAll();

    battery.addEventListener("levelchange", updateAll);
    battery.addEventListener("chargingchange", updateAll);

    // Hover effect with delay logic
    batteryIcon.addEventListener("mouseover", () => {
      hoverTimeout = setTimeout(() => {
        batteryStatus.style.opacity = "1";
      }, 700);
    });

    batteryIcon.addEventListener("mouseout", () => {
      clearTimeout(hoverTimeout);
      batteryStatus.style.opacity = "0";
    });
  });
}
battery();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// volume status
function volumeSystem() {
  let audio = document.getElementById("player");
  let volumeIconWrapper = document.getElementById("volume-icon");
  let volumeIcon = volumeIconWrapper.querySelector("i");
  let volumeStatus = document.querySelector(
    ".wsb .wsb-status .volume-status p"
  );
  let hoverTimeout;
  function updateVolumeIconAndText() {
    let volumePercent = Math.round(audio.volume * 100);
    volumeStatus.textContent = `Speakers: ${volumePercent}%`;

    if (volumePercent >= 60) {
      volumeIcon.className = "ri-volume-up-line";
    } else if (volumePercent > 0) {
      volumeIcon.className = "ri-volume-down-line";
    } else {
      volumeIcon.className = "ri-volume-mute-line";
    }
  }

  updateVolumeIconAndText();

  audio.addEventListener("volumechange", updateVolumeIconAndText);

  volumeIconWrapper.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      volumeStatus.style.opacity = "1";
    }, 700);
  });
  volumeIconWrapper.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    volumeStatus.style.opacity = "0";
  });
}
volumeSystem();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// time / date
function timeDate() {
  let time = document.querySelector(".time-date .time-ampm .time h2");
  let ampm = document.querySelector(".time-date .time-ampm .ampm h2");
  let fullDate = document.querySelector(".time-date .date h2");
  let notifyTime = document.querySelector("#notifyDownTab #clock p");
  let weekDateYear = document.querySelector("#notifyDownTab #day p");

  function timedate() {
    let daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let totalMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let dinanka = date.getDate();
    let day = daysOfWeek[date.getDay()];
    let month = date.getMonth();
    let monthInName = totalMonths[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let cnvrtampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    time.innerHTML = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    ampm.innerHTML = `${cnvrtampm}`;

    fullDate.innerHTML = `${String(dinanka).padStart(2, "0")}-${String(
      month + 1
    ).padStart(2, "0")}-${year}`;

    notifyTime.innerHTML = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} Today`;

    weekDateYear.innerHTML = `${day}, ${dinanka} ${monthInName}`;
  }

  setInterval(timedate, 1000);
}
timeDate();
// end battery / volume / wifi / time.
// ///////////////////////////////////////////////////////////////

// focus mode time set
function focusMode() {
  const minutesElement = document.querySelector("#focus h2");
  const sub = document.getElementById("sub");
  const add = document.getElementById("add");

  const maxMinutes = 60;
  const minMinutes = 15;

  add.addEventListener("click", () => {
    let currentMinutes = parseInt(minutesElement.innerText);
    if (currentMinutes < maxMinutes) {
      minutesElement.innerText = currentMinutes + 15;
    }
  });

  sub.addEventListener("click", () => {
    let currentMinutes = parseInt(minutesElement.innerText);
    if (currentMinutes > minMinutes) {
      minutesElement.innerText = currentMinutes - 15;
    }
  });
}

focusMode();

function timeDate() {
  let time = document.querySelector(".time-date .time-ampm .time h2");
  let ampm = document.querySelector(".time-date .time-ampm .ampm h2");
  let fullDate = document.querySelector(".time-date .date h2");
  let notifyTime = document.querySelector("#notifyDownTab #clock p");
  let weekDateYear = document.querySelector("#notifyDownTab #day p");

  function timedate() {
    let daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let totalMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let dinanka = date.getDate();
    let day = daysOfWeek[date.getDay()];
    let month = date.getMonth();
    let monthInName = totalMonths[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let cnvrtampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    time.innerHTML = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    ampm.innerHTML = `${cnvrtampm}`;

    fullDate.innerHTML = `${String(dinanka).padStart(2, "0")}-${String(
      month + 1
    ).padStart(2, "0")}-${year}`;

    notifyTime.innerHTML = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} Today`;

    weekDateYear.innerHTML = `${day}, ${dinanka} ${monthInName}`;
  }

  setInterval(timedate, 1000);
}
timeDate();

// ////////////////////////////////////////////////////////////////////
// start task bar icons animation
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// windows icon
function winIconAnimation() {
  let winText = document.querySelector(".icon-window .opentab-title .title p");
  let winButton = document.querySelector(".icon-window");
  let winImg = document.querySelector(".icon-window .win-img img");
  let winOpenTab = document.querySelector(".opentab");
  let display = document.querySelector(".desktop-screen");
  let hoverTimeout;

  winButton.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      winText.style.opacity = "1";
    }, 700);
  });

  winButton.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    winText.style.opacity = "0";
  });

  // ^^^^^^^^^^
  winButton.addEventListener("click", (e) => {
    e.stopPropagation();
    winOpenTab.classList.toggle("open");
  });

  display.addEventListener("click", (e) => {
    winOpenTab.classList.remove("open");
  });

  // ^^^^^^^^^^
  winOpenTab.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  winOpenTab.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
  });
  // ^^^^^^^^^^^^^^
  winButton.addEventListener("pointerdown", () => {
    winImg.style.scale = "0.8";
  });

  winButton.addEventListener("pointerup", () => {
    winImg.style.scale = "1";
  });

  winButton.addEventListener("pointerleave", () => {
    winImg.style.scale = "1";
  });
}
winIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// search input
function searchAnimation() {
  let searchText = document.querySelector(
    ".icon-search .search-title .title p"
  );
  let searchInput = document.querySelector(".icon-search .search-input");
  let hoverTimeout;

  searchInput.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      searchText.style.opacity = "1";
    }, 700);
  });
  searchInput.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    searchText.style.opacity = "0";
  });
}
searchAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// copilote icon
// function copiloteIconAnimation() {
//   let copiloteIconBox = document.querySelector(".task-icon .icon-copilot");
//   let copiloteIcon = document.querySelector(
//     ".task-icon .icon-copilot .copilot-img img"
//   );
//   let copilotTitle = document.querySelector(
//     ".icon-copilot .copilot-tab .copilot-title p"
//   );
//   let flag = 0;
//   let hoverTimeout;

//   copiloteIcon.addEventListener("mouseover", () => {
//     hoverTimeout = setTimeout(() => {
//       copilotTitle.style.opacity = "1";
//     }, 700);
//   });

//   copiloteIcon.addEventListener("mouseout", () => {
//     clearTimeout(hoverTimeout);
//     copilotTitle.style.opacity = "0";
//   });

//   copiloteIconBox.addEventListener("click", () => {
//     copiloteIcon.style.scale = "0.8";

//     setTimeout(() => {
//       copiloteIcon.style.scale = "1";

//       copiloteIcon.style.transform =
//         flag === 0 ? "translateY(5px)" : "translateY(-5px)";
//     }, 100);

//     setTimeout(() => {
//       copiloteIcon.style.transform = "translateY(0px)";
//     }, 300);

//     flag = flag === 0 ? 1 : 0;
//   });
// }
// copiloteIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ///////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////
// chatgpt icon
function chatgptIconAnimation() {
  let chatgptIconBox = document.querySelector(".task-icon .icon-chatgpt");
  let chatgptIcon = document.querySelector(
    ".task-icon .icon-chatgpt .chatgpt-img img"
  );
  let chatgptTitle = document.querySelector(
    ".icon-chatgpt .chatgpt-tab .gpt-title p"
  );
  const gptCloseBtn = document.getElementById("gptCloseBtn");
  const chatgptTab = document.querySelector(".chatGptTab");
  // /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  let flag = 0;
  let hoverTimeout;
  let mode = "slid";

  // hover effect
  chatgptIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      chatgptTitle.style.opacity = "1";
    }, 700);
  });

  chatgptIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    chatgptTitle.style.opacity = "0";
  });

  // open /close animation
  function playIconAnimation() {
    chatgptIcon.style.scale = "0.8";

    setTimeout(() => {
      chatgptIcon.style.scale = "1";
      chatgptIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      chatgptIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  }

  // Open tab
  function gptOpenTab() {
    chatgptTab.classList.add("show");

    if (mode === "slide") {
      chatgptTab.style.bottom = "80px";
      chatgptTab.style.opacity = "1";
      chatgptTab.style.pointerEvents = "auto";
    } else {
      chatgptTab.style.opacity = "1";
      chatgptTab.style.pointerEvents = "auto";
    }
  }

  // Close tab
  function gptCloseTab() {
    chatgptTab.classList.remove("show");

    if (mode === "slide") {
      chatgptTab.style.bottom = "-400px";
    } else {
      // Keep fullscreen or center layout, but move it down
      chatgptTab.style.bottom = "80px"; // temporarily reset bottom

      // remove top/left/transform so bottom works
      chatgptTab.style.top = "";
      chatgptTab.style.left = "";
      chatgptTab.style.transform = "";

      // Don't touch width/height — keep fullscreen size

      // Force reflow to re-trigger transition
      void chatgptTab.offsetWidth;

      // Slide down
      chatgptTab.style.bottom = "-400px";
    }

    // Hide visually
    chatgptTab.style.opacity = "0";
    chatgptTab.style.pointerEvents = "none";
  }

  // Toggle on icon click
  chatgptIconBox.addEventListener("click", () => {
    const isOpen = chatgptTab.classList.contains("show");

    if (isOpen) {
      // chatgptTab();
      gptCloseTab();
    } else {
      gptOpenTab();
    }
    playIconAnimation();
  });

  // close button
  gptCloseBtn.addEventListener("click", () => {
    // chatgptTab();
    gptCloseTab();
    playIconAnimation();
  });

  window.chatgptTabMode = (newMode) => {
    mode = newMode; // 'slide' | 'center' | 'fullscreen'
  };

  // Close tab on resize
  window.addEventListener("resize", () => {
    gptCloseTab();
  });
}
chatgptIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// chatGptTab resize screen
function chatGptResizeScreen() {
  const gptResize = document.getElementById("gptResize");
  const chatGptTab = document.querySelector(".chatGptTab");
  const gptHeader = document.querySelector(".chatGptTab .gptHeader");
  const askGpt = document.querySelector(
    ".chatGptTab .gptWorkSpace .chatContainer .askGpt"
  );
  const gptInput = document.querySelector(
    ".chatGptTab .gptWorkSpace .chatContainer .askGpt .input"
  );
  const gptChatBox = document.querySelector(
    ".chatGptTab .gptWorkSpace .chatContainer .askGpt .chatBox"
  );

  let flag = true;

  function toggleResize() {
    if (flag) {
      // Small screen
      chatGptTab.style.width = "50%";
      chatGptTab.style.height = "60%";
      chatGptTab.style.left = "50%";
      chatGptTab.style.top = "50%";
      chatGptTab.style.transform = "translate(-50%, -50%)";
      chatGptTab.style.bottom = "auto";
      window.setchatGptTabMode?.("center");

      gptChatBox.style.marginTop = "20px";
      gptChatBox.style.height = "60%";
      gptInput.style.width = "410px";
      gptInput.style.bottom = "50px";
      askGpt.style.height = "250px";
      chatGptTab.classList.add("vsCodePadding");
      chatGptTab.classList.add("vscode-small");
      chatGptTab.style.borderRadius = "10px";
    } else {
      // Fullscreen

      chatGptTab.style.width = "100%";
      chatGptTab.style.height = "100%";
      chatGptTab.style.left = "0";
      chatGptTab.style.top = "0";
      chatGptTab.style.transform = "none";
      chatGptTab.style.bottom = "auto";
      window.setchatGptTabMode?.("fullscreen");

      gptChatBox.style.marginTop = "35px";
      gptChatBox.style.height = "72%";
      gptInput.style.bottom = "90px";
      gptInput.style.width = "850px";
      askGpt.style.height = "72%";
      chatGptTab.classList.remove("vsCodePadding");
      chatGptTab.classList.remove("vscode-small");
      chatGptTab.style.borderRadius = "0";
    }

    flag = !flag;
  }

  // Trigger on click
  gptResize.addEventListener("click", toggleResize);

  // Trigger on double-click
  gptHeader.addEventListener("dblclick", toggleResize);
}
chatGptResizeScreen();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// chatGptTab dragable
function dragGptCode() {
  const gptHeader = document.querySelector(".gptHeader");
  const chatGptTab = document.querySelector(".chatGptTab");
  const dontDragElem = document.querySelectorAll(
    ".chatGptTab .gptHeader .gptIcon, .chatGptTab .gptHeader .closeGpt"
  );

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  gptHeader.addEventListener("mousedown", (e) => {
    for (let elem of dontDragElem) {
      if (elem.contains(e.target)) {
        return; // cancel dragging
      }
    }

    const chatGptRect = chatGptTab.getBoundingClientRect();
    const parentRect = chatGptTab.offsetParent.getBoundingClientRect();

    const isFullScreen =
      Math.round(chatGptRect.width) >= Math.round(parentRect.width) &&
      Math.round(chatGptRect.height) >= Math.round(parentRect.height);

    if (isFullScreen) return;

    isDragging = true;
    offsetX = e.clientX - chatGptRect.left;
    offsetY = e.clientY - chatGptRect.top;

    chatGptTab.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    chatGptTab.style.left = `${e.clientX - offsetX}px`;
    chatGptTab.style.top = `${e.clientY - offsetY}px`;
    chatGptTab.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    chatGptTab.style.transition = "";
  });
}
dragGptCode();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// chat gpt ai feature
function chatGptAIFun() {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const input = userInput.value.trim();
      if (input === "") return;

      addMessage("You", input);
      respondTo(input);
      userInput.value = "";
    }
  });

  function addMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function respondTo(input) {
    let reply = "Upgrade your plan to access advanced features!";

    if (input.includes("hello")) reply = "Hi Magnetar!";
    else if (input.includes("your name")) reply = "I'm your AI Buddy.";
    else if (input.includes("time"))
      reply = "It's " + new Date().toLocaleTimeString();
    else if (input.includes("date" || "day"))
      reply = "Today is " + new Date().toLocaleDateString();
    else if (input.includes("sheryians" || "sheriyans"))
      reply =
        "⪼ Sheryians Coding School is a vibrant platform helping students and enthusiasts learn programming in the most practical and creative way. </br>⪼ Master web development, design, and coding fundamentals with hands-on projects and real-world guidance at Sheryians Coding School. </br> ⪼ At Sheryians, we turn code into confidence – one project at a time. </br> ⪼ to know more :  https://www.sheryians.com/";

    setTimeout(() => addMessage("Bot", reply), 500);
  }
}
chatGptAIFun();
// //////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////
// edge icon
// function edgeIconAnimation() {
//   let edgeIconBox = document.querySelector(".task-icon .icon-edge");
//   let edgeIcon = document.querySelector(".task-icon .icon-edge .edge-img img");
//   let edgeTitle = document.querySelector(".icon-edge .edge-tab .edge-title p");
//   let flag = 0;
//   let hoverTimeout;

//   edgeIcon.addEventListener("mouseover", () => {
//     hoverTimeout = setTimeout(() => {
//       edgeTitle.style.opacity = "1";
//     }, 700);
//   });

//   edgeIcon.addEventListener("mouseout", () => {
//     clearTimeout(hoverTimeout);
//     edgeTitle.style.opacity = "0";
//   });

//   edgeIconBox.addEventListener("click", () => {
//     edgeIcon.style.scale = "0.8";

//     setTimeout(() => {
//       edgeIcon.style.scale = "1";
//       edgeIcon.style.transform =
//         flag === 0 ? "translateY(5px)" : "translateY(-5px)";
//     }, 100);

//     setTimeout(() => {
//       edgeIcon.style.transform = "translateY(0px)";
//     }, 300);

//     flag = flag === 0 ? 1 : 0;
//   });
// }
// edgeIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// /////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////
// brave icon
function braveIconAnimation() {
  let braveIconBox = document.querySelector(".task-icon .icon-brave");
  let braveIcon = document.querySelector(
    ".task-icon .icon-brave .brave-img img"
  );
  let braveTitle = document.querySelector(
    ".icon-brave .brave-tab .brave-title p"
  );
  const braveCloseBtn = document.getElementById("braveCloseBtn");
  const braveTab = document.querySelector(".braveBrowser");
  // /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  let flag = 0;
  let hoverTimeout;
  let mode = "slid";

  // hover effect
  braveIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      braveTitle.style.opacity = "1";
    }, 700);
  });

  braveIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    braveTitle.style.opacity = "0";
  });

  // open /close animation
  function playIconAnimation() {
    braveIcon.style.scale = "0.8";

    setTimeout(() => {
      braveIcon.style.scale = "1";
      braveIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      braveIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  }

  // Open tab
  function braveOpenTab() {
    braveTab.classList.add("show");

    if (mode === "slide") {
      braveTab.style.bottom = "80px";
      braveTab.style.opacity = "1";
      braveTab.style.pointerEvents = "auto";
    } else {
      braveTab.style.opacity = "1";
      braveTab.style.pointerEvents = "auto";
    }
  }

  // Close tab
  function braveCloseTab() {
    braveTab.classList.remove("show");

    if (mode === "slide") {
      braveTab.style.bottom = "-400px";
    } else {
      // Keep fullscreen or center layout, but move it down
      braveTab.style.bottom = "80px"; // temporarily reset bottom

      // remove top/left/transform so bottom works
      braveTab.style.top = "";
      braveTab.style.left = "";
      braveTab.style.transform = "";

      // Don't touch width/height — keep fullscreen size

      // Force reflow to re-trigger transition
      void braveTab.offsetWidth;

      // Slide down
      braveTab.style.bottom = "-400px";
    }

    // Hide visually
    braveTab.style.opacity = "0";
    braveTab.style.pointerEvents = "none";
  }

  // Toggle on icon click
  braveIconBox.addEventListener("click", () => {
    const isOpen = braveTab.classList.contains("show");

    if (isOpen) {
      // closebraveTab();
      braveCloseTab();
    } else {
      braveOpenTab();
    }
    playIconAnimation();
  });

  // close button
  braveCloseBtn.addEventListener("click", () => {
    // closebraveTab();
    braveCloseTab();
    playIconAnimation();
  });

  window.setbraveTabMode = (newMode) => {
    mode = newMode; // 'slide' | 'center' | 'fullscreen'
  };

  // Close tab on resize
  window.addEventListener("resize", () => {
    braveCloseTab();
  });
}
braveIconAnimation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// braveBrowser resize screen
function braveResizeScreen() {
  const braveResize = document.getElementById("braveResize");
  const braveBrowser = document.querySelector(".braveBrowser");
  const braveHeader = document.querySelector(".braveBrowser .braveHeader");

  let flag = true;

  function toggleResize() {
    if (flag) {
      // Small screen
      braveBrowser.style.width = "50%";
      braveBrowser.style.height = "60%";
      braveBrowser.style.left = "50%";
      braveBrowser.style.top = "50%";
      braveBrowser.style.transform = "translate(-50%, -50%)";
      braveBrowser.style.bottom = "auto";
      window.setbraveBrowserMode?.("center");

      braveBrowser.classList.add("vsCodePadding");
      braveBrowser.classList.add("vscode-small");
      braveBrowser.style.borderRadius = "10px";
    } else {
      // Fullscreen

      braveBrowser.style.width = "100%";
      braveBrowser.style.height = "100%";
      braveBrowser.style.left = "0";
      braveBrowser.style.top = "0";
      braveBrowser.style.transform = "none";
      braveBrowser.style.bottom = "auto";
      window.setbraveBrowserMode?.("fullscreen");

      braveBrowser.classList.remove("vsCodePadding");
      braveBrowser.classList.remove("vscode-small");
      braveBrowser.style.borderRadius = "0";
    }

    flag = !flag;
  }

  // Trigger on click
  braveResize.addEventListener("click", toggleResize);

  // Trigger on double-click
  braveHeader.addEventListener("dblclick", toggleResize);
}
braveResizeScreen();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// braveTab dragable
function dragBraveCode() {
  const braveHeader = document.querySelector(".braveHeader");
  const braveBrowser = document.querySelector(".braveBrowser");
  const dontDragElem = document.querySelectorAll(
    ".braveBrowser .braveHeader .newTab, .braveBrowser .braveHeader .closeBrowser"
  );

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  braveHeader.addEventListener("mousedown", (e) => {
    for (let elem of dontDragElem) {
      if (elem.contains(e.target)) {
        return; // cancel dragging
      }
    }

    const braveRect = braveBrowser.getBoundingClientRect();
    const parentRect = braveBrowser.offsetParent.getBoundingClientRect();

    const isFullScreen =
      Math.round(braveRect.width) >= Math.round(parentRect.width) &&
      Math.round(braveRect.height) >= Math.round(parentRect.height);

    if (isFullScreen) return;

    isDragging = true;
    offsetX = e.clientX - braveRect.left;
    offsetY = e.clientY - braveRect.top;

    braveBrowser.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    braveBrowser.style.left = `${e.clientX - offsetX}px`;
    braveBrowser.style.top = `${e.clientY - offsetY}px`;
    braveBrowser.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    braveBrowser.style.transition = "";
  });
}
dragBraveCode();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// brave search feature
function braveSearch() {
  const input = document.getElementById("urlInput");
  const iframe = document.getElementById("browserFrame");
  const braveImg = document.getElementById("braveImg");

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let url = input.value.trim();

      // Add protocol if missing
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      window.open(url, "_blank");
    }
  });

  braveImg.addEventListener("click", function (e) {
    let url = input.value.trim();

    // Add protocol if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    iframe.src = url;
  });
}
braveSearch();

// //////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////
// vscode icon
function vsCodeIconAnimation() {
  const vscodeIconBox = document.querySelector(".task-icon .icon-vscode");
  const vscodeIcon = document.querySelector(
    ".task-icon .icon-vscode .vscode-img img"
  );
  const vscodeTitle = document.querySelector(
    ".task-icon .icon-vscode .vscode-tab .vscode-title p"
  );
  const vscloseBtn = document.getElementById("vsCloseBtn");
  const vsCodeTab = document.querySelector(".vsCodeTab");

  let flag = 0;
  let hoverTimeout;
  let mode = "slid";

  // hover effect
  vscodeIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      vscodeTitle.style.opacity = "1";
    }, 700);
  });

  vscodeIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    vscodeTitle.style.opacity = "0";
  });

  // open /close animation
  function playIconAnimation() {
    vscodeIcon.style.scale = "0.8";

    setTimeout(() => {
      vscodeIcon.style.scale = "1";
      vscodeIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      vscodeIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  }

  // Open tab
  function vsOpenTab() {
    vsCodeTab.classList.add("show");

    if (mode === "slide") {
      vsCodeTab.style.bottom = "80px";
      vsCodeTab.style.opacity = "1";
      vsCodeTab.style.pointerEvents = "auto";
    } else {
      vsCodeTab.style.opacity = "1";
      vsCodeTab.style.pointerEvents = "auto";
    }
  }

  // Close tab
  function vsCloseTab() {
    vsCodeTab.classList.remove("show");

    if (mode === "slide") {
      vsCodeTab.style.bottom = "-400px";
    } else {
      // Keep fullscreen or center layout, but move it down
      vsCodeTab.style.bottom = "80px"; // temporarily reset bottom

      // remove top/left/transform so bottom works
      vsCodeTab.style.top = "";
      vsCodeTab.style.left = "";
      vsCodeTab.style.transform = "";

      // Don't touch width/height — keep fullscreen size

      // Force reflow to re-trigger transition
      void vsCodeTab.offsetWidth;

      // Slide down
      vsCodeTab.style.bottom = "-400px";
    }

    // Hide visually
    vsCodeTab.style.opacity = "0";
    vsCodeTab.style.pointerEvents = "none";
  }

  // Toggle on icon click
  vscodeIconBox.addEventListener("click", () => {
    const isOpen = vsCodeTab.classList.contains("show");

    if (isOpen) {
      // closevsCodeTab();
      vsCloseTab();
    } else {
      vsOpenTab();
    }
    playIconAnimation();
  });

  // close button
  vscloseBtn.addEventListener("click", () => {
    // closevsCodeTab();
    vsCloseTab();
    playIconAnimation();
  });

  window.setvsCodeTabMode = (newMode) => {
    mode = newMode; // 'slide' | 'center' | 'fullscreen'
  };

  // Close tab on resize
  window.addEventListener("resize", () => {
    vsCloseTab();
  });
}
vsCodeIconAnimation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// vsCodeTab resize screen
function vsResizeScreen() {
  const vsResize = document.getElementById("vsResize");
  const vsCodeTab = document.querySelector(".vsCodeTab");
  const vsHeader = document.querySelector(".vsCodeTab .vsHeader");

  let flag = true;

  function toggleResize() {
    if (flag) {
      // Small screen
      vsCodeTab.style.width = "50%";
      vsCodeTab.style.height = "60%";
      vsCodeTab.style.left = "50%";
      vsCodeTab.style.top = "50%";
      vsCodeTab.style.transform = "translate(-50%, -50%)";
      vsCodeTab.style.bottom = "auto";
      window.setvsCodeTabMode?.("center");

      vsCodeTab.classList.add("vsCodePadding");
      vsCodeTab.classList.add("vscode-small");
      vsCodeTab.style.borderRadius = "10px";
    } else {
      // Fullscreen

      vsCodeTab.style.width = "100%";
      vsCodeTab.style.height = "100%";
      vsCodeTab.style.left = "0";
      vsCodeTab.style.top = "0";
      vsCodeTab.style.transform = "none";
      vsCodeTab.style.bottom = "auto";
      window.setvsCodeTabMode?.("fullscreen");

      vsCodeTab.classList.remove("vsCodePadding");
      vsCodeTab.classList.remove("vscode-small");
      vsCodeTab.style.borderRadius = "0";
    }

    flag = !flag;
  }

  // Trigger on click
  vsResize.addEventListener("click", toggleResize);

  // Trigger on double-click
  vsHeader.addEventListener("dblclick", toggleResize);
}
vsResizeScreen();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// vsCodeTab dragable
function dragVsCode() {
  const vsHeader = document.querySelector(".vsHeader");
  const vsCodeTab = document.querySelector(".vsCodeTab");
  const dontDragElem = document.querySelectorAll(
    ".vsLeftHeader img, .vsLeftHeader span, .vsLeftHeader i, .vsRightHeader, .vsSearch"
  );

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  vsHeader.addEventListener("mousedown", (e) => {
    for (let elem of dontDragElem) {
      if (elem.contains(e.target)) {
        return; // cancel dragging
      }
    }

    const vsRect = vsCodeTab.getBoundingClientRect();
    const parentRect = vsCodeTab.offsetParent.getBoundingClientRect();

    const isFullScreen =
      Math.round(vsRect.width) >= Math.round(parentRect.width) &&
      Math.round(vsRect.height) >= Math.round(parentRect.height);

    if (isFullScreen) return;

    isDragging = true;
    offsetX = e.clientX - vsRect.left;
    offsetY = e.clientY - vsRect.top;

    vsCodeTab.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    vsCodeTab.style.left = `${e.clientX - offsetX}px`;
    vsCodeTab.style.top = `${e.clientY - offsetY}px`;
    vsCodeTab.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    vsCodeTab.style.transition = "";
  });
}
dragVsCode();
// /////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////////////////
// <!-- file explorer /open this pc -->
function fileexploreIconAnimation() {
  const fileexploreIconBox = document.querySelector(
    ".task-icon .icon-fileexplore"
  );
  const fileexploreIcon = document.querySelector(
    ".task-icon .icon-fileexplore .explore-img img"
  );
  const exploreText = document.querySelector(
    ".task-icon .icon-fileexplore .fileexplore-tab .fileexplore-title p"
  );
  const close = document.getElementById("close");
  const explorerTab = document.getElementById("folderWindow");

  let flag = 0;
  let hoverTimeout;
  let mode = "slid";

  // hover effect
  fileexploreIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      exploreText.style.opacity = "1";
    }, 700);
  });

  fileexploreIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    exploreText.style.opacity = "0";
  });

  // open /close animation
  function playIconAnimation() {
    fileexploreIcon.style.scale = "0.8";

    setTimeout(() => {
      fileexploreIcon.style.scale = "1";
      fileexploreIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      fileexploreIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  }

  // Open tab
  function openTab() {
    explorerTab.classList.add("show");

    if (mode === "slide") {
      explorerTab.style.bottom = "80px";
      explorerTab.style.opacity = "1";
      explorerTab.style.pointerEvents = "auto";
    } else {
      explorerTab.style.opacity = "1";
      explorerTab.style.pointerEvents = "auto";
    }
  }

  // Close tab
  function closeTab() {
    explorerTab.classList.remove("show");

    if (mode === "slide") {
      explorerTab.style.bottom = "-400px";
    } else {
      // Keep fullscreen or center layout, but move it down
      explorerTab.style.bottom = "80px"; // temporarily reset bottom

      // remove top/left/transform so bottom works
      explorerTab.style.top = "";
      explorerTab.style.left = "";
      explorerTab.style.transform = "";

      // Don't touch width/height — keep fullscreen size

      // Force reflow to re-trigger transition
      void explorerTab.offsetWidth;

      // Slide down
      explorerTab.style.bottom = "-400px";
    }

    // Hide visually
    explorerTab.style.opacity = "0";
    explorerTab.style.pointerEvents = "none";
  }

  // Toggle on icon click
  fileexploreIconBox.addEventListener("click", () => {
    const isOpen = explorerTab.classList.contains("show");

    if (isOpen) {
      // closeExplorerTab();
      closeTab();
    } else {
      openTab();
    }
    playIconAnimation();
  });

  // close button
  close.addEventListener("click", () => {
    // closeExplorerTab();
    closeTab();
    playIconAnimation();
  });

  window.setFolderWindowMode = (newMode) => {
    mode = newMode; // 'slide' | 'center' | 'fullscreen'
  };

  // Close tab on resize
  window.addEventListener("resize", () => {
    closeTab();
  });
}
fileexploreIconAnimation();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// file explorer resize screen
function resizeScreen() {
  const multySize = document.getElementById("multySize");
  const folderWindow = document.getElementById("folderWindow");
  const windowContent = document.getElementById("windowContent");
  const windowHeader = document.getElementById("window-header");

  let flag = true;

  function explorerToggle() {
    if (flag) {
      // Small screen
      folderWindow.style.width = "50%";
      folderWindow.style.height = "60%";
      folderWindow.style.left = "50%";
      folderWindow.style.top = "50%";
      folderWindow.style.transform = "translate(-50%, -50%)";
      folderWindow.style.bottom = "auto";
      windowContent.style.height = "calc(100% - 130px)";
      windowContent.style.overflow = "auto";
      windowContent.scrollTop = 0;
      window.setFolderWindowMode?.("center");

      folderWindow.style.borderRadius = "10px";
    } else {
      // Fullscreen

      folderWindow.style.width = "100%";
      folderWindow.style.height = "100%";
      folderWindow.style.left = "0";
      folderWindow.style.top = "0";
      folderWindow.style.transform = "none";
      folderWindow.style.bottom = "auto";
      windowContent.style.height = "calc(100% - 100px)";
      windowContent.style.overflow = "hidden";
      windowContent.scrollTop = 0;
      window.setFolderWindowMode?.("fullscreen");

      folderWindow.style.borderRadius = "0";
    }

    flag = !flag;
  }

  multySize.addEventListener("click", explorerToggle);
  windowHeader.addEventListener("dblclick", explorerToggle);
}
resizeScreen();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// file explorer dragable
function dragFileExplor() {
  const folderHeader = document.querySelector(".window-header");
  const folderWindow = document.getElementById("folderWindow");

  const dontDragFolder =
    "#folderWindow #window-header #fileName, #folderWindow #window-header #btns";

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  folderHeader.addEventListener("mousedown", (e) => {
    if (e.target.closest(dontDragFolder)) return;

    const folderRect = folderWindow.getBoundingClientRect();
    const parentRect = folderWindow.offsetParent.getBoundingClientRect();

    const isFullScreen =
      Math.round(folderRect.width) >= Math.round(parentRect.width) &&
      Math.round(folderRect.height) >= Math.round(parentRect.height);

    if (isFullScreen) return;

    isDragging = true;
    offsetX = e.clientX - folderRect.left;
    offsetY = e.clientY - folderRect.top;

    folderWindow.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    folderWindow.style.left = `${e.clientX - offsetX}px`;
    folderWindow.style.top = `${e.clientY - offsetY}px`;
    folderWindow.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    folderWindow.style.transition = "";
  });
}
dragFileExplor();

// //////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////

// theme
function theme() {
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;
  let chatgpt = document.querySelector(
    ".task-icon .icon-chatgpt .chatgpt-img img"
  );
  let gpt = document.querySelector(".chatGptTab .gptHeader .gptIcon img");

  let flag = 0;

  themeIcon.addEventListener("click", () => {
    if (flag === 0) {
      // Light Theme
      gpt.style.filter = "brightness(1) invert(0)";
      chatgpt.style.filter = "brightness(1) invert(0)";
      themeIcon.className = "ri-moon-line";
      root.style.setProperty("--wallpaperbg", "rgba(245, 250, 255, 1)"); // soft off-white
      root.style.setProperty("--background", "rgba(255, 255, 255, 1)"); // white background
      root.style.setProperty("--surface", "rgba(235, 240, 250, 1)"); // light blue-gray
      root.style.setProperty("--border", "rgba(200, 210, 225, 1)"); // soft border
      root.style.setProperty("--primaryText", "rgba(30, 35, 45, 1)"); // dark gray text
      root.style.setProperty("--secondaryText", "rgba(90, 100, 120, 1)"); // soft gray text
      root.style.setProperty("--accent", "rgba(0, 110, 220, 1)"); // vibrant blue
      root.style.setProperty("--disabled", "rgba(160, 170, 180, 0.6)"); // muted gray
      root.style.setProperty("--red", "rgb(220, 50, 50)"); // soft red
      root.style.setProperty("--black", "rgba(37, 37, 37, 0.9)");
      flag = 1;
    } else if (flag === 1) {
      // Custom Theme
      gpt.style.filter = "brightness(0) invert(1)";
      chatgpt.style.filter = "brightness(0) invert(1)";
      themeIcon.className = "ri-t-shirt-line";
      root.style.setProperty("--wallpaperbg", "rgba(10, 20, 30, 1)"); // deep navy blue
      root.style.setProperty("--background", "rgba(15, 25, 40, 1)"); // base background
      root.style.setProperty("--surface", "rgba(25, 35, 55, 1)"); // surface/cards
      root.style.setProperty("--border", "rgba(50, 65, 90, 0.6)"); // light border
      root.style.setProperty("--primaryText", "rgba(235, 245, 255, 1)"); // near-white text
      root.style.setProperty("--secondaryText", "rgba(180, 200, 225, 1)"); // muted text
      root.style.setProperty("--accent", "rgba(0, 122, 255, 1)"); // bright blue
      root.style.setProperty("--disabled", "rgba(100, 120, 140, 0.5)"); // faded blue-gray
      root.style.setProperty("--red", "rgb(255, 77, 77)"); // soft alert red
      root.style.setProperty("--black", "rgba(0, 0, 20, 1)");
      flag = 2;
    } else {
      // Dark Theme
      themeIcon.className = "ri-sun-line";
      root.style.setProperty("--wallpaperbg", "rgba(17, 27, 33, 1)");
      root.style.setProperty("--background", "rgba(30, 30, 30, 1)");
      root.style.setProperty("--surface", "rgba(45, 45, 45, 1)");
      root.style.setProperty("--border", "rgba(63, 63, 63, 1)");
      root.style.setProperty("--primaryText", "rgba(255, 255, 255, 1)");
      root.style.setProperty("--secondaryText", "rgba(212, 212, 212, 1)");
      root.style.setProperty("--accent", "rgba(37, 99, 235, 1)");
      root.style.setProperty("--disabled", "rgba(122, 122, 122, 1)");
      root.style.setProperty("--red", "rgb(243, 19, 19)");
      root.style.setProperty("--black", "rgba(10, 10, 10, 0.98)");
      flag = 0;
    }
  });
}
theme();
// //////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////
// window custom menu
function customMenu() {
  const menu = document.getElementById("customMenu");
  const desktopApps = document.querySelector(".deskTop-apps");

  function showCustomMenu(e) {
    e.preventDefault();

    const menu = document.getElementById("customMenu");
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.style.display = "block";
  }

  function hideCustomMenu() {
    document.getElementById("customMenu").style.display = "none";
  }

  document.addEventListener("contextmenu", function (e) {
    if (
      e.target.closest(".desktop-screen") ||
      e.target.closest("#folderWindow")
    ) {
      showCustomMenu(e);
    } else {
      hideCustomMenu();
    }
  });
  document.addEventListener("click", () => {
    menu.style.display = "none";
  });

  desktopApps.addEventListener("contextmenu", () => {
    menu.style.display = "none";
  });
}
customMenu();

// //////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////
// file custom menu
function fileCustomMenu() {
  const folder = document.querySelector(".deskTop-apps");
  const fileMenu = document.getElementById("fileMenu");

  folder.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".desktop-screen")) {
      return;
    }

    e.preventDefault();

    fileMenu.style.top = e.clientY + "px";
    fileMenu.style.left = e.clientX + "px";
    fileMenu.style.display = "block";
  });

  document.addEventListener("click", () => {
    fileMenu.style.display = "none";
  });
}
fileCustomMenu();
// //////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////
// Create new folder and save locak storage
function createFolder() {
  let folderCount = 1;

  document.addEventListener("DOMContentLoaded", () => {
    const createBtn = document.getElementById("createFolderOption");
    const desktop = document.querySelector(".mainScreen");

    createBtn.addEventListener("click", () => {
      const name = `New Folder ${folderCount++}`;
      const left = Math.random() * 500;
      const top = Math.random() * 300;
      createNewFolder(name, left, top);
      addFolderToStorage(name, left, top);
    });

    // Restore folders from storage
    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    savedFolders.forEach(({ name, left, top }) => {
      createNewFolder(name, left, top);
    });
    folderCount = savedFolders.length + 1;

    function createNewFolder(name, left, top) {
      const folder = document.createElement("div");
      folder.className = "deskTop-apps";
      folder.style.left = left + "px";
      folder.style.top = top + "px";
      folder.innerHTML = `
          <img src="./icons/folder.png" alt="folder" />
          <span>${name}</span>
        `;
      desktop.appendChild(folder);
    }

    function addFolderToStorage(name, left, top) {
      console.log("Saving folder:", name, left, top);
      const saved = JSON.parse(localStorage.getItem("folders")) || [];
      saved.push({ name, left, top });
      localStorage.setItem("folders", JSON.stringify(saved));
    }
  });
}
createFolder();

//////////////////////////////////////////////////////////////////////////
// Create new files and save locak storage
function createNewFile() {
  let fileCount = 1;

  document.addEventListener("DOMContentLoaded", () => {
    const createBtn = document.getElementById("createFileOption");
    const desktop = document.querySelector(".mainScreen");

    createBtn.addEventListener("click", () => {
      const name = `New file ${fileCount++}`;
      const left = Math.random() * 500;
      const top = Math.random() * 300;
      const icon = "./icons/file.svg";

      createNewfile(name, left, top, icon);
      addfileToStorage(name, left, top, icon);
    });

    // Restore files from storage
    const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
    savedFiles.forEach(({ name, left, top, icon }) => {
      createNewfile(name, left, top, icon);
    });
    fileCount = savedFiles.length + 1;

    function createNewfile(name, left, top, icon = "./icons/file.svg") {
      const file = document.createElement("div");
      file.className = "deskTop-apps";
      file.style.left = left + "px";
      file.style.top = top + "px";
      file.innerHTML = `
          <img src="${icon}" alt="file" />
          <span>${name}</span>
        `;
      desktop.appendChild(file);
    }

    function addfileToStorage(name, left, top, icon = "./icons/file.svg") {
      console.log("Saving folder:", name, left, top, icon);
      const saved = JSON.parse(localStorage.getItem("files")) || [];
      saved.push({ name, left, top, icon });
      localStorage.setItem("files", JSON.stringify(saved));
    }
  });
}
createNewFile();

// ////////////////////////////////////////////////////////////////////////////
// notification - time / date
function showNotification() {
  const notifyBtn = document.querySelector(".task-tools .time-date");
  const notifyTab = document.querySelector(".notifyTab");
  const closeAreas = document.querySelectorAll(".mainScreen, .wsb-tools");

  notifyBtn.addEventListener("click", () => {
    notifyTab.classList.toggle("open");
  });

  closeAreas.forEach((area) => {
    area.addEventListener("click", () => {
      notifyTab.classList.remove("open");
    });
  });
}
showNotification();

// ////////////////////////////////////////////////////////////////////////////
// wifi / bluetooth / hotspot etc
function showWsbStatus() {
  const closeAreas = document.querySelectorAll(".mainScreen, .time-date");
  const wsbStatusTab = document.querySelector(".wsbStatus");
  const wsbStatueBtn = document.querySelector(".wsb .wsb-tools");

  wsbStatueBtn.addEventListener("click", () => {
    wsbStatusTab.classList.toggle("open");
  });

  closeAreas.forEach((area) => {
    area.addEventListener("click", () => {
      wsbStatusTab.classList.remove("open");
    });
  });
}
showWsbStatus();

// ^^^^^^^^^^^^^^^^^^^^
// brightness
function brightNess() {
  const overlay = document.getElementById("brightness");
  const slider = document.getElementById("opacitySlider");

  slider.addEventListener("input", () => {
    overlay.style.opacity = slider.value;
  });
}
brightNess()

