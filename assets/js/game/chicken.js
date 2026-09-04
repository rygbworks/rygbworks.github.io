// 両ゲームに共通するニワトリに関する処理をまとめたファイル

// ニワトリとなるHTML要素を生成、id属性を付ける、HTMLファイルに追加、スタイル情報を取得
const Chicken = document.createElement("div");
const IdChicken = document.createAttribute("id");
IdChicken.value = "Chicken";
Chicken.setAttributeNode(IdChicken);

Contents.append(Chicken);

const StyleChicken = getComputedStyle(Chicken);

// ニワトリのx座標、y座標、幅、を後で格納する
let xChicken, yChicken, WidthChicken;

// ロード後ニワトリが上から落ちてくるときのアニメーション情報を定義
const KeyframesChickenAppear = {
    translate: ["0 -100vh", 0],
};
const OptionsChickenAppear = {
    duration: 1000,
    easing: "ease-in"
};

// ニワトリがふっ飛ばされるときのアニメーション情報を定義（ゲームに負けたとき）
const KeyframesChickenFlickTranslate = {
    translate: [undefined]
};
const KeyframesChickenFlickRotate = {
    rotate: [undefined]
};
const OptionsChickenFlickTranslate = {
    duration: 2000,
    fill: "both"
};
const OptionsChickenFlickRotate = {
    duration: 200,
    iterations: "Infinity"
};

// ニワトリがふっ飛ばされるエフェクトのアニメーション情報を定義
const KeyframesEffectFlickChicken = {
    scale: [0, 1.2, 0.7, 1, 0.7, 1, 0.7, 1, 0.7],
    rotate: [undefined],
    opacity: [1, "", 1, "", "", "", "", "", "", 0]
};
const OptionsEffectFlickChicken = {
    duration: 1000
};

// ニワトリがふっ飛ばされるエフェクトを表示する
function DisplayEffectFlickChicken(Difference_xChickenCrab, xHit, yHit) {

    WidthEffectFlickChicken = Number.parseFloat(StyleEffectFlickChicken.getPropertyValue("width"));
    HeightEffectFlickChicken = Number.parseFloat(StyleEffectFlickChicken.getPropertyValue("height"));

    EffectFlickChicken.style.left = `${xHit - WidthEffectFlickChicken / 2}px`;
    EffectFlickChicken.style.bottom = `${yHit - HeightEffectFlickChicken / 2}px`;

    if (Difference_xChickenCrab < 0) {
        KeyframesEffectFlickChicken.rotate = ["0deg", "-180deg"];
    }
    else {
        KeyframesEffectFlickChicken.rotate = ["0deg", "+180deg"];
    }

    EffectFlickChicken.style.visibility = "visible";

    EffectFlickChicken.animate(KeyframesEffectFlickChicken, OptionsEffectFlickChicken);

    setTimeout(() => {
        EffectFlickChicken.style.visibility = "hidden";
    }, 1000);

}

// ニワトリがふっ飛ばされる効果音を鳴らす
function PlaySoundFlickChicken(SoundSourceFlickChicken) {

    SoundFlickChicken = ManagerAudio.createBufferSource();

    SoundFlickChicken.buffer = SoundSourceFlickChicken;

    SoundFlickChicken.connect(ManagerAudio.destination);

    SoundFlickChicken.start();

}

// ニワトリをふっ飛ばす（ゲームに負けたら呼び出される）
function FlickChicken(Difference_xChickenCrab, xHit, yHit) {

    // カニとの位置関係で左か右にふっ飛ばす
    if (Difference_xChickenCrab < 0) {
        KeyframesChickenFlickTranslate.translate = [0, "-200vw -100vw"];
        KeyframesChickenFlickRotate.rotate = ["0deg", "-360deg"];
    }
    else {
        KeyframesChickenFlickTranslate.translate = [0, "+200vw -100vw"];
        KeyframesChickenFlickRotate.rotate = ["0deg", "+360deg"];
    }

    Chicken.animate(KeyframesChickenFlickTranslate, OptionsChickenFlickTranslate);
    Chicken.animate(KeyframesChickenFlickRotate, OptionsChickenFlickRotate);

    DisplayEffectFlickChicken(Difference_xChickenCrab, xHit, yHit);

    PlaySoundFlickChicken(SoundSourceFlickChicken);

}

// ニワトリとカニの当たり判定をする（当たったらニワトリをふっ飛ばす）
function DetectCollisionChicken() {

    // ニワトリの幅、位置、を取得
    WidthChicken = Number.parseFloat(StyleChicken.getPropertyValue("width"));
    xChicken = Number.parseFloat(StyleChicken.getPropertyValue("left")) + WidthChicken / 2;
    yChicken = Number.parseFloat(StyleChicken.getPropertyValue("bottom")) + WidthChicken / 2;

    // ゲームに存在する全てのカニにそれぞれ処理
    for (const ObjectCrab of ArrayObjectCrab) {

        // カニの幅、位置、を取得
        const WidthCrab = Number.parseFloat(ObjectCrab.StyleCrab.getPropertyValue("width"));
        const xCrab = Number.parseFloat(ObjectCrab.StyleCrab.getPropertyValue("left")) + WidthCrab * 0.50;
        const yCrab = Number.parseFloat(ObjectCrab.StyleCrab.getPropertyValue("bottom")) + WidthCrab * 0.32;

        if (StateGame === ObjectStateGame.AfterStart) {

            // 当たり判定をする　カニがニワトリに接触したらニワトリをふっ飛ばす
            if (Math.abs(xChicken - xCrab) < (WidthChicken + WidthCrab) / 2 && Math.abs(yChicken - yCrab) < (WidthChicken + WidthCrab) / 2) {

                if ((xChicken - xCrab) ** 2 + (yChicken - yCrab) ** 2 < ((WidthChicken + WidthCrab) / 2) ** 2) {

                    FlickChicken(xChicken - xCrab, xChicken, yChicken);

                    StateGame = ObjectStateGame.Failure;

                }

            }

        }

    }

}

// ロード後ニワトリが上から落ちてくるときのアニメーションをする
function StartChickenAppearAfterLoad() {
    Chicken.animate(KeyframesChickenAppear, OptionsChickenAppear);
}

// このスクリプトの読み込みがモード決定待ちで遅れ、loadイベントが既に発生済みのこともあるため
if (document.readyState === "complete") {
    StartChickenAppearAfterLoad();
}
else {
    window.addEventListener("load", StartChickenAppearAfterLoad);
}
