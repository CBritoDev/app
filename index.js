const { select, input, checkbox} = require('@inquirer/prompts') //necesita de um modulo que vem de fora
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";


const carregarMetas = async () => {
        try {
                const dados = await fs.readFile("metas.json","utf-8")
                metas = JSON.parse(dados)
        }
        catch(erro) {
                metas = []
        }
}

const salvarMetas = async () => {
        await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}



const listarMetas = async () => {

        if (metas.length == 0) {

                mensagem = "Não existem metas!"
                return
        }
        const respostas = await checkbox({
                message: "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o enter para finalizar essa etapa",
                choices: [...metas],
                instructions: false,
        })

        metas.forEach((m) => {
                m.checked = false
        })
        
        if(respostas.length ==0) {
                mensagem = "Nenhuma meta selecionada!"
                return
        }

        

        respostas.forEach((resposta) => {
                const meta = metas.find((m) => {
                return m.value == resposta
                })

                meta.checked = true
        })

        mensagem = 'Meta(s) marcada(s) como concluida(s)'
}

const metasAbertas = async () => {

        if (metas.length == 0) {

                mensagem = "Não existem metas!"
                return
        }

        const abertas = metas.filter((meta) =>{
                return  meta.checked != true
        })

        if(abertas.length == 0) {
                mensagem = 'Não existem metas abertas :)'
                return
        }

        await select({
                message : "Metas abertas: " + abertas.length,
                choices: [...abertas]
        })
}

const metasRealizadas = async () => {
        if (metas.length == 0) {

                mensagem = "Não existem metas!"
                return
        }

        const realizadas = metas.filter((meta) => {
                return meta.checked
        })

        if(realizadas.length == 0) {
                mensagem = 'Não existem metas realizadas :c'
                return
        }
        await select({
                message: "Metas Realizadas: "+ realizadas.length,
                choices: [...realizadas] //joga uma dentro da outra
        })
}

const deletarMetas = async () => {

        if (metas.length == 0) {

                mensagem = "Não existem metas!"
                return
        }
        const metasDesmarcadas = metas.map((meta) => { //higher order function
                return {value: meta.value , checked: false}
        }) 

        const itensADeletar = await checkbox({
                message: "Selecione meta para deletar",
                choices: [...metasDesmarcadas],
                instructions: false,
        })

        if(itensADeletar.length ==0 ){
                mensagem = 'Nenhum item para deletar!'
                return
        }

        itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
                return meta.value != item
        })        

        })

        mensagem = 'Meta(s) deletada(s) com sucesso!'
}

const mostrarMensagem = () => {
        console.clear();

        if(mensagem != ""){
                console.log(mensagem)
                console.log("")
                mensagem = ""
        }
}


const cadastrarMeta = async () => {
        const meta = await input({ message: "Digite a meta"})

        if(meta.length == 0) { // == comparacao
                mensagem = 'A meta não pode ser vazia.'
                return
        }

        metas.push(
                { value: meta, checked: false}) 

        mensagem = "Meta cadastrada com sucesso!"
}

const start = async () => { //quando tem await precisa ter o async //async porque nao sabe quando vai continuar
        await carregarMetas()
        while(true){ //é o menu
                mostrarMensagem()
                await salvarMetas()

                const opcao = await select({ // sempre que houver um select, precisa ter o conteudo abaixo exatamente igual //await sempre tem uma promessa de resposta
                        message: "Menu >",
                        choices: [// tem que ser uma lista
                                { // opcoes para apresentar ao usuario
                                        name: "Cadastrar meta",
                                        value: "cadastrar"
                                }, // tem que ter virgula entre os objetos
                                {
                                        name: "Listar metas",
                                        value: "listar"
                                },
                                {
                                        name: "Metas Realizadas",
                                        value: "realizadas"
                                },
                                {
                                        name: "Metas Abertas",
                                        value: "abertas"
                                },
                                {
                                        name: "Deletar metas",
                                        value: "deletar"
                                },
                                {
                                        name: "Sair",
                                        value: "sair"
                                }
                        ] 

                }) // await aguarda a selecao do usuario


                switch(opcao) {
                        case "cadastrar":
                                await cadastrarMeta() // await espera toda a funcao do cadastrarMeta acontecer
                                break
                        
                                
                        case "listar" :
                                await listarMetas()
                                break

                        case "realizadas":
                                await metasRealizadas()
                                break

                        case "abertas":
                                await metasAbertas()
                                break
                        
                        case "deletar":
                                await deletarMetas()
                                break

                        case "sair":
                                console.log("Até a próxima!")
                                return 
                }
        
        }
}
start()