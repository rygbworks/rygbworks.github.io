// 縦画面ゲームのカニに関する処理をまとめたファイル

// カニを弾き飛ばすときのアニメーション情報を定義（カニをタッチしたとき）
const KeyframesFlickCrabRotate = {
    rotate: [undefined]
};
const OptionsFlickCrabRotate = {
    duration: 200,
    iterations: "Infinity"
};

// カニを弾き飛ばす音を鳴らす
function PlaySoundFlickCrab(SoundSourceFlickCrab) {

  SoundFlickCrab = ManagerAudio.createBufferSource();

  SoundFlickCrab.buffer = SoundSourceFlickCrab;

  SoundFlickCrab.connect(ManagerAudio.destination);

  SoundFlickCrab.start();

}

// カニを弾き飛ばす（カニをタッチしたときに呼び出される）
function FlickCrab() {

    // 始点＝カニをタッチしたときのカニの位置　css「left」「bottom」と座標を取得しておく
    const PositionCrabHorizontalStart = this.StyleCrab.getPropertyValue("left");
    const PositionCrabVerticalStart = this.StyleCrab.getPropertyValue("bottom");
    const xCrabStart = Number.parseFloat(PositionCrabHorizontalStart) + Number.parseFloat(this.StyleCrab.getPropertyValue("width")) / 2;
    const yCrabStart = Number.parseFloat(PositionCrabVerticalStart) + Number.parseFloat(this.StyleCrab.getPropertyValue("width")) / 2;

    // 終点＝カニがスポーンした位置　css「left」「bottom」と座標を取得しておく
    const PositionCrabHorizontalEnd = this.PositionHorizontalInitial;
    const PositionCrabVerticalEnd = this.PositionVerticalInitial;
    const xCrabEnd = Number.parseFloat(PositionCrabHorizontalEnd) + Number.parseFloat(this.StyleCrab.getPropertyValue("width")) / 2;
    const yCrabEnd = Number.parseFloat(PositionCrabVerticalEnd) + Number.parseFloat(this.StyleCrab.getPropertyValue("width")) / 2;

    // 座標を用いて始点から終点までの距離を計算する（カニをどこでタッチしても同じ速度で飛んでいくようにするために使う）
    const DistanceFlickCrab = Math.sqrt((xCrabEnd - xCrabStart) ** 2 + (yCrabEnd - yCrabStart) ** 2);

    // 始点から終点までにかかる時間を定義する
    let Duration;

    if (this.Crab.classList.contains("CrabR") || this.Crab.classList.contains("CrabY")) {
        Duration = DistanceFlickCrab / HeightContents * 1500;
        KeyframesFlickCrabRotate.rotate = ["0deg", "-360deg"];
    }
    if (this.Crab.classList.contains("CrabB") || this.Crab.classList.contains("CrabG")) {
        Duration = DistanceFlickCrab / HeightContents * 1500;
        KeyframesFlickCrabRotate.rotate = ["0deg", "+360deg"];
    }
    if (this.Crab.classList.contains("CrabP")) {

        Duration = DistanceFlickCrab / HeightContents * 500;

        const NumberRandom = Math.random();

        if (NumberRandom < 0.5) {
            KeyframesFlickCrabRotate.rotate = ["0deg", "-360deg"];
        }
        else {
            KeyframesFlickCrabRotate.rotate = ["0deg", "+360deg"];
        }

    }

    // HeightContentsの更新が一瞬遅れても異常な値にならないようにする
    Duration = Math.min(Duration, 3000);

    // css「left」「bottom」の値を用いて始点から終点までの動きをアニメーションする
    this.KeyframesCrab.left = [PositionCrabHorizontalStart, PositionCrabHorizontalEnd];
    this.KeyframesCrab.bottom = [PositionCrabVerticalStart, PositionCrabVerticalEnd];
    this.OptionsCrab.duration = Duration;

    this.Crab.animate(this.KeyframesCrab, this.OptionsCrab);
    this.Crab.animate(KeyframesFlickCrabRotate, OptionsFlickCrabRotate);

    PlaySoundFlickCrab(SoundSourceFlickCrab);

}

