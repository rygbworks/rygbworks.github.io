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