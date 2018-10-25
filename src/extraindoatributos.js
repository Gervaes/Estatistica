const conteudo = require('../data/Franca_By_Citizenship_And_Age.json')
const fs = require('fs')

const campo = new Set()
const conj = {}

conteudo.forEach(c => {
    if (campo.add(c['Citizenship']))
        conj[c['NAT']] = c['Citizenship']
})

fs.writeFile('data/NAT.json', JSON.stringify(conj), err => {
    console.log(err || 'Arquivo salvo!')
})