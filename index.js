// arrays, objetos array=vetor
let meta = {       //{} após atribuição de valor significa que é um objeto que está sendo colocado
    value: 'ler um livro todo mês', 
    checked: true, //estilo variavel
} 

let metas = [
    meta,
    {
        value: "caminhar 20 minutos todos os dias",
        checked: false //na mao
    }
    
]

console.log(metas[1].value)

//meta.value = "não é mais ler um livro"
//meta.log(meta.value)

//function // arrow function

//const criarMeta = () => {} //arrow function

//function criarMeta() {} //criacao de funcao