/**
 * AMD CBS BIOS Emulator - Application Logic
 * Implements UMAF text-mode look & feel for Lenovo ThinkCentre M715s.
 */

// --- STATE MANAGEMENT ---
let menuData = null;
let currentFormId = "0x7000";
let historyStack = [];
let selectedIndex = 0; // Index in selectableItems
let selectableItems = []; // Selectable items of current form
let cmosSettings = {}; // CMOS NVRAM state: { offset: value }
let childMap = {}; // parentFormId -> Set of childFormIds

// --- MODAL STATE ---
let activeModal = null; // null | 'oneof' | 'numeric' | 'save' | 'confirm'
let modalSelectedIndex = 0;
let modalOptions = [];
let modalCallback = null;

// --- CORE UTILITIES ---

// Find item in any form by its offset
function findItemByOffset(offset) {
  if (!menuData) return null;
  for (const formId in menuData.forms) {
    const item = menuData.forms[formId].items.find((i) => i.offset === offset);
    if (item) return item;
  }
  return null;
}

// Helper to determine the current value of an item
function getItemCurrentValue(item) {
  if (cmosSettings[item.offset] !== undefined) {
    return cmosSettings[item.offset];
  }
  if (item.type === "oneof") {
    const defaultOpt = item.options.find((o) => o.isDefault);
    return defaultOpt ? defaultOpt.value : item.options[0].value;
  }
  if (item.type === "numeric") {
    return 0; // Default numerical value
  }
  return null;
}

// Check if a specific setting has been changed from its default
function isItemChanged(item) {
  if (item.offset === undefined || cmosSettings[item.offset] === undefined) {
    return false;
  }
  const currentVal = cmosSettings[item.offset];
  if (item.type === "oneof") {
    const defaultOpt = item.options.find((o) => o.isDefault);
    const defaultVal = defaultOpt ? defaultOpt.value : item.options[0].value;
    return currentVal !== defaultVal;
  }
  if (item.type === "numeric") {
    return currentVal !== 0;
  }
  return false;
}

