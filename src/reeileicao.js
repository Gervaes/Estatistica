const csv = require('csvtojson')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

const apto = r => r.DS_SITUACAO_CANDIDATURA == 'APTO' ? true : false
const primeiroturno = r => r.NR_TURNO == '1' ? true : false
const reeleicao = r => r.ST_REELEICAO == 'S' ? true : false
const candidatos = [0, 0, 0]

csv().fromFile(csvFile).then(res => {
    res.forEach(r => {
        if (apto(r))
            candidatos[0]++;
        if (apto(r) && primeiroturno(r))
            candidatos[1]++;
        if (apto(r) && primeiroturno(r) && reeleicao(r))
            candidatos[2]++;
    })
    console.log(candidatos)
})