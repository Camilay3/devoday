const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fun = require('../api/class');
const antigo = require('../api/textosAntigo');
const novo = require('../api/textosNovo');
const hbs = require('hbs');
hbs.registerHelper('checkSelected', function (id, target) {
    return id === target
});

hbs.registerHelper('json', function (content) {
    return JSON.stringify(content);
});

let mensagem;
let titulo;
const { verify } = require('jsonwebtoken');
const userIcon = require('../userIcon');

let imagens = ['cordeiro', 'pomba2', 'coelho', 'leao', 'coelho2', 'pomba'];

// Escolher leitura
exports.escolha = async (req, res) => {
    const { livro, capitulo, verI, verF } = req.body; // Recebe os valores do formulário
    let cardsUser;
    const accessToken = req.cookies["access-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);
    const tutoToken = req.cookies["tuto-token"];

    let usuarios = await prisma.users.findMany({select: {
        id: true
        }, where: {
            email: usuarioCookie.username
        }
    });

    //ANTIGO 
    for (a = 0; a < antigo.livros.length; a++) {
        if (antigo.livros[a].nome == livro) { // Para saber o livro

            for (b = 1; b <= antigo.livros[a].capitulos; b++) {
                if (b == capitulo) { // Para saber o capítulo

                    for (c = 1; c <= antigo.livros[a].leitura[b]["versi"]; c++) {
                        if (c == verI) { // Para saber o versículo inicial

                            for (d = 1; d <= antigo.livros[a].leitura[b]["versi"]; d++) {
                                if (d == verF) { // Para saber o versículo final
                                    mensagem = fun.agrupar(antigo.livros[a], b, c, d);
                                    titulo = c >= d  ? `${antigo.livros[a].abr} ${b}:${c}` : `${antigo.livros[a].abr} ${b}:${c}-${d}`;
                                    cardsUser = await prisma.cards.findMany({select: {
                                        id: true,
                                        livro: true,
                                        capitulo: true,
                                        versInicial: true,
                                        versFinal: true,
                                        data: true,
                                        q1: true,
                                        q2: true
                                        }, where: {
                                            donoId: usuarios[0].id,
                                            livro: antigo.livros[a].abr,
                                            capitulo: b,
                                            versInicial: c,
                                            versFinal: d
                                        }
                                    });
    }}}}}}}}

    // NOVO 
    for (a = 0; a < novo.livros.length; a++) {
        if (novo.livros[a].nome == livro) { // Para saber o livro
            for (b = 1; b <= novo.livros[a].capitulos; b++) {
                if (b == capitulo) { // Para saber o capítulo

                    for (c = 1; c <= novo.livros[a].leitura[b]["versi"]; c++) {
                        if (c == verI) { // Para saber o versículo inicial

                            for (d = 1; d <= novo.livros[a].leitura[b]["versi"]; d++) {
                                if (d == verF) { // Para saber o versículo final
                                    mensagem = fun.agrupar(novo.livros[a], b, c, d);
                                    titulo = c >= d ? `${novo.livros[a].abr} ${b}:${c}` : `${novo.livros[a].abr} ${b}:${c}-${d}`;
                                    cardsUser = await prisma.cards.findMany({select: {
                                        id: true,
                                        livro: true,
                                        capitulo: true,
                                        versInicial: true,
                                        versFinal: true,
                                        data: true,
                                        q1: true,
                                        q2: true
                                        }, where: {
                                            donoId: usuarios[0].id,
                                            livro: novo.livros[a].abr,
                                            capitulo: b,
                                            versInicial: c,
                                            versFinal: d
                                        }
                                    });
    }}}}}}}}


    let mensi;
    let diaC;
    let dataCode = new Date();
    if (dataCode.getHours() >= 0 && dataCode.getHours() <= 3) { // Se for mais de 21h
        diaC = dataCode.getDate()-1 < 10 ? `0${dataCode.getDate()-1}` : dataCode.getDate()-1;

    } else {
        diaC = dataCode.getDate() < 10 ? `0${dataCode.getDate()}` : dataCode.getDate();
    }
    let mesC = dataCode.getMonth()+1 < 10 ? `0${dataCode.getMonth()+1}` : dataCode.getMonth()+1;
    let data = `${diaC}.${mesC}.${dataCode.getFullYear()-2000}`;

    if (cardsUser.length > 0) {
        for (let a = 0; a < antigo.livros.length; a++) {
            if (antigo.livros[a].abr == cardsUser[0].livro) {
                mensi = fun.agrupar(antigo.livros[a], cardsUser[0].capitulo, cardsUser[0].versInicial, cardsUser[0].versFinal);
            }
        }
        for (let a = 0; a < novo.livros.length; a++) {
            if (novo.livros[a].abr == cardsUser[0].livro) {
                mensi = fun.agrupar(novo.livros[a], cardsUser[0].capitulo, cardsUser[0].versInicial, cardsUser[0].versFinal);
            }
        }

        if (tutoToken) {
            for (let x = 1; x <= imagens.length; x++) {
                if (usuarioCookie.ima == 0) {
                    return res.render('tutorial/tutoC', {
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: mensi,
                        tit: titulo,
                        q1: cardsUser[0].q1,
                        q2: cardsUser[0].q2
                    });
                } else if (usuarioCookie.ima == x) {
                    return res.render('tutorial/tutoC', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: mensi,
                        tit: titulo,
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
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: mensi,
                        tit: titulo,
                        q1: cardsUser[0].q1,
                        q2: cardsUser[0].q2
                    });
                    
                } else if (usuarioCookie.ima == x) {
                    return res.render('card', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: cardsUser[0].data,
                        message: mensi,
                        tit: titulo,
                        q1: cardsUser[0].q1,
                        q2: cardsUser[0].q2
                    });
                }
            }
        }

    } else {
        if (tutoToken) {
            for (let x = 1; x <= imagens.length; x++) {
                if (usuarioCookie.ima == 0) {
                    return res.render('tutorial/tutoC', {
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: mensagem,
                        tit: titulo
                    });
                } else if (usuarioCookie.ima == x) {
                    return res.render('tutorial/tutoC', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: mensagem,
                        tit: titulo
                    });
                }
            }
        } else {
            for (let x = 1; x <= imagens.length; x++) {
                if (usuarioCookie.ima == 0) {
                    return res.render('card', {
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: mensagem,
                        tit: titulo
                    })
                    
                } else if (usuarioCookie.ima == x) {
                    return res.render('card', {
                        imagem: imagens[x-1],
                        txts_old: antigo.livros,
                        txts_new: novo.livros,
                        datadevo: data2,
                        message: mensagem,
                        tit: titulo
                    })
                }
            }
        }
    }
}

