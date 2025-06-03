document.getElementById("search-btn").addEventListener("click", () => {
    const frontendInput = document.getElementById("frontend").value;
    const backendInput = document.getElementById("backend").value;
    const resultDiv = document.getElementById("result");

    if (!frontendInput || !backendInput) {
        resultDiv.textContent = "Kérlek, töltsd ki mindkét mezőt!";
        return;
    }

    const fullStackDevs = fullStack(frontendInput, backendInput);
    resultDiv.textContent = fullStackDevs.length > 0 ? `Full Stack fejlesztők: ${fullStackDevs.join(", ")}` : "Nincs közös fejlesztő!";
});

function fullStack(frontend, backend) {
    const frontendDevs = frontend.split(";").map(name => name.trim());
    const backendDevs = backend.split(";").map(name => name.trim());

    return frontendDevs.filter(dev => backendDevs.includes(dev));
}
