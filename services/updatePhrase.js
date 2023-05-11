const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPhrase = async () => {
  const fun = require('../api/class');
  const antigo = require('../api/textosAntigo');
  const novo = require('../api/textosNovo');

  let db = await prisma.Frases.findMany({select: {
    lastUpdate: true,
    titulo: true,
    text: true
  }});

  let sug1 = db[0].titulo;
  let sug2 = sug1.split('_');

  let variTest = Math.floor(Math.random() * 2); // Escolhe qual das duas variáveis usar
  let liv;
  let cap;
  let versI;
  let versF;

  if (variTest == 0) {
    liv = Math.floor(Math.random() * antigo.livros.length) // Escolhe o livro

    if (antigo.livros[liv].abr == sug2[0]) { // Não permite que o livro seja o mesmo do dia anterior
      if (liv+1 < antigo.livros.length) {
        liv += 1
      } else {
        liv = 0
      }
    }

    cap = Math.floor(Math.random() * (antigo.livros[liv].capitulos - 1) + 1) // Escolhe o capítulo
    versI = Math.floor(Math.random() * (antigo.livros[liv].leitura[cap]["versi"] - 1) + 1) // Escolhe o versículo
    versF = Math.floor(Math.random() * (antigo.livros[liv].leitura[cap]["versi"] - versI) + versI); // Escolhe o versículo

    cap = cap == 0 ? 1 : cap;
    versI = versI == 0 ? 1 : versI;
    versF = versF < versI ? versI : versF;
    if (versF == versI) {
      if ((versF + 5) < antigo.livros[liv].leitura[cap]["versi"]) {
        versF += 5
      } else {
        versF = antigo.livros[liv].leitura[cap]["versi"];
      }
    }
    if (cap > antigo.livros[liv].capitulos) {
      cap = antigo.livros[liv].capitulos
    } else if (versF > antigo.livros[liv].leitura[cap]["versi"]) {
        versF = antigo.livros[liv].leitura[cap]["versi"];
    }
    let titulo = versF == versI ? `${antigo.livros[liv].abr}_${cap}:${versI}` : `${antigo.livros[liv].abr}_${cap}:${versI}-${versF}`;

    return {
      text: fun.agrupar(antigo.livros[liv], cap, versI, versF),
      tit: titulo
    }

  } else {
    liv = Math.floor(Math.random() * novo.livros.length) // Escolhe o livro

    if (novo.livros[liv].abr == sug2[0]) { // Não permite que o livro seja o mesmo do dia anterior
      if (liv+1 < novo.livros.length) {
        liv += 1
      } else {
        liv = 0
      }
    }

    cap = Math.floor(Math.random() * (novo.livros[liv].capitulos - 1) + 1) // Escolhe o capítulo
    versI = Math.floor(Math.random() * (novo.livros[liv].leitura[cap]["versi"] - 1) + 1) // Escolhe o versículo
    versF = Math.floor(Math.random() * (novo.livros[liv].leitura[cap]["versi"] - versI) + versI); // Escolhe o versículo

    cap = cap == 0 ? 1 : cap;
    versI = versI == 0 ? 1 : versI;
    versF = versF < versI ? versI : versF;
    if (versF == versI) {
      if ((versF + 5) < novo.livros[liv].leitura[cap]["versi"]) {
        versF += 5
      } else {
        versF = novo.livros[liv].leitura[cap]["versi"];
      }
    }
    let titulo = versF == versI ? `${novo.livros[liv].abr}_${cap}:${versI}` : `${novo.livros[liv].abr}_${cap}:${versI}-${versF}`;
    if (cap > novo.livros[liv].capitulos) {
      cap = novo.livros[liv].capitulos
    } else if (versF > novo.livros[liv].leitura[cap]["versi"]) {
        versF = novo.livros[liv].leitura[cap]["versi"];
    }

    return {
      text: fun.agrupar(novo.livros[liv], cap, versI, versF),
      tit: titulo
    }
  }
};

const updatePhrase = async (datas) => {
  let valores = getPhrase();

  await prisma.Frases.update({where: { 
      id: 1 
    }, data: { 
        lastUpdate: new Date(datas).toISOString(),
        titulo: valores.tit,
        text: valores.text
    }
  });
};

const verifyTimeLeft = async () => {
  let db = await prisma.Frases.findMany({select: {
    lastUpdate: true,
    titulo: true,
    text: true
  }});
  const lastUpdate = new Date(db[0].lastUpdate);
  const nowFullHour = new Date();

  const now = new Date(nowFullHour.getFullYear(), nowFullHour.getMonth(), nowFullHour.getDate(), 0, 0, 0, 0);

  const timeDiff = Math.abs(now.getTime() - lastUpdate.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff >= 24) {
    updatePhrase(now);
  }
};
verifyTimeLeft();

// Verifica a cada hora
setInterval(() => verifyTimeLeft(), 
// @param ms - s - m - h
1000 * 60 * 60);