const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

const eleito = r => r.DS_SIT_TOT_TURNO == 'ELEITO POR QP' || r.DS_SIT_TOT_TURNO == 'ELEITO' || r.DS_SIT_TOT_TURNO == 'ELEITO POR M�DIA' ? true : false

let generos = new Set()
let genero = []

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (eleito(r))
            generos.add(r.DS_GENERO)
    });
    Array.from(generos).forEach(e => {
        genero[e] = 0
    })
    res.forEach(r => {
        if (eleito(r))
            genero[r.DS_GENERO]++;
    })
    // console.log((genero.FEMININO * 100) / (genero.MASCULINO + genero.FEMININO))
    console.log(Object.values(genero))
})