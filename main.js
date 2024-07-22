"use strict";

// タイトル画面　セクション
const title = document.querySelector(".title");
// ３択ゲーム選択画面のタイトル　セクション
const quizGameTitle = document.querySelector(".quiz-game-title ");
// クイズゲーム優しいのタイトル　セクション
const easyQuiz = document.querySelector(".easy-quiz ");
// クイズゲーム鬼のタイトル　セクション
const hardQuiz = document.querySelector(".hard-quiz ");
// クイズゲーム神のタイトル　セクション
const godQuiz = document.querySelector(".god-quiz ");
// 問題文
const questions = document.querySelector(".questions");
// 回答ボタンのコンテナ
const answerContainer = document.querySelector(".answers");
// 回答ボタン
const answers = document.querySelectorAll(".answer");
// 回答ボタン各種
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
// 敵
const enemy = document.querySelector('.enemy');
// 正解、不正解時に出すディスプレイ
const correctDisplay = document.querySelector('.correct-display');
// 上記の正解、不正解の文
const corOrDiscor = document.querySelector('.corOrDiscor');
// 答えの理由
const because = document.querySelector('.because');
// 攻撃のアクション
const attackContainer = document.querySelector('.attack-container');
// 防御アクション
const defenseContainer = document.querySelector('.defenseContainer');
// プレイヤーの体力が無くなった時のブラックアウト
const blackOut = document.querySelector('.blackOut');
// 敵の体力がなくなった時のクリアディスプレイ
const clearContainer = document.querySelector('.clearContainer');
// 上記のゲームクリア！という文
const clear = document.querySelector('.clear');
// 敵の体力
const enemyLife = document.querySelector('.enemyLife');
// プレイヤーの体力
const myLife = document.querySelector('.myLife');
// カウントダウンタイマー
const timer = document.querySelector(".timer");
// 敵の体力のカウント
let easyEnemyHeartCount = 0;
// プレイヤーの体力のカウント
let easyMyHeartCount = 0;
// タイマーの初期値
let time = 15;
// clearTimeOutのID
let timeOutId;

enemyLife.textContent = Number(easyEnemyHeartCount);
myLife.textContent = Number(easyMyHeartCount);


// ディスプレイを消す関数
const disNone = (disnone) => {
    disnone.style.display = 'none';
};
// ディスプレイをブロックにする関数
const disBlock = (disblock) => {
    disblock.style.display = 'block';

};


// タイトル画面の雨降らせ
const createRainy = () => {
    let rain = document.createElement("span");
    rain.className = "rain";

    rain.style.left = Math.random() * 100 + "%";
    title.appendChild(rain);

    setTimeout(() => {
        rain.remove();
    }, 10000);
};
setInterval(createRainy, 50);

// タイトルから４択クイズゲーム画面へ
const quizGame = (btn) => {
    disNone(title);
    disBlock(quizGameTitle);

};


// 3択クイズゲームタイトルの雨降らせ
let shineContainer = document.querySelector(".quiz-game-title");

const createShiny = () => {
    let shine = document.createElement("span");
    shine.className = "shine";

    shine.style.top = Math.random() * 100 + "%";
    shineContainer.appendChild(shine);

    shine.style.left = Math.random() * 100 + "%";
    shineContainer.appendChild(shine);

    setTimeout(() => {
        shine.remove();
    }, 1000);
};
setInterval(createShiny, 400);

// ４択クイズ画面から優しいへ
const quizGameEasy = (btn) => {
    disNone(quizGameTitle);
    disBlock(easyQuiz);
    disBlock(questions);
    enemy.classList.remove('hard-enemy');
    enemy.classList.remove('god-enemy');
    enemy.classList.add('easy-enemy');
    backImage.classList.remove('quiz-hard-back-image');
    backImage.classList.remove('quiz-god-back-image');
    backImage.classList.add('quiz-easy-back-image');
    easyEnemyHeartCount = 2;
    easyMyHeartCount = 3;
    enemyLife.textContent = Number(easyEnemyHeartCount);
    myLife.textContent = Number(easyMyHeartCount);
    createEnemy();
    timer.textContent = time;
    answerContainer.style.opacity = 1;
    disNone(clearContainer);
    setTimeout(() => {
        time = 15;
        countdownTimer();
        setUpQuiz(easyQAC);
        bornAnswer();
    }, 1000);

};


