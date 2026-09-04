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

// ゲーム画面の幅や高さからアスペクト比を計算する
const StyleContents = getComputedStyle(Contents);

const ErrorAspectRatio = document.querySelector("#ErrorAspectRatio")

let WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
let HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
let AspectRatio = WidthContents / HeightContents;

// ゲームモードを実際に反映する(reloadを使わず、iframeの差し替えで実現する)
let CurrentIframe = null;
let LinkGameCss = null;
let LinkGameModeCss = null;

function ApplyMode(NewMode) {

    if (NewMode === Mode) {
        return;
    }

    Mode = NewMode;

    if (CurrentIframe) {
        CurrentIframe.remove();
        CurrentIframe = null;
    }

    if (NewMode === "Error") {
        ButtonHelp.style.display = "none";
        ErrorAspectRatio.classList.add("Display");
        return;
    }

    ErrorAspectRatio.classList.remove("Display");
    ButtonHelp.style.removeProperty("display");

    if (!LinkGameCss) {
        LinkGameCss = document.createElement("link");
        LinkGameCss.rel = "stylesheet";
        LinkGameCss.href = "/assets/css/game/game.css";
        document.head.append(LinkGameCss);
    }

    if (!LinkGameModeCss) {
        LinkGameModeCss = document.createElement("link");
        LinkGameModeCss.rel = "stylesheet";
        document.head.append(LinkGameModeCss);
    }
    LinkGameModeCss.href = (NewMode === "ModeHorizontal")
        ? "/assets/css/game/game-horizontal.css"
        : "/assets/css/game/game-vertical.css";

    CurrentIframe = document.createElement("iframe");
    CurrentIframe.style.cssText = "display:block; width:100%; height:100%; border:none; background:transparent;";
    CurrentIframe.src = (NewMode === "ModeHorizontal") ? "/assets/game-horizontal.html" : "/assets/game-vertical.html";
    CurrentIframe.addEventListener("load", () => {
        CurrentIframe.contentWindow.focus();
    });

    Contents.append(CurrentIframe);

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

// #Contentsのアスペクト比を初回測定し、モードを決定する
// (誤った初回判定は、後段のUpdateContentsMetricsがreloadなしで訂正するため、
//  ここでは長く待たず、速い推測にとどめる)
let Mode;

setTimeout(() => {

    UpdateContentsPosition();

    WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
    HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
    AspectRatio = WidthContents / HeightContents;

    ApplyMode(CheckMode());

}, 500);

// コンテンツ画面領域の余計なクリックアクションを無効化
Contents.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// ウィンドウの変形によって変化する情報を更新　場合によってはモードを切り替える(reloadはしない)
let TimeoutMismatchDebounce;

function UpdateContentsMetrics() {

    UpdateContentsPosition();

    WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
    HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));
    AspectRatio = WidthContents / HeightContents;

    // Modeがまだ確定していない(初回決定待ちの)間は判定しない
    if (Mode === undefined || CheckMode() === Mode) {
        clearTimeout(TimeoutMismatchDebounce);
        return;
    }

    // 一瞬だけ矛盾した値を読んだだけで即座に切り替えないよう、少し待ってから確定する
    clearTimeout(TimeoutMismatchDebounce);
    TimeoutMismatchDebounce = setTimeout(() => {
        ApplyMode(CheckMode());
    }, 300);

}

window.addEventListener("resize", UpdateContentsMetrics);
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", UpdateContentsMetrics);
}
// resize/visualViewport resizeイベントが発火しないアプリ内ブラウザ対策として定期的にも更新する
window.setInterval(UpdateContentsMetrics, 500);