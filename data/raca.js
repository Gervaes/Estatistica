const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

let racas = new Set()
let raca = []

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            racas.add(r.DS_COR_RACA)
    });
    Array.from(racas).forEach(e => {
        raca[e] = 0
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            raca[r.DS_COR_RACA]++;
    })
    console.log(Object.keys(raca))
})