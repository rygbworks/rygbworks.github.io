// 横画面ゲームのニワトリに関する処理をまとめたファイル

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

// ニワトリが上に羽ばたく時のアニメーション情報を定義（ゲームに勝ったとき）
const KeyframesChickenFly = {
    translate: [undefined]
};
const OptionsChickenFly = {
    duration: 2000,
    fill: "both"
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

// ニワトリが上に羽ばたく（ゲームに勝ったら呼び出される）
function FlyChicken() {

    const ScaleChicken = StyleChicken.getPropertyValue("scale");

    // ニワトリの向いている方向に合うように左上か右上に羽ばたく
    if (ScaleChicken.split(" ")[0] === "-1") {
        KeyframesChickenFly.translate = [0, "-10vw -100vh"];
    }
    else {
        KeyframesChickenFly.translate = [0, "+10vw -100vh"];
    }

    Chicken.animate(KeyframesChickenFly, OptionsChickenFly);

}

// ニワトリが左右移動を開始した時間、css「left」の値　ニワトリがジャンプを開始した時間
let TimeMoveStart, PositionMoveStart;
let TimeJumpStart;

// ニワトリが移動する
function Move(TimeNow) {
    
    if (StateGame === ObjectStateGame.AfterStart && (IfMoveLeftOnOff ^ IfMoveRightOnOff)) {

        // １フレーム目時点の時間
        if (!TimeMoveStart) {
            TimeMoveStart = TimeNow;
        }

        // １フレーム目時点のcss「left」の値
        if (!PositionMoveStart) {
            PositionMoveStart = xChicken - WidthChicken / 2;
        }
    
        // １フレーム目からの経過時間
        const TimeElapsed = TimeNow - TimeMoveStart;
    
        // １フレーム目からの経過時間から移動距離を計算　ニワトリに反映（画面端から出ないように制限）
        const DistanceMove = TimeElapsed * WidthChicken / 200;

        if (IfMoveLeftOnOff) {
            Chicken.style.left = `${Math.max(PositionMoveStart - DistanceMove, 0)}px`;
        }
        if (IfMoveRightOnOff) {
            Chicken.style.left = `${Math.min(PositionMoveStart + DistanceMove, WidthContents - WidthChicken)}px`;
        }

        requestAnimationFrame(Move);

    }

}

// ニワトリがジャンプする音を鳴らす
function PlaySoundJumpChicken(SoundSourceJumpChicken) {

    SoundJumpChicken = ManagerAudio.createBufferSource();

    SoundJumpChicken.buffer = SoundSourceJumpChicken;

    SoundJumpChicken.connect(ManagerAudio.destination);

    SoundJumpChicken.start();

}

// ニワトリがジャンプする
function Jump(TimeNow) {

    // 初速、重力を定義
    const VelocityInitial = WidthChicken * 12;
    const Gravity = WidthChicken * 24;

    // １フレーム目時点の時間
    if (!TimeJumpStart) {
        TimeJumpStart = TimeNow;
    }

    // １フレーム目からの経過時間　後の計算のために単位をmsからsに変換
    const TimeElapsedJump = TimeNow - TimeJumpStart;
    const TimeElapsedJumpSecond = Math.min(TimeElapsedJump / 1000, 1);

    // １フレーム目からの経過時間からニワトリの垂直方向の位置を計算　ニワトリに反映
    const DistanceJump = VelocityInitial * TimeElapsedJumpSecond - Gravity * TimeElapsedJumpSecond ** 2 / 2;

    Chicken.style.bottom = `${DistanceJump}px`;

    if (StateGame !== ObjectStateGame.Failure && 0 <= TimeElapsedJumpSecond && TimeElapsedJumpSecond < 1) {
        requestAnimationFrame(Jump);
    }
    else {
        IfJumpOnOff = false;
        TimeJumpStart = undefined;
    }

}

// ニワトリが左右に動くかジャンプするかのフラグ
let IfMoveLeftOnOff = false;
let IfMoveRightOnOff = false;
let IfJumpOnOff = false;

// 矢印キー（左右）、スペースキー、が押されたときニワトリが左右に動いたりジャンプする
document.addEventListener("keydown", (event) => {

    if (StateGame === ObjectStateGame.AfterStart && !event.repeat) {
        
        // ニワトリが　矢印キー（左）なら左に、矢印キー（右）なら右に、スペースキーならジャンプ
        if (event.key === "ArrowLeft") {
    
            IfMoveLeftOnOff = true;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
    
                TimeMoveStart = undefined;
                PositionMoveStart = undefined;
    
                requestAnimationFrame(Move);
                Chicken.style.scale = "-1 1";
    
            }
    
        }
        if (event.key === "ArrowRight") {
    
            IfMoveRightOnOff = true;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
            
                TimeMoveStart = undefined;
                PositionMoveStart = undefined;
    
                requestAnimationFrame(Move);
                Chicken.style.scale = "+1 1";
    
            }
    
        }
    
        if (event.key === " " && !IfJumpOnOff)  {
    
            IfJumpOnOff = true;
    
            TimeJumpStart = undefined;
    
            requestAnimationFrame(Jump);
            PlaySoundJumpChicken(SoundSourceJumpChicken);
    
        }
    
    }

});

