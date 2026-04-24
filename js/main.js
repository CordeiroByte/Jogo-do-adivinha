const cardBox = document.getElementById("cardbox")
const frm = document.querySelector("form")
const outResp1 = document.getElementById("outResp1")
const outResp2 = document.getElementById("outResp2")
const outDica = document.getElementById("outDicas")
const btNovo = document.getElementById("btNovo")
const btSubmit = document.getElementById("btSubmit")

const numApostados = []
const numSorteado = Math.floor(Math.random() * 100) + 1
const numChances = 6

btNovo.addEventListener("click", () => {
    location.reload()
})

function jogarNovamente() {
    btSubmit.disabled = true
    btNovo.className = `exibe`
    btNovo.focus()
    return
}

function ordenandoNumeros() {
    const numApostadosOrdenados = [...numApostados].sort((a, b) => a - b)
    outResp1.textContent = `Erros: ${numApostados.length} (${numApostadosOrdenados.join(", ")})`
    outResp2.textContent = `Chances: ${numChances - numApostados.length}`
    return
}

function calculoDeJogadas(num) {
    numApostados.push(num)
    const dica = testeDaDica(num)
    ordenandoNumeros()
    outDica.textContent = `Dica: ${dica}`
    frm.inNum.value = ""
    frm.inNum.focus()
}

function testeDaDica(num) {
    const posicao = [...numApostados, numSorteado].sort((a, b) => a - b)
    const index = posicao.indexOf(numSorteado)
    const anterior = posicao[index - 1]
    const proximo = posicao[index + 1]

    if (anterior !== undefined && proximo !== undefined) return `é um número maior que ${anterior} e menor que ${proximo}`;
    if (anterior !== undefined) return `é um número maior que ${anterior}`;
    if (proximo !== undefined) return `é um número menor que ${proximo}`;
    return (num < numSorteado) ? `é um número maior que ${num}` : `é um número menor que ${num}`;
}

frm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const num = Number(frm.inNum.value)

    if (num < 1 || num > 100) {
        alert("Digite um número entre 1 e 100")
        frm.inNum.value = ""
        frm.inNum.focus()
        return
    }
    if (numApostados.includes(num)) {
        alert(`Você já apostou esse número ${num}`)
        frm.inNum.value = ""
        frm.inNum.focus()
        return
    }
    if (num === numSorteado) {
        outDica.textContent = `Parabéns você acertou o número era ${numSorteado}`
        cardBox.style.backgroundColor = "lightgreen"
        jogarNovamente()
        return
    }
    if (numApostados.length >= numChances - 1) {
        ordenandoNumeros(num)
        alert(`Voce perdeu o número era ${numSorteado}`)
        jogarNovamente()
        return
    }

    calculoDeJogadas(num)

})
