function randomColor() {
  let r = (Math.random() * (255 - 0 + 1)) << 0;
  let g = (Math.random() * (255 - 0 + 1)) << 0;
  let b = (Math.random() * (255 - 0 + 1)) << 0;

  const color = [r, g, b];
  return color;
}

function getId(id) {
  return document.getElementById(id);
}

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function fullColorHex(r, g, b) {
  let red = rgbToHex(r);
  let green = rgbToHex(g);
  let blue = rgbToHex(b);
  return ("#" + red + green + blue).toUpperCase();
}

const one = { id: getId("container1"), lock: getId("lock1"), button: getId("button1"), hex: getId("hex1"), rgb: getId("rgb1"), save: false, clicked: false };
const two = { id: getId("container2"), lock: getId("lock2"), button: getId("button2"), hex: getId("hex2"), rgb: getId("rgb2"), save: false, clicked: false };
const three = { id: getId("container3"), lock: getId("lock3"), button: getId("button3"), hex: getId("hex3"), rgb: getId("rgb3"), save: false, clicked: false };
const four = { id: getId("container4"), lock: getId("lock4"), button: getId("button4"), hex: getId("hex4"), rgb: getId("rgb4"), save: false, clicked: false };
const five = { id: getId("container5"), lock: getId("lock5"), button: getId("button5"), hex: getId("hex5"), rgb: getId("rgb5"), save: false, clicked: false };

const allColumns = [one, two, three, four, five];

let elementWidth = window.innerWidth / 5;
let columsGrid = [0, elementWidth, elementWidth * 2, elementWidth * 3, elementWidth * 4];

let style = document.createElement("style");
style.type = "text/css";
let generateHtml = () => {
  elementWidth = window.innerWidth / 5;
  columsGrid = [0, elementWidth, elementWidth * 2, elementWidth * 3, elementWidth * 4];
  let html = "";
  for (i = 0; i < 5; i++) {
    html += `.pos${i} { position: absolute; left: ${columsGrid[i].toFixed(1)}px }`;
  }
  return html;
};
style.innerHTML = generateHtml();
document.getElementsByTagName("head")[0].appendChild(style);

let columnStyle = document.querySelectorAll("style")[1];

window.addEventListener("resize", () => (columnStyle.innerHTML = generateHtml()), true);

window.addEventListener("keydown", e => {
  if (e.keyCode === 71) {
    allColumns.forEach(item => {
      if (item.save) return;
      let currentColor = randomColor();
      let r = currentColor[0];
      let g = currentColor[1];
      let b = currentColor[2];
      item.id.style.background = `rgb(${r}, ${g}, ${b})`;
      item.hex.value = fullColorHex(r, g, b);
      item.rgb.value = `rgb(${r}, ${g}, ${b})`;
    });
  }
});

allColumns.forEach(item => {
  item.lock.addEventListener("mousedown", () => {
    if (item.save) {
      item.save = false;
      item.lock.innerHTML = "LOCK";
      item.lock.style = "";
    } else if (!item.save) {
      item.save = true;
      item.lock.innerHTML = "LOCKED";
      item.lock.style = "opacity: 1 !important;";
    }
  });

  item.id.addEventListener("mousedown", () => {
    item.clicked = true;
    item.id.style.zIndex = 2;
  });

  item.id.addEventListener("mousemove", e => {
    let clientWidth = item.id.clientWidth / 2;
    let position = e.clientX - clientWidth;
    let pos = parseInt(item.id.classList[1].substring(3));
    if (item.clicked) {
      item.id.style.left = `${position}px`;
      if (e.clientX < columsGrid[pos - 1] + clientWidth * 2) {
        let element = document.querySelector(`.pos${pos - 1}`);
        let currentElement = document.querySelector(`.pos${pos}`);
        element.classList.remove(`pos${pos - 1}`);
        element.classList.add(`pos${pos}`);
        currentElement.classList.add(`pos${pos - 1}`);
        currentElement.classList.remove(`pos${pos}`);
      }
      if (e.clientX > columsGrid[pos + 1]) {
        let element = document.querySelector(`.pos${pos + 1}`);
        let currentElement = document.querySelector(`.pos${pos}`);
        element.classList.remove(`pos${pos + 1}`);
        element.classList.add(`pos${pos}`);
        currentElement.classList.add(`pos${pos + 1}`);
        currentElement.classList.remove(`pos${pos}`);
      }
    }
  });

  item.id.addEventListener("mouseup", () => {
    item.clicked = false;
    item.id.style.zIndex = 1;
    item.id.style.left = "";
  });

  item.rgb.addEventListener("mousedown", () => {
    item.rgb.className += " copied";
    let temp = item.rgb.value;
    item.rgb.focus();
    item.rgb.select();
    document.execCommand("copy");
    item.rgb.value = "Copied!";
    setTimeout(() => {
      item.rgb.className = "colors";
      item.rgb.value = temp;
    }, 500);
  });

  item.hex.addEventListener("mousedown", () => {
    item.hex.className += " copied";
    let temp = item.hex.value;
    item.hex.focus();
    item.hex.select();
    document.execCommand("copy");
    item.hex.value = "Copied!";
    setTimeout(() => {
      item.hex.className = "colors";
      item.hex.value = temp;
    }, 500);
  });
});

allColumns.forEach(item => {
  if (item.save) return;
  let currentColor = randomColor();
  let r = currentColor[0];
  let g = currentColor[1];
  let b = currentColor[2];
  item.id.style.background = `rgb(${r}, ${g}, ${b})`;

  item.hex.value = fullColorHex(r, g, b);
  item.rgb.value = `rgb(${r}, ${g}, ${b})`;
});