// 矢印キー（左右）を押し終わったら移動をやめる
document.addEventListener("keyup", (event) => {

    if (StateGame === ObjectStateGame.AfterStart) {
    
        if (event.key === "ArrowLeft") {
    
            IfMoveLeftOnOff = false;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
            
                TimeMoveStart = undefined;
                PositionMoveStart = undefined;
    
                requestAnimationFrame(Move);
                Chicken.style.scale = "+1 1";
    
            }
    
        }
        if (event.key === "ArrowRight") {
    
            IfMoveRightOnOff = false;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
            
                TimeMoveStart = undefined;
                PositionMoveStart = undefined;
    
                requestAnimationFrame(Move);
                Chicken.style.scale = "-1 1";
    
            }
    
        }
    
    }

});

// 画面をタッチしたときのポインター情報を保存するための変数
let PointerLeft, PointerRight;

// タッチする位置によってニワトリが左右に動いたりジャンプする
Contents.addEventListener("pointerdown", (event) => {

    // タッチしている位置のx座標を計算
    const RectContents = event.currentTarget.getBoundingClientRect();
    const PointerX = event.clientX - RectContents.left;
    
    if (StateGame === ObjectStateGame.AfterStart) {
    
        // タッチした位置のx座標がニワトリよりも　十分に左なら左に、十分に右なら右に、だいたいニワトリと同じならジャンプ
        if (PointerX < xChicken - WidthChicken) {
    
            IfMoveLeftOnOff = true;
    
            TimeMoveStart = undefined;
            PositionMoveStart = undefined;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
                requestAnimationFrame(Move);
                Chicken.style.scale = "-1 1";
            }
    
            PointerLeft = event.pointerId;
    
        }
        else if (xChicken + WidthChicken < PointerX) {
    
            IfMoveRightOnOff = true;
    
            TimeMoveStart = undefined;
            PositionMoveStart = undefined;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
                requestAnimationFrame(Move);
                Chicken.style.scale = "+1 1";
            }
    
            PointerRight = event.pointerId;
    
        }
        else {
    
            if (!IfJumpOnOff)  {
    
                IfJumpOnOff = true;
        
                TimeJumpStart = undefined;
        
                requestAnimationFrame(Jump);
                PlaySoundJumpChicken(SoundSourceJumpChicken);
        
            }
    
        }
    
    }

});

// 画面のタッチが終わったら左右移動をやめる
Contents.addEventListener("pointerup", (event) => {

    if (StateGame === ObjectStateGame.AfterStart) {
    
        if (event.pointerId === PointerLeft) {
    
            IfMoveLeftOnOff = false;
    
            TimeMoveStart = undefined;
            PositionMoveStart = undefined;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
                requestAnimationFrame(Move);
                Chicken.style.scale = "+1 1";
            }
    
        }
        else if (event.pointerId === PointerRight) {
    
            IfMoveRightOnOff = false;
    
            TimeMoveStart = undefined;
            PositionMoveStart = undefined;
    
            if (IfMoveLeftOnOff ^ IfMoveRightOnOff) {
                requestAnimationFrame(Move);
                Chicken.style.scale = "-1 1";
            }
    
        }
    
    }

});

// マウス操作時のバグ対策
window.addEventListener("pointerup", (event) => {

    if (event.pointerId === 1) {

        IfMoveLeftOnOff = false;
        IfMoveRightOnOff = false;

    }

});

// ロード後ニワトリが上から落ちてくるときのアニメーションをする
window.addEventListener("load", () => {
    Chicken.animate(KeyframesChickenAppear, OptionsChickenAppear);
});

// ゲームの状況を常に監視する　ニワトリ、カニ、の情報を常に取得し、当たり判定をする
setInterval(() => {
    
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
    
    // ゲームの状況が変化したら１度だけcase内の処理を行う
    if (StateGame !== StateGamePrevious.ChickenJS) {
    
        // ゲームに勝ったらニワトリが上に羽ばたく
        switch (StateGame) {
    
            case ObjectStateGame.Success:
    
                setTimeout(FlyChicken, 1000);
    
            break;
    
        }
    
    }
    
    StateGamePrevious.ChickenJS = StateGame;

}, 5);