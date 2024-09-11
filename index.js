const { select } = require('@inquirer/prompts') //necesita de um modulo que vem de fora

const start = async () => { //quando tem await precisa ter o async
        
        while(true){ //é o menu

                const opcao = await select({ // sempre que houver um select, precisa ter o conteudo abaixo exatamente igual
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
                                console.log("vamos cadastrar")
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