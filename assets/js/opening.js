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