// カニをニワトリに向けて動かす
function DisplayCrab(Crab, StyleCrab) {

    // それぞれのカニに必要な固有データを定義
    const ObjectCrab = {
        Crab: Crab,
        StyleCrab: StyleCrab,
        PositionHorizontalInitial: StyleCrab.getPropertyValue("left"),
        PositionVerticalInitial: StyleCrab.getPropertyValue("bottom"),
        KeyframesCrab: {left: [], bottom: []},
        OptionsCrab: {duration: [], fill: "both"}
    }

    // カニがスポーンした位置の座標　カニの幅　を取得しておく
    const xCrabInitial = Number.parseFloat(ObjectCrab.PositionHorizontalInitial) + Number.parseFloat(StyleCrab.getPropertyValue("width")) / 2;
    const yCrabInitial = Number.parseFloat(ObjectCrab.PositionVerticalInitial) + Number.parseFloat(StyleCrab.getPropertyValue("width")) / 2;
    const WidthCrab = Number.parseFloat(StyleCrab.getPropertyValue("width"));

    // 始点＝カニがスポーンした位置　css「left」「bottom」の値を定義しておく
    const PositionCrabHorizontalStart = ObjectCrab.PositionHorizontalInitial;
    const PositionCrabVerticalStart = ObjectCrab.PositionVerticalInitial;

    // 終点＝ニワトリの位置　css「left」「bottom」の値を定義しておく
    const PositionCrabHorizontalEnd = `${xChicken - WidthCrab / 2}px`;
    const PositionCrabVerticalEnd = "0px";

    // 座標を用いて始点から終点までの距離を計算する（とりあえずカニがどこでスポーンしても同じ速度でニワトリに向かうようにする）
    const DistanceCrabChicken = Math.sqrt((xChicken - xCrabInitial) ** 2 + (yChicken - yCrabInitial) ** 2);

    // 始点から終点までにかかる時間を定義する（乱数で速度にばらつきを与える）
    let Duration;

    if (Crab.classList.contains("CrabP")) {
        Duration = DistanceCrabChicken / HeightContents * 1000 * (Math.random() * 0.2 + 0.4);
    }
    else {
        Duration = DistanceCrabChicken / HeightContents * 1000 * (Math.random() * 0.5 + 1.0);
    }

    // HeightContentsの更新が一瞬遅れても、カニが寿命(7000ms)より先に消えないようにする
    Duration = Math.min(Duration, 6500);

    // css「left」「bottom」の値を用いて始点から終点までの動きをアニメーションする
    ObjectCrab.KeyframesCrab.left = [PositionCrabHorizontalStart, PositionCrabHorizontalEnd];
    ObjectCrab.KeyframesCrab.bottom = [PositionCrabVerticalStart, PositionCrabVerticalEnd];
    ObjectCrab.OptionsCrab.duration = Duration;

    Crab.animate(ObjectCrab.KeyframesCrab, ObjectCrab.OptionsCrab);

    // タッチするとカニを弾き飛ばす
    Crab.addEventListener("pointerdown", FlickCrab.bind(ObjectCrab), { once: true });

    // 配列にカニのデータを格納する（Chicken.jsで当たり判定の計算に使う）　７秒後に消す
    ArrayObjectCrab.push(ObjectCrab);

    setTimeout(() => {
        ArrayObjectCrab.shift();
        Crab.remove();
    }, 7000);

}

// カニが出現する位置を決める
function ChoosePosition(Crab) {

    // カニの色によって出現する位置を変える
    Contents.append(Crab);
    const StyleCrab = getComputedStyle(Crab);

    Crab.style.bottom = "120%";

    if (Crab.classList.contains("CrabR")) {
        Crab.style.left = `${Math.random() * 50 -50}%`;
    }
    if (Crab.classList.contains("CrabB")) {
        Crab.style.right = `${Math.random() * 50 -50}%`;
    }
    if (Crab.classList.contains("CrabY")) {
        Crab.style.left = `${Math.random() * 50 -150}%`;
    }
    if (Crab.classList.contains("CrabG")) {
        Crab.style.right = `${Math.random() * 50 -150}%`;
    }
    if (Crab.classList.contains("CrabP")) {
        const WidthCrabP = Number.parseFloat(StyleCrab.getPropertyValue("width"));
        Crab.style.left = `${WidthContents / 2 - WidthCrabP / 2}px`;
    }

    DisplayCrab(Crab, StyleCrab);

}

// カニの色をランダムに決めて、縦画面固有の出現位置を決めて表示する
function ChooseCrab() {

    const Crab = ChooseCrabColor();

    ChoosePosition(Crab);

}
