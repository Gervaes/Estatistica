const csv = require('csvtojson')
const fs = require("fs");

const csvFile = 'data/consulta_cand_2018_BRASIL.csv'
/*
csv().fromFile(csvFile).then(res => {
    fs.writeFile('teste.json', JSON.stringify(Object.keys(res[0])), (e) => {
        if (e) {
            console.log(e);
            return;
        }
        console.log('Arquivo criado!')
    })
})
*/

const partidos = new Set()
let part = []

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_CARGO == 'DEPUTADO ESTADUAL' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            partidos.add(r.SG_PARTIDO)

    });
    partidos.forEach(p => {
        part.push({
            partido: p,
            quantidade: 0
        })
    })
    res.forEach(r => {
        if (r.NR_TURNO == '1' && r.DS_CARGO == 'DEPUTADO ESTADUAL' && r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO')
            part[part.findIndex(n => n.partido == r.SG_PARTIDO)].quantidade++;
    })

    console.log(part)
})