// 優しい、問題と答えと正解
const easyQAC = [
    {
        question: "ダンゴムシの呼吸法は？",
        answer: ["A:エラ呼吸", "B:肺呼吸", "C:皮膚呼吸"],
        correct: "A:エラ呼吸",
        because: "  ダンゴムシはエラ呼吸なので、溺れません。",
    },
    {
        question: "人の味覚にないのはどれ？ ",
        answer: ["A:辛味", "B:塩味", "C:酸味"],
        correct: "A:辛味",
        because: "人の味覚は苦み、酸味、旨味、塩味、甘味の5種類です。",
    },
    {
        question: "ハムスターが1日にどのくらい走るでしょうか？",
        answer: ["A:100m", "B:1km", "C:5km"],
        correct: "C:5km",
        because:
            "ハムスターは食べ物を探すために走るため。ゲージに回し車があるのはそのため。",
    },
    {
        question: "猫の平熱は何度でしょうか？",
        answer: ["A:36度", "B:37度", "C:38度"],
        correct: "C:38度",
        because: "猫の平熱は38～39度と言われています。",
    },
    {
        question: "食パンの正式名称は何でしょうか？        ",
        answer: ["A:食事パン", "B:主食用パン", "C:朝食パン"],
        correct: "B:主食用パン",
        because: "食パンの正式名称は「主食用パン」です。",
    },
    {
        question: "氷を電子レンジで温めるとどうなるでしょう？",
        answer: ["A:溶けて水になる", "B:蒸発してなくなる", "C:氷のまま"],
        correct: "C:氷のまま",
        because: "電子レンジの加熱は火で温めるのではなく、マイクロ波による水分振動で加熱します。氷は水分ではなく固体なので振動しないため加熱できません",
    },
];

const easyEnemy = document.querySelector('.easy-enemy');
const hardEnemy = document.querySelector('.hard-enemy');
const backImage = document.querySelector('.backImage');
const easyBackImage = document.querySelector('.quiz-easy-back-image');
const hardBackImage = document.querySelector('.quiz-hard-back-image');



// ４択クイズ画面から鬼へ
const quizGameHard = (btn) => {
    disNone(quizGameTitle);
    disBlock(easyQuiz);
    disBlock(questions);
    enemy.classList.remove('easy-enemy');
    enemy.classList.remove('god-enemy');
    enemy.classList.add('hard-enemy');
    backImage.classList.remove('quiz-easy-back-image');
    backImage.classList.remove('quiz-god-back-image');
    backImage.classList.add('quiz-hard-back-image');
    easyEnemyHeartCount = 3;
    easyMyHeartCount = 3;
    enemyLife.textContent = Number(easyEnemyHeartCount);
    myLife.textContent = Number(easyMyHeartCount);
    createEnemy();
    timer.textContent = time;
    answerContainer.style.opacity = 1;
    disNone(clearContainer);
    time = 15;
    setTimeout(() => {
        countdownTimer();
        setUpQuiz(hardQAC);
        bornAnswer();
    }, 1000);
};

