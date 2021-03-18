let timer;
let deletePrimeiraFotoDelay;

async function iniciar() {
    try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    criarListaRaca(data.message);
    } catch (e) {
    console.log ("Teve um erro ao tentar se comunicar com a api.");
}
}

iniciar();

function criarListaRaca(listaRaca) {
    document.getElementById("raca").innerHTML = `
    <select onchange="carreguePorRaca(this.value)">
        <option>Escolha uma raça</option>
        ${Object.keys(listaRaca).map(function (raca) {
        return `<option>${raca}</option>`
        }).join('')}
    </select>
    `
}

async function carreguePorRaca(raca) {
    if (raca != "Escolha uma raça") {
    const response = await fetch(`https://dog.ceo/api/breed/${raca}/images`);
    const data = await response.json();
    crieSlideShow(data.message);
    }

    else {
        let data = "" 
        crieSlideShow(data) 
    }
}

function crieSlideShow(imagens) {
    let posicaoAtual = 0;
    clearInterval(timer);
    clearTimeout(deletePrimeiraFotoDelay);
    var fotos = []
    var foto;
    function crieFotos() {
        let numero = Math.floor(Math.random() * imagens.length)
        let unico = true
        fotos = imagens
        foto = imagens[numero]
        for (let x = 0; x < imagens.length; x++) {
            if (fotos[x] == foto) {
                unico = false
                crieFotos()
                break
            }
            else {
                fotos.unshift(foto)
            }
        }
    }

    if (imagens.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${foto}')"></div>
    `;
    crieFotos()
    document.getElementById("slideshow").innerHTML += `
    <div class="slide" style="background-image: url('${foto}')"></div>
    `;
    posicaoAtual += 2;
    if (imagens.length == 2) posicaoAtual = 0;
    timer = setInterval(proximoSlide, 3000);
    } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${imagens[0]}')"></div>
    <div class="slide"></div>
    `;
    }

    function proximoSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${foto}')"></div>`);
        deletePrimeiraFotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove();
        }, 1000);
    }
}