document.body.addEventListener("click", (e) => {
  console.log("Clicked on:", e.target);
});

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

  function timedate() {
    let date = new Date();
    let dinanka = date.getDate();
    let month = date.getMonth();
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
  }

  setInterval(timedate, 1000);
}
timeDate();
// end battery / volume / wifi / time.
// ///////////////////////////////////////////////////////////////

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
  let menu = document.getElementById("customMenu");
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

  winButton.addEventListener("click", (e) => {
    e.stopPropagation();
    winOpenTab.classList.toggle("show");
  });
  winOpenTab.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  winOpenTab.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
  });
  display.addEventListener("click", (e) => {
    winOpenTab.classList.remove("show");
  });

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
function copiloteIconAnimation() {
  let copiloteIconBox = document.querySelector(".task-icon .icon-copilot");
  let copiloteIcon = document.querySelector(
    ".task-icon .icon-copilot .copilot-img img"
  );
  let copilotTitle = document.querySelector(
    ".icon-copilot .copilot-tab .copilot-title p"
  );
  let flag = 0;
  let hoverTimeout;

  copiloteIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      copilotTitle.style.opacity = "1";
    }, 700);
  });

  copiloteIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    copilotTitle.style.opacity = "0";
  });

  copiloteIconBox.addEventListener("click", () => {
    copiloteIcon.style.scale = "0.8";

    setTimeout(() => {
      copiloteIcon.style.scale = "1";

      copiloteIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      copiloteIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  });
}
copiloteIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// chatgpt icon
function chatgptIconAnimation() {
  let chatgptIconBox = document.querySelector(".task-icon .icon-chatgpt");
  let chatgptIcon = document.querySelector(
    ".task-icon .icon-chatgpt .chatgpt-img img"
  );
  let gptTitle = document.querySelector(
    ".icon-chatgpt .chatgpt-tab .gpt-title p"
  );
  let flag = 0;
  let hoverTimeout;

  chatgptIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      gptTitle.style.opacity = "1";
    }, 700);
  });

  chatgptIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    gptTitle.style.opacity = "0";
  });

  chatgptIconBox.addEventListener("click", () => {
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
  });
}
chatgptIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// edge icon
function edgeIconAnimation() {
  let edgeIconBox = document.querySelector(".task-icon .icon-edge");
  let edgeIcon = document.querySelector(".task-icon .icon-edge .edge-img img");
  let edgeTitle = document.querySelector(".icon-edge .edge-tab .edge-title p");
  let flag = 0;
  let hoverTimeout;

  edgeIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      edgeTitle.style.opacity = "1";
    }, 700);
  });

  edgeIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    edgeTitle.style.opacity = "0";
  });

  edgeIconBox.addEventListener("click", () => {
    edgeIcon.style.scale = "0.8";

    setTimeout(() => {
      edgeIcon.style.scale = "1";
      edgeIcon.style.transform =
        flag === 0 ? "translateY(5px)" : "translateY(-5px)";
    }, 100);

    setTimeout(() => {
      edgeIcon.style.transform = "translateY(0px)";
    }, 300);

    flag = flag === 0 ? 1 : 0;
  });
}
edgeIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// brave icon
function braveIconAnimation() {
  let braveIconBox = document.querySelector(".task-icon .icon-brave");
  let braveIcon = document.querySelector(
    ".task-icon .icon-brave .brave-img img"
  );
  let braveTitle = document.querySelector(
    ".icon-brave .brave-tab .brave-title p"
  );
  let flag = 0;
  let hoverTimeout;

  braveIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      braveTitle.style.opacity = "1";
    }, 700);
  });

  braveIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    braveTitle.style.opacity = "0";
  });

  braveIconBox.addEventListener("click", () => {
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
  });
}
braveIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// vscode icon
function vscodeIconAnimation() {
  let vscodeIconBox = document.querySelector(".task-icon .icon-vscode");
  let vscodeIcon = document.querySelector(
    ".task-icon .icon-vscode .vscode-img img"
  );
  let vscodeTitle = document.querySelector(
    ".task-icon .icon-vscode .vscode-tab .vscode-title p"
  );
  let flag = 0;
  let hoverTimeout;

  vscodeIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      vscodeTitle.style.opacity = "1";
    }, 700);
  });

  vscodeIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    vscodeTitle.style.opacity = "0";
  });

  vscodeIconBox.addEventListener("click", () => {
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
  });
}
vscodeIconAnimation();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
  let isMinimized = true;
  let hoverTimeout;

  fileexploreIcon.addEventListener("mouseover", () => {
    hoverTimeout = setTimeout(() => {
      exploreText.style.opacity = "1";
    }, 700);
  });

  fileexploreIcon.addEventListener("mouseout", () => {
    clearTimeout(hoverTimeout);
    exploreText.style.opacity = "0";
  });

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

  fileexploreIconBox.addEventListener("click", () => {
    if (isMinimized) {
      explorerTab.style.display = "block";
      isMinimized = false;
      playIconAnimation();
    }
  });

  close.addEventListener("click", () => {
    if (!isMinimized) {
      explorerTab.style.display = "none";
      isMinimized = true;
      playIconAnimation();
    }
  });
}
fileexploreIconAnimation();