// 鬼の問題と答えと正解
const hardQAC = [
    {
        question: "シュークリームの「シュー」の意味は？",
        answer: ["A:キャベツ", "B:わた", "C:雲"],
        correct: "A:キャベツ",
        because: "フランス語でキャベツを意味します。焼きたてのシュークリームがキャベツに似ていることから名づけられました",
    },
    {
        question: "納豆は元々は何？",
        answer: ["A:枝豆", "B:小豆", "C:ナッツ"],
        correct: "A:枝豆",
        because: "納豆は大豆を発酵（はっこう）させてできていますが、この大豆は枝豆が成長したものです。",
    },
    {
        question: "身体のなかで一番薄い皮膚は？",
        answer: ["A:まぶた", "B:おでこ", "C:お腹"],
        correct: "A:まぶた",
        because: "身体のなかで1番薄い皮膚はまぶた。ちなみに1番厚い皮膚はかかとです。",
    },
    {
        question: "10年前と比べて日本の人口は増えている？減っている？",
        answer: ["A:増えている", "B:減っている", "C:変わらない"],
        correct: "B:減っている",
        because: "13年連続で人口は減少しています。",
    },
    {
        question: "日本ではじめてペンネームを使ったのは？",
        answer: ["A:紫式部", "B:夏目漱石", "C:太宰治"],
        correct: "A:紫式部",
        because: "日本ではじめてペンネームを使ったのは紫式部と言われています。紫式部は平安時代の作家で源氏物語を書きました。",
    },
    {
        question: "ナポレオンの提案で取り入れられたスーツの特徴は？",
        answer: ["A:胸元に襟をつける", "B:袖にボタンをつける", "C:ポケットをつける"],
        correct: "B:袖にボタンをつける",
        because: "当時の兵士たちは袖で鼻をふいていました。その姿をだらしないと思ったナポレオンが、鼻をふきづらくするために袖口にボタンをつけさせたと言われています。",
    },
    {
        question: "日本にいる猫の一番多い血液型は？",
        answer: ["A:A型", "B:O型", "C:猫に血液型はない"],
        correct: "A:A型",
        because: "猫にはA型、B型、AB型の3種類の血液型があります。そのうち、日本でもっとも多い猫の血液型はA型で、猫全体の70%はA型です。",
    },
    {
        question: "イルカが寝るときは？",
        answer: ["A:ヒレをゆする", "B:片目ずつ閉じる", "C:歌を歌う"],
        correct: "B:片目ずつ閉じる",
        because: "イルカは哺乳類のため、寝ているときでも水面に鼻を出して呼吸する必要があります。イルカが片目を閉じて寝ているときは左脳と右脳の半分ずつ休めて寝る「半球睡眠」中で、脳の半分は起きて呼吸をしています。一方、両目を閉じているときは「全球睡眠」をしています。",
    },
    {
        question: "コアラの睡眠時間は？",
        answer: ["A:約5時間", "B:約10時間", "C:約20時間"],
        correct: "C:約20時間",
        because: "夜行性のコアラは日中18〜20時間寝ています。長く寝る理由は、コアラのエサであるユーカリの葉には毒素があるため。毒を消化するために多くのエネルギーを必要とするからです。",
    },
];

// ４択クイズ画面から神へ
const quizGameGod = (btn) => {
    disNone(quizGameTitle);
    disBlock(easyQuiz);
    disBlock(questions);
    enemy.classList.remove('easy-enemy');
    enemy.classList.remove('hard-enemy');
    enemy.classList.add('god-enemy');
    backImage.classList.remove('quiz-easy-back-image');
    backImage.classList.remove('quiz-hard-back-image');
    backImage.classList.add('quiz-god-back-image');
    easyEnemyHeartCount = 5;
    easyMyHeartCount = 2;
    enemyLife.textContent = Number(easyEnemyHeartCount);
    myLife.textContent = Number(easyMyHeartCount);
    createEnemy();
    timer.textContent = time;
    answerContainer.style.opacity = 1;
    disNone(clearContainer);
    setTimeout(() => {
        time = 15;
        countdownTimer();
        setUpQuiz(godQAC);
        bornAnswer();
    }, 1000);
};



