document.addEventListener("DOMContentLoaded", async () => {
  const wordListDiv = document.getElementById("word-list");
  const learned = JSON.parse(localStorage.getItem("learnedWords") || "{}");

  try {
    const res = await fetch("wordlist.json");
    const words = await res.json();

    words.forEach(({ word, meaning }) => {
      const box = document.createElement("div");
      box.className = "word-box";

      const isLearned = learned[word];

      box.innerHTML = `
        <div class="word-header">
          <div class="word-text"><strong>${word}</strong></div>
          <button class="check-btn">${isLearned ? "✅" : "☐"}</button>
        </div>
        <div class="meaning-text" style="display: none;">${meaning}</div>
      `;

      // 클릭하면 뜻 토글
      box.querySelector(".word-text").addEventListener("click", () => {
        const meaningDiv = box.querySelector(".meaning-text");
        const isHidden = meaningDiv.style.display === "none";
        meaningDiv.style.display = isHidden ? "block" : "none";
      });

      // 체크 버튼 동작
      box.querySelector(".check-btn").addEventListener("click", (e) => {
        e.stopPropagation(); // 클릭이 토글에 영향 안 주도록
        const btn = e.target;
        const newState = !learned[word];
        learned[word] = newState;
        localStorage.setItem("learnedWords", JSON.stringify(learned));
        btn.textContent = newState ? "✅" : "☐";
      });

      wordListDiv.appendChild(box);
    });
  } catch (e) {
    wordListDiv.innerText = "단어를 불러오는 데 실패했습니다.";
    console.error(e);
  }
});