const csv = require('csvtojson')
const fs = require("fs");

const csvFile = '../data/Franca_By_Citizenship_And_Age.csv'
csv().fromFile(csvFile).then(res => {
    fs.writeFile('../data/Franca_By_Citizenship_And_Age.json', JSON.stringify(res), (e) => {
        if (e) {
            console.log(e);
            return;
        }
        console.log('Arquivo criado!')
    })
})