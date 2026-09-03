// オプションメニュー画面の切り替えに関する処理をまとめたファイル
// このファイルで説明している「カニ」はゲームのカニではなくオプションメニュー画面の「カニ」（５匹並んで跳ねているやつ）です

// 制御したいHTML要素を取得
const HomeMenu = document.querySelector("#HomeMenu");

const Palette = document.querySelector("#Palette");
const ArrayIcon = document.querySelectorAll(".Icon");
const ArrayMenuCrab = document.querySelectorAll(".MenuCrab");

// オプションボタンのクリックでオプションメニュー画面を切り替える
ButtonOption.addEventListener("click", () => {

    // クリックするたびに、各要素に「OnClickOption」クラスを追加除去
    HomeMenu.classList.toggle("OnClickOption");

    Palette.classList.toggle("OnClickOption");
    
    for (const MenuCrab of ArrayMenuCrab) {
        MenuCrab.classList.toggle("OnClickOption");
    }

    Footer.classList.toggle("OnClickOption");

});

// アイコンのクリックで別ページに移動
for (const Icon of ArrayIcon) {

    Icon.addEventListener("click", (event) => {

        switch (event.currentTarget.id) {

            case "100sFishing":
                open("https://rygbworks.itch.io/100sfishing");
                break;

        }

    });

}