// 神の問題と答えと正解
const godQAC = [
    {
        question: '「敵に塩を送る」という言葉がありますが、その由来となった人物は誰でしょうか？',
        answer: ['A:上杉謙信', 'B:武田信玄', 'C:伊達政宗'],
        correct: 'A:上杉謙信',
        because: '「敵に塩を送る」とは、「敵の弱みにつけこまないで、逆にその苦境から救うことの例え」です。上杉謙信が、敵である武田信玄が塩不足で困っているという話を聞き、塩を送ったという逸話が由来となっています。',
    },
    {
        question: '現在も人間と一緒に暮らしている動物の代表格である「犬」。日本ではいつ頃から人間と一緒に暮らしていたと言われているでしょうか？',
        answer: ['A:縄文時代', 'B:平安時代', 'C:江戸時代'],
        correct: 'A:縄文時代',
        because: '縄文時代の遺跡からは、「縄文犬」と呼ばれる犬の骨が見つかっています。骨折してそれが治った形跡や、歯が折れた形跡などが見つかっていることから縄文人にとって犬は狩りの相棒的な存在であったと考えられています。また、全身の骨が見つかることも多いことから犬を大切にして、死んだ後には埋葬する文化もあったと考えられています。',
    },
    {
        question: '聖徳太子が広めたと言われているものはなんでしょうか？',
        answer: ['A:靴ベラ', 'B:箸', 'C:石鹸'],
        correct: 'B:箸',
        because: '箸は、聖徳太子が活躍するよりも前に日本に伝わっていたと言われています。しかし、誰もが面倒くさがって手づかみで食事をしていたため広まることはありませんでした。そんな中、箸が広まるきっかけとなったのが「遣隋使の派遣」でした。隋と対等な付き合いをしていこうと言うのに、国の代表とも言える遣隋使が箸も満足に使えず、手づかみで食事をしているようでは面目丸つぶれです。そこで聖徳太子が箸を使うことを推奨し、遣隋使は箸を使うことができるようになりました。それがきっかけとなり、箸を使う文化が広まっていったと言われています。',
    },
    {
        question: '血圧を下げる効果のある食品は次のうちどれでしょうか？',
        answer: ['A:しいたけ', 'B:レバー', 'C:卵'],
        correct: 'A:しいたけ',
        because: 'しいたけの戻し汁は、高血圧の治療に使われている血圧降下剤と同じ働きをすると言われています。薬と違って副作用の心配がなく確実に血圧を下げてくれます。おつまみとしてサラダやソテーにして食べるのもお勧めです。',
    },
    {
        question: '世界一大きな声を出す動物はどれでしょうか？',
        answer: ['A:カバ', 'B:ライオン', 'C:クジラ'],
        correct: 'C:クジラ',
        because: '外かもしれませんが、世界一大きな声を出す動物はクジラです。世界一大きな動物でもある「シロナガスクジラ」は大きな声も出すことができます。その声は150㎞先の仲間にも届くと言われています。',
    },
    {
        question: '江戸時代、ある意外な動物に官位が与えられました。その動物とはなんでしょうか？',
        answer: ['A:カバ', 'B:ゾウ', 'C:キリン'],
        correct: 'B:ゾウ',
        because: '江戸幕府の第8代将軍、徳川吉宗はゾウを購入したことがあります。当時、天皇に拝謁するためには官位が必要であり、それは動物であるゾウも例外ではないとされました。ゾウを京都の中御門天皇の元に連れて行くために、ゾウに位階と称号が与えられました。そのゾウは、「広南従四位白象（こうなんじゅしいはくぞう）」と呼ばれています。',
    },
    {
        question: 'ハンカチが四角形になるきっかけを作った人物は誰でしょうか？',
        answer: ['A:ヘレン・ケラー', 'B:マリー・アントワネット', 'C:エジソン'],
        correct: 'B:マリー・アントワネット',
        because: '18世紀末のフランスでは、三角形や円形などのハンカチも存在したようです。しかし、マリー・アントワネットが「ハンカチは全て正方形にするべき」という旨の進言をルイ16世にしたことで現在の四角いハンカチが一般的になりました。',
    },
    {
        question: '食後はどのようにして過ごすのが1番胃腸の消化に良いでしょうか？',
        answer: ['A:運動する', 'B:横になる', 'C:立っておく'],
        correct: 'B:横になる',
        because: '食後すぐに横になるのは、駄目な事だとよく言われています。しかし、食後30分くらい静かに横になった方が胃腸の消化を助けます。ただ熟睡してしまうと逆に胃腸の消化不良になってしまうので、ゴロ寝やソファでくつろぐのがオススメです。',
    },
];




// カウントダウンタイマー

// カウントダウンしていく関数
const countdownTimer = () => {
    if (time > 0) {
        time--;
        timer.textContent = time;
        timeOutId = setTimeout(countdownTimer, 1000);
    } else {
        deleteAnswer();
        clearTimeout(timeOutId);
        easyMyHeartCount--;
        answerContainer.style.opacity = 0;
        setTimeout(() => {
            myLife.textContent = Number(easyMyHeartCount);
        }, 1000);
        setTimeout(() => {
            disBlock(correctDisplay);
            corOrDiscor.textContent = '不正解';
            corOrDiscor.style.color = 'blue';
            because.textContent = randomQuestion.because;
        }, 1000);

    }
};

// 敵が登場する関数
const createEnemy = () => {
    enemy.animate(
        // 変化させるスタイル
        [
            { transform: 'translate(-110px,-1000px)' },
            { transform: 'translate(-110px,-80px)' },
        ],
        // プロパティ
        {
            duration: 1000,
            fill: "forwards",
        });
};

// クリアした時に起こることの関数
const deleteEnemy = () => {
    enemy.animate(
        // 変化させるスタイル
        [
            { transform: 'translate(-110px,-80px)' },
            { transform: 'translate(-110px,-1000px)' },
        ],
        // プロパティ
        {
            duration: 2000,
            fill: "forwards",
        });
    disNone(questions);
    answerContainer.style.opacity = 0;
    clearTimeout(timeOutId);
    timer.textContent = '';
};