// Recursively check if a form or any of its nested child forms in the tree have changed settings
function isFormChanged(formId) {
  if (!menuData) return false;
  const form = menuData.forms[formId];
  if (!form) return false;

  for (const item of form.items) {
    if (item.type === "oneof" || item.type === "numeric") {
      if (isItemChanged(item)) {
        return true;
      }
    } else if (item.type === "ref") {
      // Only traverse down the hierarchy tree (prevents backward links like Decline/Accept from causing parent changes to show on children)
      const isChild = childMap[formId] && childMap[formId].has(item.formId);
      if (isChild) {
        if (isFormChanged(item.formId)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Build menu hierarchy tree to identify child/parent links and prevent traversal cycles/backward links
function buildHierarchyTree() {
  childMap = {};

  if (!menuData) return;

  const queue = ["0x7000"];
  const visited = new Set(["0x7000"]);

  while (queue.length > 0) {
    const currentId = queue.shift();
    const form = menuData.forms[currentId];
    if (!form) continue;

    if (!childMap[currentId]) {
      childMap[currentId] = new Set();
    }

    form.items.forEach((item) => {
      if (item.type === "ref") {
        const childId = item.formId;
        if (!visited.has(childId)) {
          visited.add(childId);
          childMap[currentId].add(childId);
          queue.push(childId);
        }
      }
    });
  }
}

// Format number (e.g. hex values)
function formatNumericValue(val) {
  if (typeof val === "number") {
    return val.toString(10);
  }
  return val;
}

// Get path bar string
function getPathBarString() {
  if (!menuData) return "AMD CBS";
  let pathSegments = [];
  historyStack.forEach((formId) => {
    const form = menuData.forms[formId];
    if (form) pathSegments.push(form.title);
  });
  const currentForm = menuData.forms[currentFormId];
  if (currentForm) pathSegments.push(currentForm.title);

  return pathSegments.join(" > ");
}

// Load settings from localStorage
function loadCMOS() {
  try {
    const saved = localStorage.getItem("m715_cbs_cmos");
    if (saved) {
      cmosSettings = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load CMOS settings", e);
  }
}

// Save settings to localStorage
function saveCMOS() {
  try {
    localStorage.setItem("m715_cbs_cmos", JSON.stringify(cmosSettings));
  } catch (e) {
    console.error("Failed to save CMOS settings", e);
  }
}

// --- RENDERING ---

function render() {
  if (!menuData) return;

  const form = menuData.forms[currentFormId];
  if (!form) {
    console.error(`Form not found: ${currentFormId}`);
    return;
  }

  // Update path bar
  const pathBar = document.getElementById("path-bar");
  pathBar.textContent = getPathBarString();

  // Reset focus index list
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = "";

  selectableItems = [];
  let selectableIndexCounter = 0;

  form.items.forEach((item) => {
    const li = document.createElement("li");

    if (item.type === "subtitle") {
      li.className = "subtitle-row";
      li.textContent = item.prompt;
      menuList.appendChild(li);
    } else if (item.type === "text") {
      if (item.prompt && item.prompt.trim() !== "") {
        li.className = "text-row";
        li.textContent = item.prompt;
        menuList.appendChild(li);
      }
    } else if (
      item.type === "ref" ||
      item.type === "oneof" ||
      item.type === "numeric"
    ) {
      li.className = "menu-row selectable";
      li.setAttribute("data-index", selectableIndexCounter);
      selectableItems.push(item);

      const isChanged =
        item.type === "ref" ? isFormChanged(item.formId) : isItemChanged(item);
      const indicator = isChanged
        ? '<span class="modified-indicator">*</span>'
        : "";

      const labelSpan = document.createElement("span");
      labelSpan.className = "row-label";
      labelSpan.innerHTML = `<span class="arrow-marker">▶</span>${item.prompt}${indicator}`;
      li.appendChild(labelSpan);

      const valueSpan = document.createElement("span");
      valueSpan.className = "row-value";

      if (item.type === "ref") {
        valueSpan.textContent = "➔";
      } else if (item.type === "oneof") {
        valueSpan.className = "row-value value-oneof";
        const currentVal = getItemCurrentValue(item);
        const option = item.options.find((o) => o.value === currentVal);
        const optName = option ? option.name : "Unknown";
        valueSpan.textContent = `<${optName}>`;
      } else if (item.type === "numeric") {
        valueSpan.className = "row-value value-numeric";
        const currentVal = getItemCurrentValue(item);
        valueSpan.textContent = `[${formatNumericValue(currentVal)}]`;
      }

      li.appendChild(valueSpan);

      // Mouse listeners
      const idx = selectableIndexCounter;
      li.addEventListener("mouseenter", () => {
        if (activeModal) return;
        if (selectedIndex !== idx) {
          selectedIndex = idx;
          updateHighlight();
        }
      });

      li.addEventListener("click", () => {
        if (activeModal) return;
        selectedIndex = idx;
        updateHighlight();
        activateSelectedItem();
      });

      menuList.appendChild(li);
      selectableIndexCounter++;
    }
  });

  // Bound selectedIndex
  if (selectableItems.length > 0) {
    if (selectedIndex >= selectableItems.length) {
      selectedIndex = selectableItems.length - 1;
    }
    if (selectedIndex < 0) {
      selectedIndex = 0;
    }
  } else {
    selectedIndex = -1;
  }

  updateHighlight();
}

function updateHighlight() {
  const rows = document.querySelectorAll(".menu-row.selectable");
  rows.forEach((row) => row.classList.remove("active"));

  const helpText = document.getElementById("help-text");
  const helpOffset = document.getElementById("help-offset");

  if (selectedIndex >= 0 && selectedIndex < rows.length) {
    const activeRow = rows[selectedIndex];
    activeRow.classList.add("active");

    // Auto-scroll inside list if needed
    activeRow.scrollIntoView({ block: "nearest" });

    const activeItem = selectableItems[selectedIndex];
    helpText.textContent = activeItem.help || "No help string";
    helpOffset.textContent = activeItem.offset || "N/A";
  } else {
    helpText.textContent = "Выберите пункт меню для просмотра описания.";
    helpOffset.textContent = "N/A";
  }
}

// --- INTERACTIVE ACTIONS ---

function activateSelectedItem() {
  if (selectedIndex < 0 || selectedIndex >= selectableItems.length) return;
  const item = selectableItems[selectedIndex];

  if (item.type === "ref") {
    historyStack.push(currentFormId);
    currentFormId = item.formId;
    selectedIndex = 0;
    render();
  } else if (item.type === "oneof") {
    openOneOfModal(item);
  } else if (item.type === "numeric") {
    openNumericModal(item);
  }
}

// Fix goBack to restore highlight on the parent ref item
function goBackWithHighlight() {
  if (historyStack.length > 0) {
    const childId = currentFormId;
    currentFormId = historyStack.pop();

    // Find the item index in parent form that links to childId
    const parentForm = menuData.forms[currentFormId];
    let parentSelectableIdx = 0;
    if (parentForm) {
      let foundIdx = 0;
      let counter = 0;
      parentForm.items.forEach((item) => {
        if (
          item.type === "ref" ||
          item.type === "oneof" ||
          item.type === "numeric"
        ) {
          if (item.type === "ref" && item.formId === childId) {
            foundIdx = counter;
          }
          counter++;
        }
      });
      parentSelectableIdx = foundIdx;
    }
    selectedIndex = parentSelectableIdx;
    render();
  }
}

// --- MODAL UTILITIES ---

function openOneOfModal(item) {
  activeModal = "oneof";
  const modal = document.getElementById("oneof-modal");
  const title = document.getElementById("oneof-title");
  if (title) {
    title.classList.add("hidden");
    title.textContent = "";
  }
  const optionsList = document.getElementById("oneof-options-list");

  optionsList.innerHTML = "";
  modalOptions = item.options;

  const currentVal = getItemCurrentValue(item);
  modalSelectedIndex = item.options.findIndex((o) => o.value === currentVal);
  if (modalSelectedIndex < 0) modalSelectedIndex = 0;

  item.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.className = "modal-option-item";
    li.textContent = opt.name;
    if (opt.isDefault) {
      li.textContent += " *"; // Mark default with an asterisk
    }

    li.addEventListener("mouseenter", () => {
      modalSelectedIndex = idx;
      updateModalHighlight();
    });

    li.addEventListener("click", () => {
      modalSelectedIndex = idx;
      updateModalHighlight();
      confirmOneOfSelection(item);
    });

    optionsList.appendChild(li);
  });

  modal.classList.remove("hidden");
  updateModalHighlight();
}

function updateModalHighlight() {
  const items = document.querySelectorAll(".modal-option-item");
  items.forEach((item) => item.classList.remove("active"));

  if (modalSelectedIndex >= 0 && modalSelectedIndex < items.length) {
    const activeItem = items[modalSelectedIndex];
    activeItem.classList.add("active");
    activeItem.scrollIntoView({ block: "nearest" });
  }
}

function confirmOneOfSelection(item) {
  const selectedOpt = modalOptions[modalSelectedIndex];
  if (selectedOpt) {
    cmosSettings[item.offset] = selectedOpt.value;
    saveCMOS();
  }
  closeModal();
  render();
}

function openNumericModal(item) {
  activeModal = "numeric";
  const modal = document.getElementById("numeric-modal");
  const input = document.getElementById("numeric-input");
  const errorMsg = document.getElementById("numeric-error-msg");

  errorMsg.classList.add("hidden");

  const currentVal = getItemCurrentValue(item);
  input.value = currentVal.toString();

  modal.classList.remove("hidden");

  // Timeout for focus
  setTimeout(() => {
    input.focus();
    input.select();
  }, 50);

  modalCallback = () => {
    const valStr = input.value.trim();
    if (!valStr) {
      errorMsg.classList.remove("hidden");
      return;
    }

    let parsed = null;
    if (valStr.toLowerCase().startsWith("0x")) {
      parsed = parseInt(valStr.slice(2), 16);
    } else {
      parsed = parseInt(valStr, 10);
    }

    if (isNaN(parsed) || parsed < 0) {
      errorMsg.classList.remove("hidden");
    } else {
      cmosSettings[item.offset] = parsed;
      saveCMOS();
      closeModal();
      render();
    }
  };
}

function closeModal() {
  document.getElementById("oneof-modal").classList.add("hidden");
  document.getElementById("numeric-modal").classList.add("hidden");
  document.getElementById("save-modal").classList.add("hidden");
  activeModal = null;
  modalCallback = null;

  // Re-focus the main menu list for keyboard capture
  document.getElementById("menu-list").focus();
}

// F9 Reset CMOS confirmation
function triggerResetCMOS() {
  if (activeModal) return;

  // Reuse the oneof modal structure for a customized BIOS confirm dialog
  activeModal = "confirm";
  const modal = document.getElementById("oneof-modal");
  const title = document.getElementById("oneof-title");
  if (title) {
    title.classList.remove("hidden");
    title.textContent = "Load Optimized Defaults?";
  }
  const optionsList = document.getElementById("oneof-options-list");

  optionsList.innerHTML = "";

  modalOptions = [
    { name: "No", value: false },
    { name: "Yes", value: true },
  ];
  modalSelectedIndex = 0; // Default to 'No'

  modalOptions.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.className = "modal-option-item";
    li.textContent = opt.name;

    li.addEventListener("mouseenter", () => {
      modalSelectedIndex = idx;
      updateModalHighlight();
    });

    li.addEventListener("click", () => {
      modalSelectedIndex = idx;
      updateModalHighlight();
      confirmResetSelection();
    });

    optionsList.appendChild(li);
  });

  modal.classList.remove("hidden");
  updateModalHighlight();
}

function confirmResetSelection() {
  const selectedOpt = modalOptions[modalSelectedIndex];
  if (selectedOpt && selectedOpt.value === true) {
    // Clear CMOS settings
    cmosSettings = {};
    saveCMOS();
  }
  closeModal();
  render();
}

// --- GLOBAL KEYBOARD LISTENERS ---

document.addEventListener("keydown", (e) => {
  // If user is editing numeric input, handle Enter and Esc specifically
  if (activeModal === "numeric") {
    if (e.key === "Enter") {
      e.preventDefault();
      if (modalCallback) modalCallback();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    return;
  }

  // If oneof or confirm modal is open
  if (activeModal === "oneof" || activeModal === "confirm") {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      modalSelectedIndex--;
      if (modalSelectedIndex < 0) modalSelectedIndex = modalOptions.length - 1;
      updateModalHighlight();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      modalSelectedIndex++;
      if (modalSelectedIndex >= modalOptions.length) modalSelectedIndex = 0;
      updateModalHighlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeModal === "oneof") {
        const item = selectableItems[selectedIndex];
        confirmOneOfSelection(item);
      } else {
        confirmResetSelection();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    return;
  }

  // --- GENERAL BIOS SCREEN NAVIGATION ---

  // ArrowUp
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (selectableItems.length === 0) return;
    selectedIndex--;
    if (selectedIndex < 0) {
      selectedIndex = selectableItems.length - 1;
    }
    updateHighlight();
  }
  // ArrowDown
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (selectableItems.length === 0) return;
    selectedIndex++;
    if (selectedIndex >= selectableItems.length) {
      selectedIndex = 0;
    }
    updateHighlight();
  }
  // Enter
  else if (e.key === "Enter") {
    e.preventDefault();
    activateSelectedItem();
  }
  // Escape / Back
  else if (e.key === "Escape") {
    e.preventDefault();
    goBackWithHighlight();
  }
  // F9: Load Defaults
  else if (e.key === "F9") {
    e.preventDefault();
    triggerResetCMOS();
  }
  // F10: Save & Exit
  else if (e.key === "F10") {
    e.preventDefault();
    saveCMOS();
    location.reload();
  }
});

// --- EXTERNAL CONTROLS INTERACTIVE ---

// Toggle CRT screen filter

// Focus capture click for keyboard navigation
document.getElementById("bios-screen").addEventListener("click", () => {
  if (!activeModal) {
    document.getElementById("menu-list").focus();
  }
});

// --- APPLICATION INITIALIZATION ---

window.addEventListener("DOMContentLoaded", () => {
  // Pre-load CMOS state
  loadCMOS();

  // Load menu data from global variable (no fetch/CORS issues on local files)
  try {
    if (typeof bios_menu === "undefined") {
      throw new Error(
        "Переменная 'bios_menu' не определена. Убедитесь, что файл bios_menu.js подключен.",
      );
    }

    menuData = bios_menu;
    buildHierarchyTree();

    // Initialize rendering at Form ID 0x7000
    currentFormId = "0x7000";
    historyStack = [];
    selectedIndex = 0;

    render();

    // Focus menu list to enable keyboard immediately
    document.getElementById("menu-list").focus();
  } catch (error) {
    console.error("Error initializing BIOS data:", error);
    document.getElementById("menu-list").innerHTML = `
      <li class="text-row" style="color: #ff5555; text-align: center; padding-top: 50px;">
        ОШИБКА ЗАГРУЗКИ СХЕМЫ ДАННЫХ BIOS:
        <br><br>
        ${error.message}
      </li>
    `;
  }
});
