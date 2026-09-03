// 縦画面ゲームのニワトリに関する処理をまとめたファイル

// ニワトリが上に羽ばたく時のアニメーション情報を定義（ゲームに勝ったとき）
const KeyframesChickenFly = {
    translate: [undefined]
};
const OptionsChickenFly = {
    duration: 2000,
    fill: "both"
};

// ニワトリが上に羽ばたく（ゲームに勝ったら呼び出される）
function FlyChicken() {

    const ScaleChicken = StyleChicken.getPropertyValue("scale");

    // ニワトリの向いている方向に合うように左上か右上に羽ばたく
    if (ScaleChicken.split(" ")[0] === "-1") {
        KeyframesChickenFly.translate = [0, "-30vw -100vh"];
    }
    else {
        KeyframesChickenFly.translate = [0, "+30vw -100vh"];
    }

    Chicken.animate(KeyframesChickenFly, OptionsChickenFly);

}

// ニワトリを左右交互に向ける
function TurnChicken() {

    const ScaleChicken = StyleChicken.getPropertyValue("scale");

    if (ScaleChicken.split(" ")[0] === "-1") {
        Chicken.style.scale = "+1 1";
    }
    else {
        Chicken.style.scale = "-1 1";
    }

}

let IntervalTurnChicken;

// ゲームの状況を常に監視する　ニワトリ、カニ、の情報を常に取得し、当たり判定をする
setInterval(() => {

    DetectCollisionChicken();

    // ゲームの状況が変化したら１度だけcase内の処理を行う
    if (StateGame !== StateGamePrevious.ChickenJS) {

        // ゲーム開始後、ニワトリを左右交互に向ける　ゲームに勝ったらニワトリが上に羽ばたく
        switch (StateGame) {

            case ObjectStateGame.AfterStart:

                IntervalTurnChicken = setInterval(TurnChicken, 1000);

                break;

            case ObjectStateGame.Success:

                clearInterval(IntervalTurnChicken);

                setTimeout(FlyChicken, 1000);

                break;

        }

    }

    StateGamePrevious.ChickenJS = StateGame;

}, 5);