// //////////////////////////////////////////////////////////////////////////////////////////////
// file explorer resize screen
function resizeScreen() {
  const multySize = document.getElementById("multySize");
  const folderWindow = document.getElementById("folderWindow");
  const windowContent = document.getElementById("windowContent");
  let flag = true;

  multySize.addEventListener("click", () => {
    if (flag) {
      folderWindow.style.width = "50%";
      folderWindow.style.height = "60%";
      folderWindow.style.borderRadius = "10px";

      folderWindow.style.position = "absolute";
      folderWindow.style.left = "50%";
      folderWindow.style.top = "50%";
      folderWindow.style.transform = "translate(-50%, -50%)";

      folderWindow.classList.remove("fullscreen");

      windowContent.style.height = "calc(100% - 130px)";
      windowContent.style.overflow = "auto";
      windowContent.scrollTop = 0;
    } else {
      folderWindow.style.width = "100%";
      folderWindow.style.height = "100%";
      folderWindow.style.borderRadius = "0";

      folderWindow.style.position = "absolute";
      folderWindow.style.left = "0";
      folderWindow.style.top = "0";
      folderWindow.style.transform = "none";

      folderWindow.classList.add("fullscreen");

      windowContent.style.height = "calc(100% - 100px)";
      windowContent.style.overflow = "hidden";
      windowContent.scrollTop = 0;
    }

    flag = !flag;
  });
}
resizeScreen();
// //////////////////////////////////////////////////////////////////////////////////////////////

// file explorer dragable
function dragFileExplor() {
  const folderHeader = document.querySelector(".window-header");
  const folderWindow = document.getElementById("folderWindow");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  folderHeader.addEventListener("mousedown", (e) => {
    // Get computed width to check if it's 100% (fullscreen)
    const folderRect = folderWindow.getBoundingClientRect();
    const parentRect = folderWindow.offsetParent.getBoundingClientRect();

    const isFullScreen =
      Math.round(folderRect.width) >= Math.round(parentRect.width) &&
      Math.round(folderRect.height) >= Math.round(parentRect.height);

    if (isFullScreen) return; // Block dragging if fullscreen

    isDragging = true;
    offsetX = e.clientX - folderRect.left;
    offsetY = e.clientY - folderRect.top;

    folderWindow.style.transition = "none"; // Optional: disable smooth animation while dragging
  });

  document.addEventListener("click", (e) => {
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    folderWindow.style.left = `${e.clientX - offsetX}px`;
    folderWindow.style.top = `${e.clientY - offsetY}px`;
    folderWindow.style.transform = "none"; // remove transform before dragging
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    folderWindow.style.transition = ""; // Optional: re-enable smooth transition after drag
  });
}
dragFileExplor();

