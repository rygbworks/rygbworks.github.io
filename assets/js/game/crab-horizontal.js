// 横画面ゲームのカニに関する処理をまとめたファイル

// カニの水平方向の動き
function MoveCrabHorizontal(TimeNow) {

    // １フレーム目時点の時間
    if (!this.TimeMoveHorizontalStart) {
    this.TimeMoveHorizontalStart = TimeNow;
    }

    // １フレーム目時点のcss「left」または「right」の値
    if (!this.PositionMoveHorizontalStart) {
        if (this.Crab.classList.contains("Left")) {
            this.PositionMoveHorizontalStart = Number.parseFloat(this.StyleCrab.getPropertyValue("right"));
        }
        if (this.Crab.classList.contains("Right")) {
            this.PositionMoveHorizontalStart = Number.parseFloat(this.StyleCrab.getPropertyValue("left"));
        }
    }

    // 前フレームからの経過時間
    const TimeElapsed = TimeNow - this.TimeMoveHorizontalStart;

    // １フレーム目からの経過時間から移動距離を計算　カニに反映（紫カニのみ超高速）
    let DistanceMove;

    if (this.Crab.classList.contains("CrabP")) {
        DistanceMove = TimeElapsed * WidthChicken / 30;
    }
    else {
        DistanceMove = TimeElapsed * WidthChicken / 300;
    }

    if (this.Crab.classList.contains("Left")) {
        this.Crab.style.right = `${this.PositionMoveHorizontalStart - DistanceMove}px`;
    }
    if (this.Crab.classList.contains("Right")) {
        this.Crab.style.left = `${this.PositionMoveHorizontalStart - DistanceMove}px`;
    }

    requestAnimationFrame(MoveCrabHorizontal.bind(this));

};

// カニの鉛直方向の動き
function MoveCrabVertical(TimeNow) {

    // 初速、重力を定義
    const VelocityInitial = WidthChicken * this.RateVelocityInitial;
    const Gravity = WidthChicken * this.RateGravity;

    // １フレーム目時点の時間
    if (!this.TimeStartY) {
        this.TimeStartY = TimeNow;
    }

    // 跳ねる軌道にばらつきを与えるために、１フレーム目時点の時間にランダムな補正をかける
    if (!this.AdjustmentStartY) {
        this.AdjustmentStartY = Math.random() * 1000 * 2 / (this.RateGravity / this.RateVelocityInitial);
        this.TimeStartY -= this.AdjustmentStartY;
    }

    // １フレーム目からの経過時間　後の計算のために単位をmsからsに変換
    const TimeElapsed = TimeNow - this.TimeStartY;
    const TimeElapsedSecond = Math.min(TimeElapsed / 1000, 2 / (this.RateGravity / this.RateVelocityInitial));

    // １フレーム目からの経過時間からカニの垂直方向の位置を計算　カニに反映
    const DistanceJump = VelocityInitial * TimeElapsedSecond - Gravity * TimeElapsedSecond ** 2 / 2;

    this.Crab.style.bottom = `${DistanceJump}px`;

    // １周期ごとに１フレーム目時点の時間をリセットして、繰り返し跳ねさせる
    if (2 / (this.RateGravity / this.RateVelocityInitial) <= TimeElapsedSecond) {
        this.TimeStartY = undefined;
    }

    requestAnimationFrame(MoveCrabVertical.bind(this));

};

// カニを表示して固有データを定義したり動かしたりする
function DisplayCrab(Crab) {

    // HTMLファイルに追加
    Contents.append(Crab);

    // それぞれのカニに必要な固有データを定義
    const ObjectCrab = {
        Crab: Crab,
        StyleCrab: getComputedStyle(Crab),
        TimeMoveHorizontalStart: undefined,
        PositionMoveHorizontalStart: undefined,
        TimeMoveVerticalStart: undefined,
        AdjustmentTimeStart: undefined,
        RateVelocityInitial: undefined,
        RateGravity: undefined,
    };

    // カニの色によって初速や重力が違う
    if (Crab.classList.contains("CrabR") || Crab.classList.contains("CrabB")) {

        ObjectCrab.RateVelocityInitial = 10;
        ObjectCrab.RateGravity = 40;

    }
    if (Crab.classList.contains("CrabY") || Crab.classList.contains("CrabG")) {

        ObjectCrab.RateVelocityInitial = 8;
        ObjectCrab.RateGravity = 12;

    }
    if (Crab.classList.contains("CrabP")) {

        ObjectCrab.RateVelocityInitial = 16;
        ObjectCrab.RateGravity = 128;

    }

    if (Crab.classList.contains("Left")) {

        Crab.style.right = "100dvw";
        Crab.style.bottom = 0;

    }
    if (Crab.classList.contains("Right")) {

        Crab.style.left = "100dvw";
        Crab.style.bottom = 0;

    }

    // カニの移動を開始する
    requestAnimationFrame(MoveCrabHorizontal.bind(ObjectCrab));
    requestAnimationFrame(MoveCrabVertical.bind(ObjectCrab));

    // 配列にカニのデータを格納する（Chicken.jsで当たり判定の計算に使う）　画面外に出る頃に消す
    ArrayObjectCrab.push(ObjectCrab);

    setTimeout(() => {
        ArrayObjectCrab.shift();
        Crab.remove();
    }, 5000);

}

// カニの色をランダムに決め、横画面固有の出現方向（左右）を決めて表示する
function ChooseCrab() {

    const Crab = ChooseCrabColor();

    if (Crab.classList.contains("CrabR") || Crab.classList.contains("CrabY")) {
        Crab.classList.add("Left");
    }
    else if (Crab.classList.contains("CrabB") || Crab.classList.contains("CrabG")) {
        Crab.classList.add("Right");
    }
    else {
        Crab.classList.add(Math.random() < 0.5 ? "Left" : "Right");
    }

    DisplayCrab(Crab);

}
