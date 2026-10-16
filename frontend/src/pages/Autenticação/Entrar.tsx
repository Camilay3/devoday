import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { LoginForm } from "./Login/LoginForm";
import { CadastroForm } from "./Cadastro/CadastroForm";

import cadastroImg from "../../assets/cadastro.svg";
import loginImg from "../../assets/login.svg";
import { Button } from "@/components/ui/button";
import type { AuthProps } from "@/interfaces/auth";
import { ModalConfirmarCodigo } from "./Modais/ModalConfirmarCodigo";

export function Entrar({ onLogin }: AuthProps) {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState<boolean>( location.state?.isLogin ?? true );
	const [emailParaConfirmar, setEmailParaConfirmar] = useState("");
    const resolverVerificacao = useRef<((verificado: boolean) => void) | null>(null);

    function solicitarVerificacao(email: string): Promise<boolean> {
    	return new Promise((resolve) => {
    		resolverVerificacao.current = resolve;
    		setEmailParaConfirmar(email);
    	});
    }

    function concluirVerificacao(verificado: boolean) {
    	resolverVerificacao.current?.(verificado);
    	resolverVerificacao.current = null;
    }
    function alternarFormulario() { setIsLogin((valorAtual) => !valorAtual); }

	const [isLoginDelayed, setIsLoginDelayed] = useState(isLogin);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoginDelayed(isLogin);
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
                    <img src={isLoginDelayed ? loginImg : cadastroImg} alt="Cristãos" draggable="false"/>

					 <div className="text-center">
						<h1 className="text-4xl font-bold">{isLoginDelayed ? "Conecte-se" : "Crie uma conta"}</h1>
						<p className="text-2xl mt-2">
							{isLoginDelayed ? "Continue na sua jornada de conhecimento!" : "Alcance seus objetivos com o devoday!"}
						</p>
					</div>

					<Button variant="link" className="text-foreground font-semibold" onClick={alternarFormulario}>
						{isLoginDelayed ? "Ainda não tenho uma conta" : "Já tenho uma conta"}
					</Button>
                </motion.div>

                <motion.div layout className="form bg-primary h-full w-[50%] rounded-4xl p-6">
					{isLogin
						? <LoginForm onLogin={onLogin} onEmailNaoVerificado={solicitarVerificacao} />
						: <CadastroForm
							onCadastroSucesso={async (email) => {
								const verificado = await solicitarVerificacao(email);
								if (verificado) alternarFormulario();
								return verificado;
							}}
						/>
					}
                </motion.div>
            </motion.section>

			<ModalConfirmarCodigo
				email={emailParaConfirmar}
				open={Boolean(emailParaConfirmar)}
				onVerified={() => concluirVerificacao(true)}
				onOpenChange={(open) => {
					if (!open) {
						setEmailParaConfirmar("");
						concluirVerificacao(false);
					}
				}}
			/>
        </main>
    );
}
