const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
let idades = new Set()
let idade = {}
let total = 0

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO') {
            idades.add(r.NR_IDADE_DATA_POSSE)
        }
        console.log(r.NR_IDADE_DATA_POSSE)
        total += parseInt(r.NR_IDADE_DATA_POSSE);
    });
    Array.from(idades).forEach(i => {
        idade[i] = 0
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            idade[r.NR_IDADE_DATA_POSSE]++;
    })
    console.log(Object.values(total))
})