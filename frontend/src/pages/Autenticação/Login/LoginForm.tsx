import { Button } from "@/components/ui/button";

export function LoginForm(){
	return (
		<form className="bg-white rounded-4xl h-full p-6 shadow-uniforme">
			<h1 className="text-5xl font-bold text-center">Boas vindas novamente!</h1>

			<Button variant="fill" size="lg" className="w-full">Entrar</Button>
		</form>
	)
}
