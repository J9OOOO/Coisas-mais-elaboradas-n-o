const gh = require('decimal.js')

const Op = {
    "+": {peso: 1, tipo: "+", usa: 2},
    "-": {peso: 1, tipo: "-", usa: 2},
    "*": {peso: 2, tipo: "*", usa: 2},
    "/": {peso: 2, tipo: "/", usa: 2},
    "neg": {peso: 3, tipo: "neg", usa: 1},
    "^": {peso: 3, tipo: "^", usa: 2},
    "exp": {peso: 3, tipo: "exp", usa: 1},
    "sin": {peso: 4, tipo: "sin", usa: 1},
    "cos": {peso: 4, tipo: "cos", usa: 1},
    "tan": {peso: 4, tipo: "tan", usa: 1},
    "sinh": {peso: 4, tipo: "sinh", usa: 1},
    "cosh": {peso: 4, tipo: "cosh", usa: 1},
    "tanh": {peso: 4, tipo: "tanh", usa: 1},
    "asin": {peso: 4, tipo: "asin", usa: 1},
    "acos": {peso: 4, tipo: "acos", usa: 1},
    "atan": {peso: 4, tipo: "atan", usa: 1},
    "asinh": {peso: 4, tipo: "asinh", usa: 1},
    "acosh": {peso: 4, tipo: "acosh", usa: 1},
    "atanh": {peso: 4, tipo: "atanh", usa: 1},
    "sqrt": {peso: 4, tipo: "sqrt", usa: 1},
    "cbrt": {peso: 4, tipo: "cbrt", usa: 1},
    "nrt": {peso: 4, tipo: "nrt", usa: 2},
    "log": {peso: 4, tipo: "log", usa: 1},
    "ln": {peso: 4, tipo: "ln", usa: 1},
    "logn": {peso: 4, tipo: "logn", usa: 2},
    "(": "(",
    ")": ")"
}
let listaOp = []
for(let j = 0; (Object.values(Op)[j].tipo) !== undefined; j++) listaOp.push({peso: Object.values(Op)[j].peso, tipo: Object.values(Op)[j].tipo, usa: Object.values(Op)[j].usa})
listaOp.sort((a, b) => b.tipo.length - a.tipo.length);
//onsole.log(listaOp)

function Numb(string) {
    let CompNumb = []

    for (let i = 0; i < string.length; i++) {
        let numero = ""

        if (!isNaN(Number(string[i]))) {
            while (i < string.length && (!isNaN(Number(string[i])) || string[i] === ".")) {
                numero += string[i]
                ++i
            }
            CompNumb.push(gh(numero))
            --i
        } else {CompNumb.push(string[i])}
    }

    return CompNumb
}


/*
function Operadores(string) {
    let CompOperadores = []
    let pronto = false

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < listaOp.length; j++) {
            pronto = false

            //if (i > string.leng) break

            let texto = string.slice(i, i + listaOp[j].tipo.length).join("")
            //console.log(texto, listaOp[j].tipo)
            if (texto === listaOp[j].tipo) {
                CompOperadores.push(listaOp[j])
                i += listaOp[j].tipo.length - 1
                pronto = true
                break
            }
        }
        if (!pronto) {
            CompOperadores.push(string[i])
        }
    }
    return CompOperadores
} 
Esse daqui foi para a casa do caralho, AEEEEEEEEEEEEEEEEE  
*/

function Operadores(string) {
    let CompOperadores = []
    let pronto = false

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < listaOp.length; j++) {
            pronto = false

            //if (i > string.leng) break

            let texto = string[i]
            //console.log(texto, listaOp[j].tipo)
            if (texto === listaOp[j].tipo) {
                CompOperadores.push(listaOp[j])
                pronto = true
                break
            }
        }
        if (!pronto) {
            CompOperadores.push(string[i])
        }
    }
    return CompOperadores
}   


function ColarCaracteres(lista) {
    //stringQueNuncaFoiUmaStringNaVerdadeSempreFoiUmaListaPqp
    //stringQueNuncaFoiUmaStringNaVerdadeSempreFoiUmaListaPqp
    //stringQueNuncaFoiUmaStringNaVerdadeSempreFoiUmaListaPqp
    
    let ColarCaracteresComp = []

    for (let i = 0; i < lista.length; i++) {
        if (typeof lista[i] !== "string" || lista[i] === "(" || lista[i] === ")" || listaOp.map(obj => obj.tipo).includes(lista[i])) {
            ColarCaracteresComp.push(lista[i])
            continue
        }

        let texto = ""

        while (i < lista.length && typeof lista[i] === "string" && lista[i] !== "(" && lista[i] !== ")" && !listaOp.map(obj => obj.tipo).includes(lista[i])) {
            //console.log(listaOp.map(obj => obj.tipo).includes(lista[i]), lista[i])
            texto += lista[i]
            i++
        }

        ColarCaracteresComp.push(texto)

        //
        //if (texto === "NaN" || texto === "NAN" || texto === "null") throw new Error("POR QUE NAN??")
        //

        i--
    }

    return ColarCaracteresComp
}


function Tudo(stringReal) {
    return ColarCaracteres(Operadores(Numb(stringReal)))
}

function TudoFeito(stringReal) {
    return Operadores(ColarCaracteres(Numb(stringReal)))
}

//console.log(TudoFeito("x^2"))

module.exports = {
    Tokenizadar: TudoFeito,
    Op
}

//Só converte string para um Array legível ou alguma merda assim, sla
