document.getElementById("generate-btn").addEventListener("click", () => {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Generálás...";

    setTimeout(() => {
        resultDiv.textContent = otoslotto().join(", ");
    }, 1000);
});

function otoslotto() {
    let lottoNumbers = new Set();

    while (lottoNumbers.size < 5) {
        let randomNumber = Math.floor(Math.random() * 90) + 1;
        lottoNumbers.add(randomNumber);
    }

    return [...lottoNumbers].sort((a, b) => a - b);
}