// //////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////
// draggable folders
function dragFolder(el) {
  let dragging = false;
  let xOffset = 0;
  let yOffset = 0;

  el.addEventListener("mousedown", (e) => {
    dragging = true;
    xOffset = e.clientX - el.offsetLeft;
    yOffset = e.clientY - el.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (dragging) {
      el.style.left = `${e.clientX - xOffset}px`;
      el.style.top = `${e.clientY - yOffset}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}

dragFolder(document.querySelector(".deskTop-apps"));
// //////////////////////////////////////////////////////////////////////////////////////////////

// theme
function theme() {
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;
  let chatgpt = document.querySelector(".task-icon .icon-chatgpt img");

  let flag = 0;

  themeIcon.addEventListener("click", () => {
    if (flag === 0) {
      // Light Theme
      chatgpt.style.filter = "brightness(1) invert(0)";
      themeIcon.className = "ri-moon-line";
      root.style.setProperty("--wallpaperbg", "#85aeca");
      root.style.setProperty("--background", "rgba(243, 243, 243, 1)");
      root.style.setProperty("--surface", "rgba(255, 255, 255, 1)");
      root.style.setProperty("--border", "rgb(226, 226, 226)");
      root.style.setProperty("--primaryText", "rgba(0, 0, 0, 1)");
      root.style.setProperty("--secondaryText", "rgba(43, 43, 43, 1)");
      root.style.setProperty("--accent", "rgba(37, 99, 235, 1)");
      root.style.setProperty("--disabled", "rgba(175, 175, 175, 1)");
      root.style.setProperty("--red", "rgb(243, 19, 19)");
      root.style.setProperty("--black", "rgb(217, 217, 217)");
      flag = 1;
    } else if (flag === 1) {
      // Custom Theme
      chatgpt.style.filter = "brightness(0) invert(1)";
      themeIcon.className = "ri-t-shirt-line";
      root.style.setProperty("--wallpaperbg", "rgb(19, 70, 141)");
      root.style.setProperty("--background", "rgba(36, 87, 130, 0.56)");
      root.style.setProperty("--surface", "rgba(13, 75, 150, 0.8)");
      root.style.setProperty("--border", "rgba(106, 150, 221, 0.45)");
      root.style.setProperty("--primaryText", "rgba(255, 255, 255, 1)");
      root.style.setProperty("--secondaryText", "rgba(212, 212, 212, 1)");
      root.style.setProperty("--accent", "rgba(37, 99, 235, 1)");
      root.style.setProperty("--disabled", "rgba(0, 145, 255, 0.48)");
      root.style.setProperty("--red", "rgb(243, 19, 19)");
      root.style.setProperty("--black", "rgba(9, 79, 255, 0.65)");
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
// custom menu
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
createFolder()

//////////////////////////////////////////////////////////////////////////
// Create new files and save locak storage
let fileCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.getElementById("createFileOption");
  const desktop = document.querySelector(".mainScreen");

  createBtn.addEventListener("click", () => {
    const name = `New file ${fileCount++}`;
    const left = Math.random() * 500;
    const top = Math.random() * 300;
    createNewfile(name, left, top);
    addfileToStorage(name, left, top);
  });

  // Restore files from storage
  const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
  savedFiles.forEach(({ name, left, top }) => {
    createNewfile(name, left, top);
  });
  fileCount = savedFiles.length + 1;

  function createNewfile(name, left, top) {
    const file = document.createElement("div");
    file.className = "deskTop-apps";
    file.style.left = left + "px";
    file.style.top = top + "px";
    file.innerHTML = `
          <img src="./icons/file.svg" alt="file" />
          <span>${name}</span>
        `;
    desktop.appendChild(file);
  }

  function addfileToStorage(name, left, top) {
    console.log("Saving folder:", name, left, top);
    const saved = JSON.parse(localStorage.getItem("folders")) || [];
    saved.push({ name, left, top });
    localStorage.setItem("folders", JSON.stringify(saved));
  }
});
// ////////////////////////////////////////////////////////////////////////////

// notification - time / date
function showNotification() {
const nitifyBtn = document.querySelector(".task-tools .time-date")
const notifyTab = document.getElementById("notificationTab")

nitifyBtn.addEventListener("click", () => {
  notifyTab.style.display = notifyTab.style.display === "block" ? "none" : "block"
})
}
showNotification()