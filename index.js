const { select, input } = require('@inquirer/prompts') //necesita de um modulo que vem de fora

let meta = {
        value: 'Tomar 3l de água por dia',
        checked: false,
}
let metas = [ meta ]

const cadastrarMeta = async () => {
        const meta = await input({ message: "Digite a meta"})

        if(meta.length == 0) { // == comparacao
                console.log('A meta não pode ser vazia.')
                return
        }

        metas.push(
                { value: meta, checked: false}) 
}

const start = async () => { //quando tem await precisa ter o async //async porque nao sabe quando vai continuar
        
        while(true){ //é o menu

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
                                        name: "Sair",
                                        value: "sair"
                                }
                        ] 

                }) // await aguarda a selecao do usuario


                switch(opcao) {
                        case "cadastrar":
                                await cadastrarMeta() // await espera toda a funcao do cadastrarMeta acontecer
                                console.log(metas)
                                break
                        
                                
                        case "listar" :
                                console.log("vamos listar")
                                break

                        case "sair":
                                console.log("Até a próxima!")
                                return // para a funcao start
                }
        
        }
}

start()