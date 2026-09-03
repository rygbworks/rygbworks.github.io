// 両ゲームに共通するカニに関する処理をまとめたファイル

// カニの色をランダムに決めて、色クラスを付けたHTML要素を返す
function ChooseCrabColor() {

    // カニとなるHTML要素を生成
    const Crab = document.createElement("div");
    Crab.classList.add("Crab");

    // ランダムに数字を定義して数値に応じてカニの色を決める（紫カニは残り２０秒を切るまでは出現しない）
    let NumberRandom;

    if (0 < Number.parseInt(CountText.textContent) && Number.parseInt(CountText.textContent) < 20) {
        NumberRandom = Math.random() * 4.1;
    }
    else {
        NumberRandom = Math.random() * 4.0;
    }

    if (NumberRandom < 1) {
        Crab.classList.add("CrabR");
    }
    else if (NumberRandom < 2) {
        Crab.classList.add("CrabB");
    }
    else if (NumberRandom < 3) {
        Crab.classList.add("CrabY");
    }
    else if (NumberRandom < 4) {
        Crab.classList.add("CrabG");
    }
    else {
        Crab.classList.add("CrabP");
    }

    return Crab;

}

let IntervalChooseCrab;

// ゲームの状況を常に監視する　状況が変化したら１度だけcase内の処理を行う
setInterval(() => {

    if (StateGame !== StateGamePrevious.CrabJS) {

        // ゲーム開始後、１秒ごとにカニを出現させる　ゲームに勝ったらカニの出現が終わる
        switch (StateGame) {

            case ObjectStateGame.AfterStart:

                IntervalChooseCrab = setInterval(ChooseCrab, 1000);

                break;

            case ObjectStateGame.Success:

                clearInterval(IntervalChooseCrab);

                break;

        }

    }

    StateGamePrevious.CrabJS = StateGame;

}, 10);
