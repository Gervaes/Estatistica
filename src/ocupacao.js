const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

let ocupacoes = new Set()
let ocupacao = {}
const deferido = (r) => r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO' ? true : false
const primeiroturno = (r) => r.NR_TURNO == '1' ? true : false

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (primeiroturno(r) && deferido(r))
            ocupacoes.add(r.DS_OCUPACAO)
    });
    Array.from(ocupacoes).forEach(i => {
        ocupacao[i] = 0
    })
    res.forEach(r => {
        if (primeiroturno(r) && deferido(r))
            ocupacao[r.DS_OCUPACAO]++;
    })
    console.log(Object.keys(ocupacao))
})