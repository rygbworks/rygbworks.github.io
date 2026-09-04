// ホームページの核となるファイル

// body要素を取得
const Body = document.querySelector("body");

// ヘッダーとフッターのHTML要素を取得
const Header = document.querySelector("header");
const Footer = document.querySelector("footer");

// HTML要素を取得
const Contents = document.querySelector("#Contents");

// #Contentsの土台となる位置・高さを、Header/Footerの実際の描画位置から測定する
// (このWebViewではsvh/innerHeightが実際の可視領域より大きい値を返すことがあるため、
//  top:0/bottom:0で正しく描画されるHeader/Footer自身の位置を基準にする)
function UpdateContentsPosition() {

    const HeaderBottom = Header.getBoundingClientRect().bottom;
    const FooterTop = Footer.getBoundingClientRect().top;

    Contents.style.setProperty("--MeasuredContentsTop", `${HeaderBottom}px`);
    Contents.style.setProperty("--MeasuredContentsHeight", `${FooterTop - HeaderBottom}px`);

}

UpdateContentsPosition();

// デバッグ用: 実機での実測値を#testに表示する(Header/#Contents/Footerの位置関係の調査用)
function UpdateDebugOverlay() {

    const TestElement = document.querySelector("#test");
    if (!TestElement) {
        return;
    }

    const HeaderRect = document.querySelector("header").getBoundingClientRect();
    const FooterRect = document.querySelector("footer").getBoundingClientRect();
    const ContentsRect = document.querySelector("#Contents").getBoundingClientRect();

    TestElement.textContent = [
        `ver.0.19`,
        `UA: ${navigator.userAgent}`,
        `innerHeight: ${window.innerHeight} / visualViewport: ${window.visualViewport ? window.visualViewport.height.toFixed(1) : "N/A"}`,
        `documentElement.clientHeight: ${document.documentElement.clientHeight}`,
        `header:   top=${HeaderRect.top.toFixed(1)} bottom=${HeaderRect.bottom.toFixed(1)} h=${HeaderRect.height.toFixed(1)}`,
        `Contents: top=${ContentsRect.top.toFixed(1)} bottom=${ContentsRect.bottom.toFixed(1)} h=${ContentsRect.height.toFixed(1)}`,
        `footer:   top=${FooterRect.top.toFixed(1)} bottom=${FooterRect.bottom.toFixed(1)} h=${FooterRect.height.toFixed(1)}`,
        `gap Header-Contents: ${(ContentsRect.top - HeaderRect.bottom).toFixed(1)}`,
        `gap Contents-Footer: ${(FooterRect.top - ContentsRect.bottom).toFixed(1)}`,
    ].join("\n");

}

UpdateDebugOverlay();
window.addEventListener("resize", UpdateDebugOverlay);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", UpdateDebugOverlay);
}
window.setInterval(UpdateDebugOverlay, 1000);

// ゲーム画面の幅や高さからアスペクト比を計算する
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

// #Contentsのアスペクト比の測定が安定するまで待ってから、ゲームモードを決定・読み込みする
// (Xアプリ内ブラウザでは起動直後の1回目の測定が実際の表示領域と異なり、
//  その後一方向に修正されることがあるため、決定を急がない)
let Mode;

function DecideModeWhenStable(AttemptsLeft) {

    UpdateContentsPosition();

    const NewWidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
    const NewHeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
    const NewAspectRatio = NewWidthContents / NewHeightContents;
    const IsStable = (NewAspectRatio === AspectRatio);

    WidthContents = NewWidthContents;
    HeightContents = NewHeightContents;
    AspectRatio = NewAspectRatio;

    if (IsStable || AttemptsLeft <= 0) {

        Mode = CheckMode();

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

    }
    else {
        requestAnimationFrame(() => DecideModeWhenStable(AttemptsLeft - 1));
    }

}

requestAnimationFrame(() => DecideModeWhenStable(30));

// コンテンツ画面領域の余計なクリックアクションを無効化
Contents.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// ウィンドウの変形によって変化する情報を更新　場合によってはリロード
function UpdateContentsMetrics() {

    UpdateContentsPosition();

    WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
    HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
    AspectRatio = WidthContents / HeightContents;

    // Modeがまだ確定していない(安定待ちの)間は判定しない
    if (Mode !== undefined && Mode !== CheckMode()) {
        window.location.reload();
    }

}

window.addEventListener("resize", UpdateContentsMetrics);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", UpdateContentsMetrics);
}
// resize/visualViewport resizeイベントが発火しないアプリ内ブラウザ対策として定期的にも更新する
window.setInterval(UpdateContentsMetrics, 500);