// Registrar
exports.envio = async (req, res) => {
    const { titulo2, q1, q2 } = req.body;
    const accessToken = req.cookies["access-token"];
    const tutoToken = req.cookies["tuto-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);

    let diaC;
    let dataCode = new Date();
    if (dataCode.getHours() >= 0 && dataCode.getHours() <= 3) { // Se for mais de 21h
        diaC = dataCode.getDate()-1 < 10 ? `0${dataCode.getDate()-1}` : dataCode.getDate()-1;

    } else {
        diaC = dataCode.getDate() < 10 ? `0${dataCode.getDate()}` : dataCode.getDate();
    }
    let mesC = dataCode.getMonth()+1 < 10 ? `0${dataCode.getMonth()+1}` : dataCode.getMonth()+1;
    let data = `${diaC}.${mesC}.${dataCode.getFullYear()-2000}`;

    if (titulo != undefined || titulo2.length > 0) {
        let usuarios = await prisma.users.findMany({select: {
                id: true,
                num_cards: true
            }, where: {
                email: usuarioCookie.username
            }
        })

        let livro = titulo2.length > 0 ? titulo2.split('_') : titulo.split(' ');
        let cap = livro[1].split(':');
        let verINICIA = cap[1].split('-');
        let veF = verINICIA.length > 1? verINICIA[1] : verINICIA[0];

        let cardsUserF = await prisma.cards.findMany({select: {
            id: true,
            livro: true,
            capitulo: true,
            versInicial: true,
            versFinal: true,
            data: true,
            q1: true,
            q2: true
            }, where: {
                donoId: usuarios[0].id,
                livro: livro[0],
                capitulo: parseInt(cap),
                versInicial: parseInt(verINICIA),
                versFinal: parseInt(veF)
            }
        });

        if (cardsUserF.length > 0) {
            await prisma.cards.update({where: {
                    id: cardsUserF[0].id,
                }, data: {
                    livro: livro[0],
                    capitulo: parseInt(cap[0]),
                    versInicial: parseInt(verINICIA[0]),
                    versFinal: parseInt(veF),
                    q1: q1,
                    q2: q2
                }
            });

        } else {
            await prisma.cards.create({data: {
                livro: livro[0],
                capitulo: parseInt(cap[0]),
                versInicial: parseInt(verINICIA[0]),
                versFinal: parseInt(veF),
                data: data,
                q1: q1,
                q2: q2,
                donoId: usuarios[0].id
            }});
    
            await prisma.users.update({where: { 
                    email: usuarioCookie.username 
                }, data: { 
                    num_cards: usuarios[0].num_cards + 1
                }
            })
        }
    
        if (tutoToken) {
            userIcon(usuarioCookie, 'tutorial/tutoD', res);
        } else {
            userIcon(usuarioCookie, 'index', res);
        }
        titulo = undefined

    } else {
        for (let x = 1; x <= imagens.length; x++) {
            if (usuarioCookie.ima == 0) {
                return res.render('card', {
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    datadevo: data,
                    err: "Para enviar é necessário definir uma leitura",
                    message: "Por favor, preencha os itens e salve para exibir o versículo antes de iniciar seu texto, se não perderá seu progresso. Caso queira adquirir o físico: ",
                    link: "https://avemaria.com.br/",
                    tit: "Leitura"
                })
            } else if (usuarioCookie.ima == x) {
                return res.render('card', {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    selected: 1,
                    txts_new: novo.livros,
                    datadevo: data,
                    err: "Para enviar é necessário definir uma leitura",
                    message: "Por favor, preencha os itens e salve para exibir o versículo antes de iniciar seu texto, se não perderá seu progresso. Caso queira adquirir o físico: ",
                    link: "https://avemaria.com.br/",
                    tit: "Leitura"
                })
            }
        }
    }
}

// Editar, excluir e favoritar 
exports.modificar = async (req, res) => {
    const { card } = req.body;

    let crud = card.substr(0, 3); // Recupera a ação
    let ide = card.substr(3, 2); // Recupera o id

    const accessToken = req.cookies["access-token"];
    var usuarioCookie = verify(accessToken, process.env.TOKEN);

    let usuarios = await prisma.users.findMany({select: {
            id: true,
            email: true,
            num_cards: true
        }, where: {
            email: usuarioCookie.username
        }
    });

    let cardsUser = await prisma.cards.findMany({select: {
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
            id: parseInt(ide)
        }
    });

    if (crud == 'fav') {
        if (cardsUser[0].fav == 0) {
            await prisma.cards.update({where: {
                    id: parseInt(ide),
                }, data: {
                    fav: 1
                }
            });

        } else {
            await prisma.cards.update({where: {
                    id: parseInt(ide),
                }, data: {
                    fav: 0
                }
            });
        }

    } else if (crud == 'edi') {
        let livr = cardsUser[0].versInicial == cardsUser[0].versFinal ? `${cardsUser[0].livro} ${cardsUser[0].capitulo}:${cardsUser[0].versInicial}` : `${cardsUser[0].livro} ${cardsUser[0].capitulo}:${cardsUser[0].versInicial}-${cardsUser[0].versFinal}`;
        let li = cardsUser[0].versInicial == cardsUser[0].versFinal ? `${cardsUser[0].livro}_${cardsUser[0].capitulo}:${cardsUser[0].versInicial}`:`${cardsUser[0].livro}_${cardsUser[0].capitulo}:${cardsUser[0].versInicial}-${cardsUser[0].versFinal}`;

        let mens;

        for (let a = 0; a < antigo.livros.length; a++) {
            if (antigo.livros[a].abr == cardsUser[0].livro) {
                mens = fun.agrupar(antigo.livros[a], cardsUser[0].capitulo, cardsUser[0].versInicial, cardsUser[0].versFinal);
            }
        }
        for (let a = 0; a < novo.livros.length; a++) {
            if (novo.livros[a].abr == cardsUser[0].livro) {
                mens = fun.agrupar(novo.livros[a], cardsUser[0].capitulo, cardsUser[0].versInicial, cardsUser[0].versFinal);
            }
        }

        for (let x = 1; x <= imagens.length; x++) {
            if (usuarioCookie.ima == 0) {
                return res.render('card', {
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    datadevo: cardsUser[0].data,
                    message: mens,
                    tit: livr,
                    titInp: li,
                    q1: cardsUser[0].q1,
                    q2: cardsUser[0].q2
                });
                
            } else if (usuarioCookie.ima == x) {
                return res.render('card', {
                    imagem: imagens[x-1],
                    txts_old: antigo.livros,
                    txts_new: novo.livros,
                    datadevo: cardsUser[0].data,
                    message: mens,
                    tit: livr,
                    titInp: li,
                    q1: cardsUser[0].q1,
                    q2: cardsUser[0].q2
                });
            }
        }

    } else if (crud == 'exc') { 
        await prisma.cards.delete({where: {
                id: parseInt(ide),
            }
        });
        await prisma.users.update({where: { 
                email: usuarios[0].email 
            }, data: { 
                num_cards: usuarios[0].num_cards - 1
            }
        });
    }

    userIcon(usuarioCookie, 'index', res);
}
