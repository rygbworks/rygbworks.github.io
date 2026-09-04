// 両ゲームに共通して必要な基本的なデータを定義するファイル

// 言語を切り替える
let IsJapanese = navigator.language.startsWith("ja");

function SwitchLanguage() {

    Footer.classList.toggle("Ja", IsJapanese)
    Footer.classList.toggle("En", !IsJapanese)

}

// ガイドの切り替え(タップorキーボード)
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

// ゲームの状況リスト
const ObjectStateGame = {
    BeforeStart: "BeforeStart",
    AfterStart: "AfterStart",
    Failure: "Failure",
    Success: "Success"
};

// 最初の状況を定義　各JavaScriptファイルで使うためのプロパティを準備
let StateGame = ObjectStateGame.BeforeStart;
const StateGamePrevious = {
    CountdownJS: "",
    ChickenJS: "",
    CrabJS: ""
};

// ゲームに存在しているカニのデータを配列にいれて管理する
const ArrayObjectCrab = [];

// エフェクトの準備
let StyleEffectFlickChicken;
let WidthEffectFlickChicken, HeightEffectFlickChicken;

async function SetUpEffectFlickChicken() {

    const EffectFlickChicken = document.createElement("div");
    const IdEffectFlickChicken = document.createAttribute("id");
    IdEffectFlickChicken.value = "EffectFlickChicken";
    EffectFlickChicken.setAttributeNode(IdEffectFlickChicken);

    await Contents.append(EffectFlickChicken);

}

// 効果音の準備
const ManagerAudio = new AudioContext();

let SoundFlickChicken, SoundSourceFlickChicken;

let SoundJumpChicken, SoundSourceJumpChicken;

let SoundFlickCrab, SoundSourceFlickCrab;

async function SetUpSoundSourceFlickChicken() {

    const Response = await fetch("/assets/sound/flick-chicken.mp3");
    const ResponseBuffer = await Response.arrayBuffer();

    const AudioBuffer = await ManagerAudio.decodeAudioData(ResponseBuffer);

    return AudioBuffer;

}

async function SetUpSoundSourceJumpChicken() {

    const Response = await fetch("/assets/sound/jump-chicken.mp3");
    const ResponseBuffer = await Response.arrayBuffer();

    const AudioBuffer = await ManagerAudio.decodeAudioData(ResponseBuffer);

    return AudioBuffer;

}

async function SetUpSoundSourceFlickCrab() {

    const Response = await fetch("/assets/sound/flick-crab.mp3");
    const ResponseBuffer = await Response.arrayBuffer();

    const AudioBuffer = await ManagerAudio.decodeAudioData(ResponseBuffer);

    return AudioBuffer;

}

async function StartGameManagerJS() {

    SwitchLanguage();

    await SetUpEffectFlickChicken();

    StyleEffectFlickChicken = getComputedStyle(EffectFlickChicken);

    SoundSourceFlickChicken = await SetUpSoundSourceFlickChicken();
    SoundSourceJumpChicken = await SetUpSoundSourceJumpChicken();
    SoundSourceFlickCrab = await SetUpSoundSourceFlickCrab();

}

StartGameManagerJS();