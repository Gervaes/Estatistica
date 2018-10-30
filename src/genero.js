const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

let generos = new Set()
let genero = []

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            generos.add(r.DS_GENERO)
    });
    Array.from(generos).forEach(e => {
        genero[e] = 0
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            genero[r.DS_GENERO]++;
    })
    console.log(Object.keys(genero))
})