const form = document.querySelector(".input-form"),
  input = document.querySelector(".input"),
  text_item = document.querySelector(".text-item"),
  audio = document.querySelector("#audio"),
  playBtn = document.querySelector("#playBtn"),
  play = document.querySelector(".play-icon"),
  checkbox = document.querySelector(".checkbox"),
  type = document.querySelector(".type"),
  meanings = document.querySelector(".meaining");

if (input.value === "") {
  getData("Hello");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getData(input.value);
  input.value = "";
});

const updateUI = (data) => {
  data.map((data) => {
    let phoneticsArr = data.phonetics.filter((item) => item.text);
    let textPhonetic = phoneticsArr[0].text;
    let audioSrcArr = data.phonetics.filter((item) => item.audio);
    let audioSrc = audioSrcArr[0].audio;

    if (textPhonetic !== undefined) {
      text_item.innerHTML = `
        <h1>${data.word}</h1>
        <p>${textPhonetic}</p>
    `;
    } else {
      text_item.innerHTML = `
        <h1>${data.word}</h1>
        <p>Sorry phonetic is not defined</p>
    `;
    }
    audioSource(audioSrc);

    type.innerHTML = `
    <p>${data.meanings[0].partOfSpeech}</p>
    <div class="line"></div>
    `;

    meanings.innerHTML = "";
    data.meanings.map((item) => {
      item.definitions.map((def) => {
        meanings.innerHTML += `
        <ul>
          <li>${def.definition}</li>
        </ul>
        `;
      });
    });
  });
};

const audioSource = (source) => {
  audio.src = source;
};

const playAudio = () => {
  if (play.classList.contains("bx-play") && audio.currentSrc !== "") {
    play.classList.remove("bx-play");
    play.classList.add("bx-pause");
    audio.play();
  } else {
    play.classList.add("bx-play");
    play.classList.remove("bx-pause");
  }
};

const pauseAudio = () => {
  audio.pause();
  if (play.classList.contains("bx-pause")) {
    play.classList.remove("bx-pause");
    play.classList.add("bx-play");
  }
};


playBtn.addEventListener("click", playAudio);
audio.addEventListener("ended", pauseAudio);
updateUI();
