import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { LoginForm } from "./Login/LoginForm";
import { CadastroForm } from "./Cadastro/CadastroForm";

import cadastroImg from "../../assets/cadastro.svg";
import loginImg from "../../assets/login.svg";
import { Button } from "@/components/ui/button";

export function Entrar() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState<boolean>( location.state?.isLogin ?? true );

    function alternarFormulario() {
        setIsLogin((valorAtual) => !valorAtual);
    }

	const [imagem, setImagem] = useState(isLogin ? loginImg : cadastroImg);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setImagem(isLogin ? loginImg : cadastroImg);
		}, 100);

		return () => clearTimeout(timeout);
	}, [isLogin]);

    return (
        <main className="flex items-center justify-center w-full h-dvh">
            <motion.section layout className={`flex items-center bg-white rounded-4xl shadow-uniforme2xl w-[80%] h-[80%] gap-6 p-6 ${isLogin ? "flex-row-reverse" : "flex-row"}`}
                transition={{
                    layout: {
                        duration: 1.2,
                        type: "spring",
                        bounce: 0.2,
                    },
                }}
            >
                <motion.div layout className="welcome flex flex-col items-center justify-center p-4 gap-6 w-[50%]">
                    <img src={imagem} alt="Cristãos" draggable="false"/>

					<div className="text-center">
						<h1 className="text-4xl font-bold">{isLogin ? "Conecte-se" : "Crie uma conta"}</h1>
						<p className="text-2xl mt-2">
							{isLogin ? "Continue na sua jornada de conhecimento!" : "Alcance seus objetivos com o devoday!"}
						</p>
					</div>

					<Button variant="link" className="text-foreground font-semibold" onClick={alternarFormulario}>
						{isLogin ? "Ainda não tenho uma conta" : "Já tenho uma conta"}
					</Button>
                </motion.div>

                <motion.div layout className="form bg-primary h-full w-[50%] rounded-4xl p-6">
					{isLogin ? <LoginForm /> : <CadastroForm />}
                </motion.div>
            </motion.section>
        </main>
    );
}
