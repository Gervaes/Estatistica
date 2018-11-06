const csv = require('csvtojson')
const fs = require('fs')
const csvFile = 'data/consulta_cand_2018_BRASIL.csv'

//const deferido = r => r.DS_DETALHE_SITUACAO_CAND == 'DEFERIDO' || r.DS_DETALHE_SITUACAO_CAND == "DEFERIDO COM RECURSO" ? true : false
//const eleito = r => r.DS_SIT_TOT_TURNO == 'ELEITO POR QP' || r.DS_SIT_TOT_TURNO == 'ELEITO' || r.DS_SIT_TOT_TURNO == 'ELEITO POR M�DIA' ? true : false
//const nulo = r => r.DS_SIT_TOT_TURNO == '#NULO#' ? true : false
//const fits = r => eleito(r) && deferido(r) && primeiroturno(r) ? true : false
const apto = r => r.DS_SITUACAO_CANDIDATURA == 'APTO' ? true : false
const primeiroturno = r => r.NR_TURNO == '1' ? true : false
const regiao = uf => {
    if (uf == 'AC' || uf == 'AP' || uf == 'AM' || uf == 'PA' || uf == 'RO' || uf == 'RR' || uf == 'TO')
        return 'NORTE'
    if (uf == 'AL' || uf == 'BA' || uf == 'CE' || uf == 'MA' || uf == 'PB' || uf == 'PE' || uf == 'PI' || uf == 'RN' || uf == 'SE')
        return 'NORDESTE'
    if (uf == 'DF' || uf == 'GO' || uf == 'MT' || uf == 'MS')
        return 'CENTRO-OESTE'
    if (uf == 'ES' || uf == 'MG' || uf == 'RJ' || uf == 'SP')
        return 'SUDESTE'
    if (uf == 'PR' || uf == 'RS' || uf == 'SC')
        return 'SUL'

    return 'BRASIL'
}

let regioes = ['NORTE', 'NORDESTE', 'CENTRO-OESTE', 'SUDESTE', 'SUL', 'BRASIL']
let ESC = [
    'L� E ESCREVE',
    'ENSINO FUNDAMENTAL INCOMPLETO',
    'ENSINO FUNDAMENTAL COMPLETO',
    'ENSINO M�DIO INCOMPLETO',
    'ENSINO M�DIO COMPLETO',
    'SUPERIOR INCOMPLETO',
    'SUPERIOR COMPLETO'
]
let candidatos = {}

csv().fromFile(csvFile).then(res => {
    regioes.forEach(r => {
        candidatos[r] = {}
        ESC.forEach(e => {
            candidatos[r][e] = 0
        })
    })
    res.forEach(r => {
        if (apto(r) && primeiroturno(r))
            candidatos[regiao(r.SG_UF)][r.DS_GRAU_INSTRUCAO]++;
    })

    regioes.forEach(r => {
        candidatos[r]['TOTAL'] = Object.values(candidatos[r]).reduce((total, atual) => {
            return total + atual
        }, 0)
    })

    let dados = []
    ESC.forEach(e => {
        dados = []
        regioes.forEach(r => {
            dados.push((candidatos[r][e] * 100) / candidatos[r]['TOTAL'])
        })
        console.log(`${e} - ${dados}`)
    })
})