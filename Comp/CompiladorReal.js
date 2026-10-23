const Comp = require('./CompUniversal')
const gh = require('decimal.js')

const valor = x => {
    //console.log(x)
    if (typeof x === "string") {
    if (x.indexOf("(") !== -1) {
        try {
            return gh(x)
        } catch {
            return `gh(${x})`
        }
    }
    }

    //console.log(z)
    return `gh(${x})`
}

const op = {
    "+": (a, b) => `(${valor(a)}).add(${valor(b)})`,
    "-": (a, b) => `(${valor(a)}).sub(${valor(b)})`,
    "*": (a, b) => `(${valor(a)}).mul(${valor(b)})`,
    "/": (a, b) => `(${valor(a)}).div(${valor(b)})`,
    "neg": (a) => `(${valor(a)}).neg()`,
    "^": (a, b) => `(${valor(a)}).pow(${valor(b)})`,
    "exp": (a) => `(${valor(a)}).exp()`,
    "sin": (a) => `(${valor(a)}).sin()`,
    "cos": (a) => `(${valor(a)}).cos()`,
    "tan": (a) => `(${valor(a)}).tan()`,
    "sinh": (a) => `(${valor(a)}).sinh()`,
    "cosh": (a) => `(${valor(a)}).cosh()`,
    "tanh": (a) => `(${valor(a)}).tanh()`,
    "asin": (a) => `(${valor(a)}).asin()`,
    "acos": (a) => `(${valor(a)}).acos()`,
    "atan": (a) => `(${valor(a)}).atan()`,
    "asinh": (a) => `(${valor(a)}).asinh()`,
    "acosh": (a) => `(${valor(a)}).acosh()`,
    "atanh": (a) => `(${valor(a)}).atanh()`,
    "sqrt": (a) => `(${valor(a)}).sqrt()`,
    "cbrt": (a) => `(${valor(a)}).cbrt()`,
    "nrt": (a, b) => `(${valor(a)}).nrt(${valor(b)})`,
    "log": (a) => `(${valor(a)}).log()`,
    "ln": (a) => `(${valor(a)}).ln()`,
    "logn": (a, b) => `(${valor(a)}).logn(${valor(b)})`
}

let string = "1+1"

function ResolverPrimeiro(lista) {
    let I = undefined
    let pesomaior = 0

    for(let i = 0; i < lista.length; ++i) {
        if (lista[i]?.peso !== undefined) {
            if (lista[i].peso > pesomaior) {
                pesomaior = lista[i].peso;
                I = i
            }
        }
    }

    return I
}

function Operar(lista, I) {
    if (lista[I].usa === 2) {
        lista[I-1] = op[lista[I].tipo](lista[I-1], lista[I+1]);
        lista[I] = "";
        lista[I+1] = "";
    }
    if (lista[I].usa === 1) {
        lista[I] = op[lista[I].tipo](lista[I+1]);
        lista[I+1] = "";  
    }
    TirarVazios(lista)
    //console.log(lista)
}

function TirarVazios(lista) {
    for (let i = lista.length - 1; i >= 0; i--) {
        if (lista[i] === "") {
            lista.splice(i, 1);
        }
    }
}

function ResolveAsExpressoesLa(lista) {
    let I
    while (lista.length !== 1) {
        ColarFuncoes(lista)
        //console.log(lista)
        I = ResolverPrimeiro(lista)
        if (I === undefined) break //throw new Error("Algo ocorreu...")
        Operar(lista, I)
    }
    return lista
}

function PegarParenteses(lista) {
    let p1, p0
        
    p1 = lista.indexOf(")")
    p0 = (lista.slice(0, p1)).lastIndexOf("(")

    if (p0 !== -1 && p1 != -1) {
        r = ResolveAsExpressoesLa((lista.slice(p0 + 1, p1)))
        lista.splice(p0, p1 - p0 + 1, "(" + r + ")")
    } else {
        r = ResolveAsExpressoesLa(lista)
    }
    //console.log(lista)
}

function TodosOsParenteses(lista) {
    while (lista.length !== 1) {
        PegarParenteses(lista)
    }
    return lista
}

function ColarFuncoes(lista) {
    for(let aaa = 0; aaa < lista.length - 1; ++aaa) {
        //if (conv.includes(aaa))
        //console.log(string[aaa])
        if(typeof lista[aaa] === "string" && lista[aaa + 1][0] === "(" && typeof lista[aaa].usa === "undefined") {
            //console.log(typeof string[aaa] === "string" && string[aaa + 1][0] === "(" && typeof string[aaa].usa === "undefined")
            lista[aaa] = lista[aaa] + "(" + lista[aaa + 1] + ")"
            lista[aaa + 1] = ""
            TirarVazios(lista)
            //console.log(string)
        }
    }
    //Só Deus sabe como isso funciona (quero dizer, até que é bem óbvio kkkkkkkkk)
}

//console.log(TodosOsParenteses(Comp.Tokenizadar("x+(1")))

module.exports = {
    CompGeral : TodosOsParenteses
}
