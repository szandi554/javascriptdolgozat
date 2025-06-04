document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll("body > div");
    const lastIndex = divs.length - 1; 

    if (divs.length === 5) {
        divs[0].textContent = "Első";
        divs[lastIndex].textContent = "Utolsó";
        divs[2].textContent = "Harmadik";

        divs.forEach((div, index) => {
            if (index !== 0 && index !== 2 && index !== lastIndex) {
                div.textContent = `Elem sorszáma a bodyban: ${index}`;
            }
        });
    } else {
        console.error("Nem pontosan 5 div található az oldalon!");
    }
});

