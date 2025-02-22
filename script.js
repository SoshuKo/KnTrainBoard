document.addEventListener("DOMContentLoaded", function () {
    // JSONデータを取得して発車標を更新
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            updateBoard(data);
            updateTheme(data.theme);
        })
        .catch(error => console.error("JSONの読み込みに失敗しました:", error));

    // カラーテーマ変更イベント
    document.getElementById("theme-selector").addEventListener("change", function (event) {
        const selectedTheme = event.target.value;
        const themes = {
            "green": { background: "#111", text: "#0f0" },
            "blue": { background: "#112", text: "#0ff" },
            "amber": { background: "#220", text: "#ff0" }
        };
        if (themes[selectedTheme]) {
            updateTheme(themes[selectedTheme]);
        }
    });
});

// 発車標を更新
function updateBoard(data) {
    const lcd = document.querySelector(".lcd");
    lcd.innerHTML = ""; // 既存のデータをクリア

    data.departures.forEach(train => {
        const row = document.createElement("div");
        row.classList.add("row");

        row.innerHTML = `
            <span class="type">${train.type}</span>
            <span class="train-name">${train.trainName || ""}</span>
            <span class="time">${train.time}</span>
            <span class="destination">${train.destination}</span>
            <span class="cars">${train.cars}両</span>
        `;

        lcd.appendChild(row);
    });
}

// カラーテーマを適用
function updateTheme(theme) {
    document.querySelector(".lcd").style.backgroundColor = theme.background;
    document.querySelectorAll(".lcd span").forEach(span => {
        span.style.color = theme.text;
        span.style.textShadow = `0 0 5px ${theme.text}`;
    });
}
