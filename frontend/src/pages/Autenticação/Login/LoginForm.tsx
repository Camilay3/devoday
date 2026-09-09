import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm(){
	return (
		<form className="flex flex-col justify-between bg-white rounded-4xl h-full p-6 shadow-uniforme">
			<h1 className="text-4xl font-bold text-center">Boas vindas novamente!</h1>

			<div className="inputs">
				<Input type="email" label="Email" placeholder="Insira seu email" size="lg" variant="custom"></Input>
				<Input type="password" label="Senha" placeholder="Insira sua senha" size="lg" variant="custom"></Input>
			</div>

			<Button variant="fill" size="xl" className="w-full">Entrar</Button>
		</form>
	)
}
