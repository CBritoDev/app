// arrays, objetos array=vetor
let meta = {       //{} após atribuição de valor significa que é um objeto que está sendo colocado
    value: 'ler um livro todo mês', 
    checked: false,
    log: (info) => {
        console.log(info)
    }
} 
meta.value = "não é mais ler um livro"
meta.log(meta.value)

//function // arrow function

const criarMeta = () => {} //arrow function

//function criarMeta() {} //criacao de funcao