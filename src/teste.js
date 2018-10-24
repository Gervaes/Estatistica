const conteudo = require('../data/Franca_By_Occupation.json')

const ocupacoes = new Set()
const nascimento = new Set()
const educacao = new Set()
const residencia = new Set()

conteudo.forEach(c => {
    ocupacoes.add(c['Occupation'])
    nascimento.add(c['Country of birth'])
    educacao.add(c['Education level'])
    residencia.add(c['Country of residence'])
})

//console.log(ocupacoes)
//console.log(nascimento)
console.log(educacao)
//console.log(residencia)