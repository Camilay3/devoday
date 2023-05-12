const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const exphbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USUARIO,
        pass: process.env.EMAILS
    }
});
transporter.use('compile', exphbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'views/emails',
        layoutsDir: 'views/emails',
        defaultLayout: ''
    },
    viewPath: 'views/emails',
    extName: '.hbs'
}));

function enviarEmail(us, assunto, template, variaveis) {
    transporter.sendMail({
        from: process.env.USUARIO,
        to: us,
        subject: assunto,
        template: template,
        context: variaveis
    })
}

const userIcon = require('../userIcon');

function createCookie(USER, res) {
    const createTokens = (user) => {
        const acessToken = sign({ username: user, ima: USER[0].icon }, process.env.TOKEN);
        return acessToken;
    }
    const accessToken = createTokens(USER[0].email)

    res.cookie('access-token', accessToken, {
        maxAge: 60*60*24*7*1000
    })

    var usuarioCookie = verify(accessToken, process.env.TOKEN);
    userIcon(usuarioCookie, 'index', res);
}

// REGISTRAR
exports.register = async (req, res) => {
    const { emai, senha, icone } = req.body;
    const email = emai.toLowerCase();
    
    let usuarios = await prisma.users.findMany({select: {
            email: true,
            senha: true,
            verify: true
        }, where: {
            email: email
        }
    })

    if (usuarios.length > 0) {
        if (usuarios[0].verify == 0) {
            if (await bcrypt.compare(senha, usuarios[0].senha)) {
                res.render('verificação', {
                    emailenv: email
                });
            } else {
                res.render('cadastro', {
                    message: 'Conta não verificada com senha incorreta'
                });
            }
        } else {
            res.render('cadastro', {
                message: 'Este email já está cadastrado e verificado'
            });
        }
    } else {
        let code = Math.floor((Math.random() * (9999-1111)) +1111);
        let hashedPassword = await bcrypt.hash(senha, 8);

        enviarEmail(email, "Verificação de usuário", "verificação", {code: code});

        await prisma.users.create({data: {
            email,
            senha: hashedPassword,
            token: code,
            icon: parseInt(icone)
        }});
        res.render('verificação', {
            emailenv: email
        });
    }
}

// VERIFICAR CONTA
exports.verificar = async (req, res) => {
    const { codeE, emaile } = req.body;

    let usuarios = await prisma.users.findMany({select: {
        email: true,
        icon: true,
        token: true
        }, where: {
            email: emaile
        }
    })

    if (codeE == usuarios[0].token) {
        await prisma.users.update({where: { 
            email: emaile 
            }, data: { 
                verify: 1 
            }
        })
        const createTokens = (user) => {
            const acessToken = sign({ username: user, ima: usuarios[0].icon }, process.env.TOKEN);
            return acessToken;
        }
        const accessToken = createTokens(usuarios[0].email)
    
        res.cookie('access-token', accessToken, {
            maxAge: 60*60*24*7*1000
        });
        res.cookie('tuto-token', {tuto: "true"}, {
            maxAge: 60*60*1*1000
        });
    
        var usuarioCookie = verify(accessToken, process.env.TOKEN);
        userIcon(usuarioCookie, 'tutorial/tutoA', res);

    } else if (codeE == usuarios[0].token * 2) {
        res.render('recuperar', {
            emailenv: usuarios[0].email
        })

    } else if (!(codeE == usuarios[0].token * 2)) {
        res.render('recuperar', {
            emailenv: usuarios[0].email,
            message: "Código de verificação inválido, tente novamente"
        })
    } else {
        res.render('login', {
            message: "Código de verificação inválido, tente novamente"
        })
    }
};