// ゲームオーバーなった時のリロード関数
const gameOver = () => {
    window.location.reload();
};


// ランダムに問題を持ってくる
let randomQuestion;

const randomQuestions = (level) => {
    randomQuestion = level.splice(
        Math.floor(Math.random() * level.length), 1)[0];
    return randomQuestion;
};


// 問題を移す
const setUpQuiz = (set) => {
    answerContainer.style.opacity = 1;
    randomQuestions(set);
    questions.textContent = randomQuestion.question;
    let buttonIndex = 0;
    while (buttonIndex < randomQuestion.answer.length) {
        answers[buttonIndex].textContent = randomQuestion.answer[buttonIndex];
        buttonIndex++;
    }
};


// 戦闘中にボタンを押せなくする関数
const deleteAnswer = () => {
    answer1.disabled = true;
    answer2.disabled = true;
    answer3.disabled = true;

};
// 戦闘中にボタンを押せるようにする関数
const bornAnswer = () => {
    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;

};

// 回答ボタンを押した時に起こる事
const quizGameCorrect = (btn) => {
    // 正解の時に起こる
    if (btn.textContent === randomQuestion.correct) {
        console.log('good');
        deleteAnswer();
        clearTimeout(timeOutId);
        easyEnemyHeartCount--;
        disBlock(attackContainer);
        answerContainer.style.opacity = 0;
        setTimeout(() => {
            disNone(attackContainer);
            enemyLife.textContent = Number(easyEnemyHeartCount);
        }, 4000);
        setTimeout(() => {
            disBlock(correctDisplay);
            corOrDiscor.textContent = '正解';
            corOrDiscor.style.color = 'red';
            because.textContent = randomQuestion.because;
        }, 4000);

        // 不正解の時に起こる
    } else {
        deleteAnswer();
        clearTimeout(timeOutId);
        easyMyHeartCount--;
        disBlock(attackContainer);
        answerContainer.style.opacity = 0;
        disBlock(defenseContainer);
        setTimeout(() => {
            attackContainer.style.display = 'none';
            defenseContainer.style.display = 'none';
            myLife.textContent = Number(easyMyHeartCount);
        }, 4000);
        setTimeout(() => {
            disBlock(correctDisplay);
            corOrDiscor.textContent = '不正解';
            corOrDiscor.style.color = 'blue';
            because.textContent = randomQuestion.because;
        }, 4000);

    }
};

// 正解した時に出てくるdisplayをクリックした時に起こる
const displayClick = (disp) => {
    // クリア時
    if (easyEnemyHeartCount <= 0) {
        deleteEnemy();
        disNone(correctDisplay);
        disBlock(clearContainer);
        // ゲームオーバー時
    } else if (easyMyHeartCount <= 0) {
        disBlock(blackOut);
        setTimeout(() => {
            gameOver();
        }, 5000);
        // ゲーム続行
    } else {
        disNone(correctDisplay);
        time = 15;
        bornAnswer();
        setTimeout(() => {
            countdownTimer();
            if (enemy.classList.contains("easy-enemy")) {
                setUpQuiz(easyQAC);
            } else if (enemy.classList.contains("hard-enemy")) {
                setUpQuiz(hardQAC);
            } else {
                setUpQuiz(godQAC);
            }
        }, 1000);

    }
};

// クリア後のボタンでクイズタイトル画面へ
const quizGameButtonEasy = document.getElementById('quiz-game-button-easy');
const quizGameButtonHard = document.getElementById('quiz-game-button-hard');
const quizGameButtonGod = document.getElementById('quiz-game-button-god');

const quizTitleGo = (quibtn) => {
    if (enemy.classList.contains("easy-enemy")) {
        quizGameButtonEasy.disabled = true;
    } else if (enemy.classList.contains("hard-enemy")) {
        quizGameButtonHard.disabled = true;
    } else if (enemy.classList.contains("god-enemy")) {
        quizGameButtonGod.disabled = true;
    }
    disNone(easyQuiz);
    disBlock(quizGameTitle);
}
// クリア後のボタンでタイトル画面へ
const titleGo = (tibtn) => {
    if (enemy.classList.contains("easy-enemy")) {
        quizGameButtonEasy.disabled = true;
    } else if (enemy.classList.contains("hard-enemy")) {
        quizGameButtonHard.disabled = true;
    } else if (enemy.classList.contains("god-enemy")) {
        quizGameButtonGod.disabled = true;
    }
    disNone(easyQuiz);
    disBlock(title);

};

