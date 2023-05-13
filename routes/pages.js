const express = require('express');
const router = express.Router();

const antigo = require('../api/textosAntigo');
const novo = require('../api/textosNovo');
const { verify } = require('jsonwebtoken');

const userIcon = require('../userIcon');
function createTutoCookie(res) {
    res.cookie('tuto-token', {tuto: "true"}, {
        maxAge: 60*60*1*1000
    });
}

router.get('/', (req, res) => {
    res.clearCookie("tuto-token")
    const accessToken = req.cookies["access-token"];
    
    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    }
});

router.get('/home', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/landing', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('landing')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/criar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'card', res);
    } 
});

router.get('/sugerido', async (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login');

    } else {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();  
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        let db = await prisma.frases.findMany({select: {
            lastupdate: true,
            titulo: true,
            text: true
        }});
        
        let sug1 = db[0].titulo;
        let sug2 = sug1.split('_');
        let sugestaoTit = sug2.length > 1 ? `${sug2[0]} ${sug2[1]}`: sug1;
        let sugestaoTex = db[0].text;

        let sug2c = sug2[1].split(':')
        let sugv = sug2c[1].split('-');
        let sugvf = sugv.length > 1? sugv[1] : sugv[0];

        let dataCode = new Date();
        dataCode.setTime(dataCode.getTime() - dataCode.getTimezoneOffset()*60000); // Trabalhando com fuso horário
        let diaC = dataCode.getDate() < 10 ? `0${dataCode.getDate()}` : dataCode.getDate()
        let mesC = dataCode.getMonth()+1 < 10 ? `0${dataCode.getMonth()+1}` : dataCode.getMonth()+1
        let data2 = `${diaC}.${mesC}.${dataCode.getFullYear()-2000}`;

        let imagens = ['cordeiro', 'pomba2', 'coelho', 'leao', 'coelho2', 'pomba'];

        let cardsUser = await prisma.cards.findMany({select: {
            id: true,
            livro: true,
            capitulo: true,
            versInicial: true,
            versFinal: true,
            data: true,
            q1: true,
            q2: true
            }, where: {
                livro: sug2[0],
                capitulo: parseInt(sug2c[0]),
                versInicial: parseInt(sugv[0]),
                versFinal: parseInt(sugvf)
            }
        });

        if (cardsUser.length > 0) {
            for (let x = 1; x <= imagens.length; x++) {
                if (usuarioCookie.ima == 0) {
                    return res.render('card', {
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: sugestaoTex,
                        tit: sugestaoTit,
                        titInp: sug1,
                        q1: cardsUser[0].q1,
                        q2: cardsUser[0].q2
                    })
                    
                } else if (usuarioCookie.ima == x) {
                    return res.render('card', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: sugestaoTex,
                        tit: sugestaoTit,
                        titInp: sug1,
                        q1: cardsUser[0].q1,
                        q2: cardsUser[0].q2
                    })
                }
            }

        } else {
            for (let x = 1; x <= imagens.length; x++) {
                if (usuarioCookie.ima == 0) {
                    return res.render('card', {
                        txts_old: antigo.livros,
                        selected: 1,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: sugestaoTex,
                        tit: sugestaoTit,
                        titInp: sug1
                    })
                } else if (usuarioCookie.ima == x) {
                    return res.render('card', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        selected: 1,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: sugestaoTex,
                        tit: sugestaoTit,
                        titInp: sug1
                    })
                }
            }
        }
    }
});

router.get('/feedback', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'feedback', res);
    } 
});

router.get('/tutorial', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.render('login')
    } else {
        createTutoCookie(res);
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoA', res);
    } 
});

router.get('/tutorialB', (req, res) => {
    const accessToken = req.cookies["access-token"];
    const tutoToken = req.cookies["tuto-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);

    if (!accessToken) {
        return res.render('login');
    } else {
        if (!tutoToken) {
            userIcon(usuarioCookie, 'index', res);
        } else {
            userIcon(usuarioCookie, 'tutorial/tutoB', res);
        }
    } 
});

router.get('/tutorialC', (req, res) => {
    const accessToken = req.cookies["access-token"];
    const tutoToken = req.cookies["tuto-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);

    if (!accessToken) {
        return res.render('login');
    } else {
        if (!tutoToken) {
            userIcon(usuarioCookie, 'index', res);
        } else {
            userIcon(usuarioCookie, 'tutorial/tutoC', res);
        }
    }
});

router.get('/tutorialD', (req, res) => {
    const accessToken = req.cookies["access-token"];
    const tutoToken = req.cookies["tuto-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);

    if (!accessToken) {
        return res.render('login');
    } else {
        if (!tutoToken) {
            userIcon(usuarioCookie, 'index', res);
        } else {
            userIcon(usuarioCookie, 'tutorial/tutoD', res);
        }
    }
});

router.get('/login', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('login')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/cadastro', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/verificar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (accessToken) {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'index', res);
    } 
});

router.get('/alterar', (req, res) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.render('cadastro')
    } else {
        return res.render('alterar')
    }
});

router.get('/trocar', (req, res) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        res.render('trocar')
    } else {
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'ialterar', res);
    }
});

module.exports = router;