// LOGAR
exports.login = async (req, res) => {
    const { emai, senha } = req.body;
    const email = emai.toLowerCase();

    let usuarios = await prisma.users.findMany({select: {
        email: true,
        senha: true,
        icon: true,
        token: true,
        verify: true
        }, where: {
            email: email
        }
    })

    if (usuarios.length > 0) {

        if (!senha) { // Esqueci a senha
            enviarEmail(email, "Recuperar senha", "esqueci", {code: usuarios[0].token * 2})
            res.render('verificação', {
                emailenv: email
            })
        }

        else if (await bcrypt.compare(senha, usuarios[0].senha)) {
            if (usuarios[0].verify == 0) {
                enviarEmail(email, "Verificação de usuário", "verificação", {code: code});
                res.render('verificação', {
                    emailenv: email
                });
            } else {
                createCookie(usuarios, res);
            }
        } else {
            res.render('login', {
                message: 'Senha incorreta'
            })
        }

    } else {
        res.render('login', {
            message: 'Não existe conta com este email'
        })
    }
}

// FEEDBACK
exports.avaliar = (req, res) => {
    const { problema, ItensProblema, descrição } = req.body;
    const acessToken = req.cookies["access-token"]
    var usuarioCookie = verify(acessToken, process.env.TOKEN);

    if (problema == "Outros" || problema == "Sugestão") {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {problema: problema, descricao: descrição});

    } else if (problema == undefined) {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {descricao: descrição});

    } else {
        enviarEmail([process.env.USUARIO, usuarioCookie.username], "Feedback", "feedback", {problema: problema, ItensProblema: ItensProblema, descricao: descrição});
    }

    userIcon(usuarioCookie, 'index', res);
}

