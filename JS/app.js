import {
  elCopy,
  elForm,
  elImg,
  elPassword,
  elRange,
  elRangelength,
  elText,
} from "./htmlselector.js";

const strength = [
  { weak: "TOO WEAK!", img: "../images/tooweak.svg" },
  { weak: "WEAK", img: "../images/weak.svg" },
  { weak: "MEDIUM", img: "../images/medium.svg" },
  { weak: "STRONG", img: "../images/strong.svg" },
];

const passwordSymbols = {
  upperCase() {
    const arr = [];
    for (let i = 65; i <= 90; i++) arr.push(String.fromCharCode(i));
    return arr;
  },
  lowerCase() {
    const arr = [];
    for (let i = 97; i <= 122; i++) arr.push(String.fromCharCode(i));
    return arr;
  },
  numbers() {
    const arr = [];
    for (let i = 48; i <= 57; i++) arr.push(String.fromCharCode(i));
    return arr;
  },
  symbols() {
    const arr = [];
    const ranges = [
      [33, 47],
      [58, 64],
      [91, 96],
      [123, 126],
    ];
    for (let [start, end] of ranges) {
      for (let i = start; i <= end; i++) {
        arr.push(String.fromCharCode(i));
      }
    }
    return arr;
  },
};

elRange.addEventListener("change", (e) => {
  e.preventDefault();
  const values = e.target.value;
  elRangelength.innerText = values;
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const upperCase = formData.get("UpperCase") == "on";
  const lowerCase = formData.get("Lowercase") == "on";
  const number = formData.get("Numbers") == "on";
  const symbols = formData.get("Symbols") == "on";

  const length = Number(elRange.value);
  let arr = [];
  let selectChekbox = 0;

  if (upperCase) {
    arr = arr.concat(passwordSymbols.upperCase());
    selectChekbox++;
  }
  if (lowerCase) {
    arr = arr.concat(passwordSymbols.lowerCase());
    selectChekbox++;
  }
  if (number) {
    arr = arr.concat(passwordSymbols.numbers());
    selectChekbox++;
  }
  if (symbols) {
    arr = arr.concat(passwordSymbols.symbols());
    selectChekbox++;
  }

  e;

  if (arr.length === 0) {
    alert("Kamida bitta checkbox tanlang!");
    return;
  }
  const strengthIndex = Math.max(0, selectChekbox - 1);
  elImg.src = strength[strengthIndex].img;
  elText.innerText = strength[strengthIndex].weak;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    password += arr[randomIndex];
  }
  elPassword.innerText = password;
  elCopy.addEventListener("click", () => {
    const text = elPassword.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("✅ Nusxalandi");
        setTimeout(() => (elCopy.innerText = "Nusxalash"), 1500);
      })
      .catch((err) => {
        console.error("Nusxalashda xatolik:", err);
      });
  });
});

