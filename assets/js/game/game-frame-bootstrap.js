// このファイルはgame-horizontal.html/game-vertical.html(iframe内)で最初に読み込まれる。
// 親ページ(index.html)の要素をこのiframeのグローバルスコープに橋渡しすることで、
// 既存のゲームスクリプト(manager-game.js等)を変更せずに動かす。

const Footer = parent.document.querySelector("footer");

// ゲーム画面の土台となる要素(親の#Contentsに相当)はiframe自身のドキュメント内に持つ
// (iframeは親の#Contentsにぴったり重なるよう配置されるため、改めて実測し直す必要はない)
const Contents = document.querySelector("#GameArea");

// common.cssのbody{visibility:hidden}は親ページ(opening.js)側でしか解除されないため、
// iframe自身のbodyはここで明示的に表示する
document.body.style.visibility = "visible";

const StyleContents = getComputedStyle(Contents);
let WidthContents = Number.parseFloat(StyleContents.getPropertyValue("width"));
let HeightContents = Number.parseFloat(StyleContents.getPropertyValue("height"));

// コンテンツ画面領域の余計なクリックアクションを無効化
// (親のcommon.jsにある同様の処理は、親の#Contentsが空のラッパーになるため実質無効になる)
Contents.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

// マウス/トラックパッド操作時のみボタンをホバー状態にする(親ページ側と同じ理由)
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
