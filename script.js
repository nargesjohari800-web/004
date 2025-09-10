const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const resultDiv = document.getElementById('result');
const calculateBtn = document.getElementById('calculateBtn');
const character = document.getElementById('character');

// بررسی فارسی بودن متن
function isPersian(text) {
    return /^[\u0600-\u06FF\s]+$/.test(text);
}

// پخش صدا
function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

// تعیین حالت شخصیت
function setCharacterState(state) {
    character.className = state + " jump"; // حالت + انیمیشن پرش
    setTimeout(() => character.classList.remove('jump'), 300);
}

// محاسبه عشق
calculateBtn.addEventListener('click', () => {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    if (name1 === "" || name2 === "") {
        resultDiv.innerHTML = "لطفا هر دو اسم را وارد کنید!";
        resultDiv.classList.add("show");
        return;
    }

    if (!isPersian(name1) || !isPersian(name2)) {
        resultDiv.innerHTML = "لطفا فقط از حروف فارسی استفاده کنید!";
        resultDiv.classList.add("show");
        return;
    }

    const lovePercent = Math.floor(Math.random() * 101);
    let message = "";
    let state = "";
    let soundArray = [];
    let imageArray = [];

    if (lovePercent > 80) {
        message = "💖 شما دو تاعاشق و معشوق هستید!";
        state = "happy";
        soundArray = ["sounds/high1.mp3", "sounds/high2.mp3"];
        imageArray = ["2.png", "images/happy2.png"];
    } else if (lovePercent > 50) {
        message = "😍📊 عشق شما در حال رشد است!";
        state = "surprised";
        soundArray = ["sounds/medium1.mp3", "sounds/medium2.mp3"];
        imageArray = [".png", "images/surprised2.png"];
    } else if (lovePercent > 20) {
        message = "😜💞 بهتره فعلاً دوست بمونید!";
        state = "funny";
        soundArray = ["sounds/low1.mp3", "sounds/low2.mp3"];
        imageArray = ["4.png", "images/funny2.png"];
    } else {
        message = "😂🪓 عشق شما کم‌کم محو می‌شود!";
        state = "sad";
        soundArray = ["sounds/verylow1.mp3", "sounds/verylow2.mp3"];
        imageArray = ["5.png", "images/sad2.png"];
    }

    // پخش صدا رندوم
    const randomSound = soundArray[Math.floor(Math.random() * soundArray.length)];
    playSound(randomSound);

    // انتخاب تصویر رندوم
    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];

    setCharacterState(state);

    // نمایش نتیجه به همراه تصویر
    resultDiv.innerHTML = `
        💌 عشق بین <b>${name1}</b> و <b>${name2}</b> = ${lovePercent}% <br>
        ${message} <br>
        <img src="${randomImage}" alt="تصویر عشق" style="width:100px; margin-top:10px;">
    `;
    resultDiv.classList.remove("show");
    setTimeout(() => resultDiv.classList.add("show"), 10);

    calculateBtn.disabled = true; // دکمه فقط یک بار
});

// فعال شدن مجدد دکمه وقتی ورودی تغییر کند
[name1Input, name2Input].forEach(input => {
    input.addEventListener('input', () => {
        calculateBtn.disabled = false;
    });
});

