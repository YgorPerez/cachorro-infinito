let timer;
let deletePrimeiraFotoDelay;
async function iniciar() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        criarListaRaca(data.message);
    }
    catch (e) {
        console.log("Teve um erro ao tentar se comunicar com a api.");
    }
}
iniciar();
function criarListaRaca(listaRaca) {
    document.getElementById("raca").innerHTML = `
        <option>Escolha uma raça</option>
        ${Object.keys(listaRaca).map(function (raca) {
        return `<option>${raca}</option>`;
    }).join('')}
    `;
}
async function carreguePorRaca(raca) {
    if (raca != "Escolha uma raça") {
        const response = await fetch(`https://dog.ceo/api/breed/${raca}/images`);
        const data = await response.json();
        criarSlideShow(data.message);
    }
    else {
        let data = "";
        criarSlideShow(data);
    }
}
function criarSlideShow(imagens) {
    let posicaoAtual = 0;
    clearInterval(timer);
    clearTimeout(deletePrimeiraFotoDelay);
    if (imagens.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <picture class="slide" style="background-image: url('${imagens[0]}')"></picture>
    <picture class="slide" style="background-image: url('${imagens[1]}')"></picture>
    `;
        posicaoAtual += 2;
        if (imagens.length == 2)
            posicaoAtual = 0;
        timer = setInterval(proximoSlide, 3000);
    }
    else {
        document.getElementById("slideshow").innerHTML = `
    <picture class="slide" style="background-image: url('${imagens[0]}')"></picture>
    <picture class="slide"></picture>
    `;
    }
    function proximoSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<picture class="slide" style="background-image: url('${imagens[posicaoAtual]}')"></picture>`);
        deletePrimeiraFotoDelay = setTimeout(function () {
            document.querySelector(".slide").remove();
        }, 1000);
        if (posicaoAtual + 1 >= imagens.length) {
            posicaoAtual = 0;
        }
        else {
            posicaoAtual++;
        }
    }
}
