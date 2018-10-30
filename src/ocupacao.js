const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
let ocupacoes = new Set()
let ocupacao = {}


csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            ocupacoes.add(r.DS_OCUPACAO)
    });
    Array.from(ocupacoes).forEach(i => {
        ocupacao[i] = 0
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            ocupacao[r.DS_OCUPACAO]++;
    })
    console.log(Object.keys(ocupacao))
})