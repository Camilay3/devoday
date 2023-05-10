let imagens = ['cordeiro', 'coelho'];
const antigo = require('./api/textosAntigo');
const novo = require('./api/textosNovo');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fs = require("fs");
const localDbPath = `${__dirname}/localdb.json`;
let dbContent = fs.readFileSync(localDbPath, "utf8");
let db = JSON.parse(dbContent);
let sug1 = db.phrase.titulo;
let sug2 = sug1.split('_');

let sugestaoTit = sug2.length > 1 ? `${sug2[0]} ${sug2[1]}`: sug1;
let sugestaoTex = db.phrase.text;

async function userIcon(vari, page, res) {
    if (page == 'index' || page == 'tutorial/tutoA' || page == 'tutorial/tutoD') {
        let usuarios = await prisma.Users.findMany({select: {
            id: true,
            cards: true
            }, where: {
                email: vari.username
            }
        })

        let cardsUser = await prisma.Cards.findMany({select: {
            id: true,
            fav: true,
            livro: true,
            capitulo: true,
            versInicial: true,
            versFinal: true,
            data: true,
            q1: true,
            q2: true
            }, where: {
                donoId: usuarios[0].id
            }
        })

        let Lvl = Math.floor(parseInt(usuarios[0].cards) / 10) + 1 // Recupera o level
        let cardsLvl = (Math.floor(parseInt(usuarios[0].cards) / 10) * 10) + 9 // Recupera o máximo de cards no level
        let minCardsLvl = (Math.floor(parseInt(usuarios[0].cards) / 10) * 10) // Recupera o mínimo de cards no level

        for (let x = 1; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page, {
                    level: Lvl,
                    cards: cardsUser,
                    cardsF: usuarios[0].cards,
                    cardsFM: 9 - (cardsLvl - usuarios[0].cards),
                    cardsLevelFM: cardsLvl+1 - minCardsLvl,
                    cardsLevel: cardsLvl+1,
                    sugTit: sugestaoTit,
                    sugTex: sugestaoTex
                })
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1],
                    level: Lvl,
                    cards: cardsUser,
                    cardsF: usuarios[0].cards,
                    cardsFM: 9 - (cardsLvl - usuarios[0].cards),
                    cardsLevelFM: cardsLvl+1 - minCardsLvl,
                    cardsLevel: cardsLvl+1,
                    sugTit: sugestaoTit,
                    sugTex: sugestaoTex
                })
            }
        }

    } else if (page == 'card' || page == 'tutorial/tutoB' || page == 'tutorial/tutoC') {

        let dataCode = new Date();
        let diaC = dataCode.getDate() < 10 ? `0${dataCode.getDate()}` : dataCode.getDate()
        let mesC = dataCode.getMonth()+1 < 10 ? `0${dataCode.getMonth()+1}` : dataCode.getMonth()+1
        let data = `${diaC}.${mesC}.${dataCode.getFullYear()-2000}`;

        for (let x = 1; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page, {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    datadevo: data,
                    message: "Por favor, preencha os itens e salve para exibir o versículo antes de iniciar seu texto, se não perderá seu progresso. Caso queira adquirir o físico: ",
                    link: "https://avemaria.com.br/",
                    tit: "Leitura"
                })
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    datadevo: data,
                    message: "Por favor, preencha os itens e salve para exibir o versículo antes de iniciar seu texto, se não perderá seu progresso. Caso queira adquirir o físico: ",
                    link: "https://avemaria.com.br/",
                    tit: "Leitura"
                })
            }
        }

    } else {
        for (let x = 1; x <= imagens.length; x++) {
            if (vari.ima == 0) {
                return res.render(page)
            } else if (vari.ima == x) {
                return res.render(page, {
                    imagem: imagens[x-1]
                })
            }
        }
    }
}

module.exports = userIcon