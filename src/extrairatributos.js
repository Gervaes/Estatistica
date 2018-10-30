const csv = require('csvtojson')
const fs = require("fs");

const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
let atributos = []
let lista = {}
let op = new Set()

csv().fromFile(csvFile).then(res => {
    atributos = Object.keys(res[0])

    atributos.forEach(a => {
        lista[a] = []
    })

    atributos.forEach(a => {
        res.forEach(r => {
            op.add(r[a])
        })
        if (op.size < 50)
            lista[a] = Array.from(op)
        op.clear()
    })

    fs.writeFile('data/atributos.json', JSON.stringify(lista), (e) => {
        if (e) {
            console.log(e);
            return;
        }
        console.log('Arquivo criado!')
    })
})