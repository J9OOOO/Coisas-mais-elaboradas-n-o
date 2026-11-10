const CompR = require('./CompiladorReal')
const CompU = require('./CompUniversal')
const Decimal = require('decimal.js')

function parenteses(string) {
    let pro = 0
    for(let i = 0; i < string.length; ++i) {
        if (string[i] === "(") {++pro}
        if (string[i] === ")") {--pro}
        if (string[i] + string[i + 1] === ")(" || (string[i] === ")" && !CompU.listaOp.some(obj => obj.tipo === string[i + 1]) && string[i] + string[i + 1] !== "))" && string[i + 1] !== undefined)) {
            //console.log(string[i], string[i + 1])
            throw new Error("Multiplicação implícita é inválida")
        }
        if (string[i] + string[i + 1] === "()") throw new Error("Pareteses vazio")
        if (string[i] === "." && isNaN(Number(string[i + 1]))) throw new Error("Ponto inválido")

        if (pro < 0) throw new SyntaxError("Parenteses mal colocado, cacete")
    }
    if (pro !== 0) throw new SyntaxError("Parênteses faltando")
}

function BarramentoGeral(string) {
    parenteses(string)
    if (string === "") throw new Error("String vazia")
    if (["[", "]", "{", "}", "~", "?", "_"].some(c => string.includes(c))) throw new Error("Partes da expressão inválida")
    //if (string.includes("Math")) throw new Error("Isso não é a sintaxe do Java Script") //Ou será que é?
}

function CompDeDecimal(string) {
    console.log("Compilado via resenha: ")
    console.log(string, "->")
    string = string.replace(/\s/g, "")
    let CompString = CompU.Tokenizadar(string)
    BarramentoGeral(string)
    let Comp = CompR.CompGeral(CompString)
    return Comp[0]
}

let a = CompDeDecimal("(exp(x*i)-exp(-x*i))/2")

//let x = 1

console.log(a)

module.exports = {
    CompDeDecimal
}
