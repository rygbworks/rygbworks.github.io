// ホームページの核となるファイル

// 実際に表示されている高さの1%をCSS変数として供給する
// (アプリ内ブラウザ等、svh/dvhが実際の表示領域とズレる環境向けの対策)
function UpdateRealViewportHeight() {

    const ViewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty("--RealVH", `${ViewportHeight * 0.01}px`);

}

UpdateRealViewportHeight();
window.addEventListener("resize", UpdateRealViewportHeight);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", UpdateRealViewportHeight);
}

// デバッグ用: 実機での実測値を#testに表示する
function UpdateDebugOverlay() {

    const TestElement = document.querySelector("#test");
    if (!TestElement) {
        return;
    }

    const HeaderRect = document.querySelector("header").getBoundingClientRect();
    const FooterRect = document.querySelector("footer").getBoundingClientRect();
    const ContentsRect = document.querySelector("#Contents").getBoundingClientRect();

    TestElement.textContent = [
        `ver.0.0`,
        `UA: ${navigator.userAgent}`,
        `innerHeight: ${window.innerHeight} / visualViewport: ${window.visualViewport ? window.visualViewport.height.toFixed(1) : "N/A"}`,
        `documentElement.clientHeight: ${document.documentElement.clientHeight}`,
        `prefers-color-scheme dark: ${window.matchMedia("(prefers-color-scheme: dark)").matches}`,
        `RealVH: ${getComputedStyle(document.documentElement).getPropertyValue("--RealVH")}`,
        `header: top=${HeaderRect.top.toFixed(1)} bottom=${HeaderRect.bottom.toFixed(1)} h=${HeaderRect.height.toFixed(1)}`,
        `Contents: top=${ContentsRect.top.toFixed(1)} bottom=${ContentsRect.bottom.toFixed(1)} h=${ContentsRect.height.toFixed(1)}`,
        `footer: top=${FooterRect.top.toFixed(1)} bottom=${FooterRect.bottom.toFixed(1)} h=${FooterRect.height.toFixed(1)}`,
        `gap Contents-Footer: ${(FooterRect.top - ContentsRect.bottom).toFixed(1)}`,
    ].join("\n");

}

UpdateDebugOverlay();
window.addEventListener("resize", UpdateDebugOverlay);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", UpdateDebugOverlay);
}
window.setInterval(UpdateDebugOverlay, 1000);

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
    JS_Chicken.src = "/assets/js/game/chicken.js";
    JS_Chicken.async = false;
    document.head.append(JS_Chicken);

    const JS_Crab = document.createElement("script");
    JS_Crab.src = "/assets/js/game/crab.js";
    JS_Crab.async = false;
    document.head.append(JS_Crab);

    const JS_ChickenHorizontal = document.createElement("script");
    JS_ChickenHorizontal.src = "/assets/js/game/chicken-horizontal.js";
    JS_ChickenHorizontal.async = false;
    document.head.append(JS_ChickenHorizontal);

    const JS_CrabHorizontal = document.createElement("script");
    JS_CrabHorizontal.src = "/assets/js/game/crab-horizontal.js";
    JS_CrabHorizontal.async = false;
    document.head.append(JS_CrabHorizontal);

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
    JS_Chicken.src = "/assets/js/game/chicken.js";
    JS_Chicken.async = false;
    document.head.append(JS_Chicken);

    const JS_Crab = document.createElement("script");
    JS_Crab.src = "/assets/js/game/crab.js";
    JS_Crab.async = false;
    document.head.append(JS_Crab);

    const JS_ChickenVertical = document.createElement("script");
    JS_ChickenVertical.src = "/assets/js/game/chicken-vertical.js";
    JS_ChickenVertical.async = false;
    document.head.append(JS_ChickenVertical);

    const JS_CrabVertical = document.createElement("script");
    JS_CrabVertical.src = "/assets/js/game/crab-vertical.js";
    JS_CrabVertical.async = false;
    document.head.append(JS_CrabVertical);

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