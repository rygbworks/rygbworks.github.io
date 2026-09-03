// ホームページの核となるファイル

// body要素を取得
const Body = document.querySelector("body");

// ヘッダーとフッターのHTML要素を取得
const Header = document.querySelector("header");
const Footer = document.querySelector("footer");

// HTML要素を取得し、ゲーム画面の幅や高さからアスペクト比を計算する
const Contents = document.querySelector("#Contents");
const StyleContents = getComputedStyle(Contents);

const ErrorAspectRatio = document.querySelector("#ErrorAspectRatio")

let WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
let HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
let AspectRatio = WidthContents / HeightContents;

// 横画面ゲーム用のファイルをロード
function LoadModeHorizontal() {

    const CSS_Game = document.createElement("link");
    CSS_Game.rel = "stylesheet";
    CSS_Game.href = "/assets/css/game/game.css";
    document.head.append(CSS_Game);

    const CSS_GameHorizontal = document.createElement("link");
    CSS_GameHorizontal.rel = "stylesheet";
    CSS_GameHorizontal.href = "/assets/css/game/game-horizontal.css";
    document.head.append(CSS_GameHorizontal);

    const JS_GameManager = document.createElement("script");
    JS_GameManager.src = "/assets/js/game/manager-game.js";
    JS_GameManager.async = false;
    document.head.append(JS_GameManager);

    const JS_Countdown = document.createElement("script");
    JS_Countdown.src = "/assets/js/game/countdown.js";
    JS_Countdown.async = false;
    document.head.append(JS_Countdown);

    const JS_Chicken = document.createElement("script");
    JS_Chicken.src = "/assets/js/game/game-horizontal/chicken.js";
    JS_Chicken.async = false;
    document.head.append(JS_Chicken);

    const JS_Crab = document.createElement("script");
    JS_Crab.src = "/assets/js/game/game-horizontal/crab.js";
    JS_Crab.async = false;
    document.head.append(JS_Crab);

}

// 縦画面ゲーム用のファイルをロード
function LoadModeVertical() {

    const CSS_Game = document.createElement("link");
    CSS_Game.rel = "stylesheet";
    CSS_Game.href = "/assets/css/game/game.css";
    document.head.append(CSS_Game);
    
    const CSS_GameVertical = document.createElement("link");
    CSS_GameVertical.rel = "stylesheet";
    CSS_GameVertical.href = "/assets/css/game/game-vertical.css";
    document.head.append(CSS_GameVertical);

    const JS_GameManager = document.createElement("script");
    JS_GameManager.src = "/assets/js/game/manager-game.js";
    JS_GameManager.async = false;
    document.head.append(JS_GameManager);

    const JS_Countdown = document.createElement("script");
    JS_Countdown.src = "/assets/js/game/countdown.js";
    JS_Countdown.async = false;
    document.head.append(JS_Countdown);

    const JS_Chicken = document.createElement("script");
    JS_Chicken.src = "/assets/js/game/game-vertical/chicken.js";
    JS_Chicken.async = false;
    document.head.append(JS_Chicken);

    const JS_Crab = document.createElement("script");
    JS_Crab.src = "/assets/js/game/game-vertical/crab.js";
    JS_Crab.async = false;
    document.head.append(JS_Crab);

}

// コンテンツ画面領域のアスペクト比でゲームを分岐
function CheckMode() {

    if (1.0 / 1.0 <= AspectRatio && AspectRatio < 4.0 / 1.0) {

        return "ModeHorizontal";

    }
    else if (1.0 / 3.0 <= AspectRatio && AspectRatio < 1.0 / 1.0) {

        return "ModeVertical";

    }
    else {
        return "Error";
    }

}

const Mode = CheckMode();

switch (Mode) {

    case "ModeHorizontal":
        LoadModeHorizontal();
        break;

    case "ModeVertical":
        LoadModeVertical();
        break;
    case "Error":
        ErrorAspectRatio.classList.add("Display");

}

// コンテンツ画面領域の余計なクリックアクションを無効化
Contents.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// ウィンドウの変形によって変化する情報を更新　場合によってはリロード
window.addEventListener("resize", () => {

    WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
    HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
    AspectRatio = WidthContents / HeightContents;

    if (Mode !== CheckMode()) {
        window.location.reload();
    }

});