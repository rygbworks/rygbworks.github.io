// ロード後のヘッダーやフッターのアニメーションに関する処理をまとめたファイル

// ヘッダーとフッターのアニメーション情報を定義　アニメーションする
const KeyframesHeaderFooter = {
    opacity: [0, 1],
};

const OptionsHeaderFooter = {
    duration: 1000,
    easing: "ease",
};

// ボタンのHTML要素を取得
const ButtonOption = document.querySelector("#ButtonOption");
const ButtonHelp = document.querySelector("#ButtonHelp");

// ヘルプボタンのクリックでフッターに「OnClickHelp」クラスを追加除去する
// (ゲームのモードに依存しない処理のため、iframe(ゲーム本体)が何度作り直されても
//  重複登録されないよう、モードに関係なく1回だけ実行されるここに置く)
ButtonHelp.addEventListener("click", () => {
    Footer.classList.toggle("OnClickHelp");
    ButtonHelp.blur();
});

// ガイドの切り替え(タップorキーボード)
// (ゲーム本体はiframe内で動いており、iframeの外(ヘッダー・フッターなど)で発生した
//  pointerdown/keydownはiframe内のリスナーでは検知できないため、親ページ側でも同じ判定を行う)
window.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") {
        Footer.classList.add("Tap");
        Footer.classList.remove("Keyboard");
    }
    if (event.pointerType === "mouse") {
        Footer.classList.remove("Tap");
        Footer.classList.add("Keyboard");
    }
}, { passive: true });

window.addEventListener("keydown", () => {
    Footer.classList.add("Keyboard");
    Footer.classList.remove("Tap");
});

// キーボード操作がフォーカスの位置によってゲーム(iframe)に届かないことがあるため、
// 親ページ側で受け取ったキー入力を、今表示中のiframeへ転送する
// (iframe内で発生したキー入力は最初からiframe自身に届くため、ここでは重複しない)
function ForwardKeyEventToGame(event) {
    if (CurrentIframe && CurrentIframe.contentDocument) {
        CurrentIframe.contentDocument.dispatchEvent(new KeyboardEvent(event.type, {
            key: event.key,
            code: event.code,
            repeat: event.repeat,
            bubbles: true,
        }));
    }
}

window.addEventListener("keydown", ForwardKeyEventToGame);
window.addEventListener("keyup", ForwardKeyEventToGame);

// 親ページ側の操作でも、iframe内のAudioContextの解禁を試みる(保険)
// (iframeの外(ヘッダー・フッターなど)で発生したジェスチャーはiframe自身のdocumentには届かないため、
//  manager-game.js側のリスナーだけでは解禁されないケースに備える。
//  ManagerAudio自体はconst宣言のためcontentWindow経由では参照できないが、
//  同じくmanager-game.jsが定義するTryResumeManagerAudio(関数宣言)はwindowのプロパティになるため、
//  それをiframe側でそのまま呼び出す)
function TryResumeGameAudio() {
    if (CurrentIframe && CurrentIframe.contentWindow && CurrentIframe.contentWindow.TryResumeManagerAudio) {
        CurrentIframe.contentWindow.TryResumeManagerAudio();
    }
}

for (const EventType of ["pointerdown", "pointerup", "touchstart", "touchend", "mousedown", "mouseup", "click", "keydown"]) {
    document.addEventListener(EventType, TryResumeGameAudio);
}

// マウス/トラックパッド操作時のみボタン・アイコンをホバー状態にする
// (@media(hover:hover)は「そのデバイスがホバー可能か」という機種レベルの判定しかできず、
//  Surfaceのようなタッチ+トラックパッド両対応デバイスでは常にtrueになってしまうため、
//  実際の操作がタッチかどうかをJSで判定する)
document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") {
        return;
    }
    const HoverTarget = event.target.closest("button, .Icon");
    if (HoverTarget) {
        HoverTarget.classList.add("Hovering");
    }
});

document.addEventListener("pointerout", (event) => {
    const HoverTarget = event.target.closest("button, .Icon");
    if (HoverTarget) {
        HoverTarget.classList.remove("Hovering");
    }
});

// タップが速すぎて:activeの見た目が1フレームも描画されないことがあるため、
// 押された見た目(.Pressed)を最低100msは表示し続けるようJSで管理する
const MinPressedDuration = 100;
let PressedElement = null;
let PressedSince = 0;

document.addEventListener("pointerdown", (event) => {
    const PressTarget = event.target.closest("button, .Icon");
    if (PressTarget) {
        PressedElement = PressTarget;
        PressedSince = Date.now();
        PressTarget.classList.add("Pressed");
    }
});

function ReleasePressedElement() {
    if (!PressedElement) {
        return;
    }
    const ElementToRelease = PressedElement;
    PressedElement = null;
    const Remaining = Math.max(MinPressedDuration - (Date.now() - PressedSince), 0);
    setTimeout(() => {
        ElementToRelease.classList.remove("Pressed");
    }, Remaining);
}

document.addEventListener("pointerup", ReleasePressedElement);
document.addEventListener("pointercancel", ReleasePressedElement);

// オプションボタンのアニメーション情報を定義　アニメーションする
const KeyframesButton = {
    scale: [0, 1],
};

const OptionsButton = {
    delay: 1000,
    duration: 200,
    easing: "ease-out",
    fill: "backwards"
};

// ロードされたら画面を表示しアニメーションを開始する
window.addEventListener("load", () => {
    Body.style.visibility = "visible";
    Header.animate(KeyframesHeaderFooter, OptionsHeaderFooter);
    Footer.animate(KeyframesHeaderFooter, OptionsHeaderFooter);
    ButtonOption.animate(KeyframesButton, OptionsButton);
    ButtonHelp.animate(KeyframesButton, OptionsButton);
});