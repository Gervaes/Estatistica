const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
let idades = new Set()
let idade = {}
let total = {
    tt: 0,
    qtdd: 0
}
let todas = []

const eleito = r => r.DS_SIT_TOT_TURNO == 'ELEITO POR QP' || r.DS_SIT_TOT_TURNO == 'ELEITO' || r.DS_SIT_TOT_TURNO == 'ELEITO POR M�DIA' ? true : false

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (eleito(r)) {
            idades.add(r.NR_IDADE_DATA_POSSE)
            total.tt += parseInt(r.NR_IDADE_DATA_POSSE);
            total.qtdd++;
            todas.push(r.NR_IDADE_DATA_POSSE)
        }
    });
    Array.from(idades).forEach(i => {
        idade[i] = 0
    })
    res.forEach(r => {
        if (eleito(r))
            idade[r.NR_IDADE_DATA_POSSE]++;
    })
    console.log(`total:${total.tt}\nquantidade:${total.qtdd}\nmédia: ${total.tt / total.qtdd}`)
    console.log(`mediana:${todas.sort()[todas.length / 2]}`)
})