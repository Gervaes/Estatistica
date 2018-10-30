const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
let escolaridades = new Set()
let escolaridade = {}

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            escolaridades.add(r.DS_GRAU_INSTRUCAO)
    });
    Array.from(escolaridades).forEach(e => {
        escolaridade[e] = 0
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            escolaridade[r.DS_GRAU_INSTRUCAO]++;
    })
    console.log(Object.values(escolaridade))
})