// ALTERAR DADOS
exports.alterar = async (req, res) => {
    const {emailIemailan, emailIemai, emailIsenha} = req.body;
    const {senhaIemai, senhaIsenhaant, senhaIsenha} = req.body;
    const {deletarIemai, deletarIsenha} = req.body;
    const {senhaEemai, senhaEsenha} = req.body;
    const {emailEEmai, emailEemai, emailEsenha} = req.body;
    const {icone} = req.body;

    const emailIemailant = emailIemailan.toLowerCase();
    const emailIemail = emailIemai.toLowerCase();
    const senhaIemail = senhaIemai.toLowerCase();
    const deletarIemail = deletarIemai.toLowerCase();
    const senhaEemail = senhaEemai.toLowerCase();
    const emailEEmail = emailEEmai.toLowerCase();
    const emailEemail = emailEemai.toLowerCase();

    if (emailIemailant && emailIemail && emailIsenha) {
        let usuarios = await prisma.users.findMany({select: {
            senha: true
            }, where: {
                email: emailIemailant
            }
        })

        let usuariosNovo = await prisma.users.findMany({select: {
            email: true
            }, where: {
                email: emailIemail
            }
        })

        if (emailIemailant == emailIemail) {
            res.render('alterar', {
                message: 'Não é possível alterar para o mesmo email'
            });
        } else if (usuariosNovo.length > 0) {
            res.render('alterar', {
                message: 'Não é possível alterar para um email pertencente a outra conta'
            });
        } else if (!await bcrypt.compare(emailIsenha, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'Senha incorreta'
            });
        } else {
            let code = Math.floor((Math.random() * (9999-1111)) +1111);
            await prisma.users.update({where: { 
                email: emailIemailant 
                }, data: { 
                    verify: 0,
                    token: code,
                    email: emailIemail,
                }
            })
            enviarEmail([emailIemailant, emailIemail], 'Verificação de novo email', 'reverificação', {code: code})
            res.clearCookie('access-token')
            res.render('verificação', {
                message: 'Verifique seu novo email',
                emailenv: emailIemail
            });
        }

    } else if (senhaIemail && senhaIsenhaant && senhaIsenha) {
        let usuarios = await prisma.users.findMany({select: {
            senha: true
            }, where: {
                email: senhaIemail
            }
        })

        if (!await bcrypt.compare(senhaIsenhaant, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'A senha não corresponde ao usuário'
            });
        } else if (senhaIsenhaant == senhaIsenha) {
            res.render('alterar', {
                message: 'Não é possível alterar para a mesma senha'
            });
        } else {
            await prisma.users.update({where: { 
                email: senhaIemail 
                }, data: { 
                    senha: await bcrypt.hash(senhaIsenha, 8)
                }
            })
            res.clearCookie('access-token')
            res.render('login', {
                message: 'Senha alterada com sucesso!'
            });
        }

    } else if (deletarIemail && deletarIsenha) {
        let usuarios = await prisma.users.findMany({select: {
            email: true,
            senha: true
            }, where: {
                email: deletarIemail
            }
        })

        if (!await bcrypt.compare(deletarIsenha, usuarios[0].senha)) {
            res.render('alterar', {
                message: 'A senha não corresponde ao usuário'
            });
        } else {
            await prisma.users.delete({
                where: {
                  email: deletarIemail,
                },
            })
            enviarEmail(deletarIemail, "Conta excluída com sucesso", "delete", {conta: deletarIemail});
            res.clearCookie('access-token');
            res.render('landing');
        }

    } else if (senhaEsenha) {
        let usuarios = await prisma.users.findMany({select: {
            senha: true
            }, where: {
                email: senhaEemail
            }
        })

        if (await bcrypt.compare(senhaEsenha, usuarios[0].senha)) {
            res.render('recuperar', {
                message: 'Não é possível alterar para a mesma senha',
                emailenv: senhaEemail
            });
        } else {
            await prisma.users.update({where: { 
                email: senhaEemail
                }, data: { 
                    senha: await bcrypt.hash(senhaEsenha, 8)
                }
            })
            res.render('login', {
                message: 'Senha alterada com sucesso!'
            });
        }

    } else if (emailEEmail && emailEsenha) {
        let usuarios = await prisma.users.findMany({select: {
            senha: true,
            }, where: {
                email: emailEemail
            }
        })

        let usuariosNovo = await prisma.users.findMany({select: {
            email: true
            }, where: {
                email: emailEEmail
            }
        })

        if (emailEemail == emailEEmail) {
            res.render('trocar', {
                message: 'Não é possível alterar para o mesmo email'
            });
        } else if (usuariosNovo.length > 0) {
            res.render('trocar', {
                message: 'Não é possível alterar para um email pertencente a outra conta'
            });
        } else if (!await bcrypt.compare(emailEsenha, usuarios[0].senha)) {
            res.render('trocar', {
                message: 'Senha incorreta'
            });
        } else {
            let code = Math.floor((Math.random() * (9999-1111)) +1111);
            await prisma.users.update({where: { 
                email: emailEemail 
                }, data: { 
                    verify: 0,
                    token: code,
                    email: emailEEmail,
                }
            })
            enviarEmail([emailEEmail, emailEemail], 'Verificação de novo email', 'reverificação', {code: code})
            res.clearCookie('access-token')
            res.render('verificação', {
                message: 'Verifique seu novo email',
                emailenv: emailEEmail
            });
        }
        
    } else if (icone) {
        const acessToken = req.cookies["access-token"];
        var usuarioCookie = verify(acessToken, process.env.TOKEN);
        if (usuarioCookie.ima == icone) {
            res.render('alterar', {
                message: 'Não é possível alterar para o mesmo ícone'
            });
        } else {
            await prisma.users.update({where: { 
                    email: usuarioCookie.username
                }, data: { 
                    icon: parseInt(icone)
                }
            })
            res.clearCookie('access-token')
            res.render('login', {
                message: 'Icon alterado com sucesso!'
            });
        }

    } else {
        res.render('alterar', {
            message: 'Escolha e preencha corretamente'
        });
    }
}

// SAIR DA SESSÃO
exports.sair = (req, res) => {
    res.clearCookie("access-token")
    res.render('landing')
}