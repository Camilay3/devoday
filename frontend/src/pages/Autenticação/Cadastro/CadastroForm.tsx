import { Button } from "@/components/ui/button";

export function CadastroForm(){
	return (
		<form className="bg-white rounded-4xl h-full p-6 shadow-uniforme">
			<h1 className="text-5xl font-bold text-center">Boas vindas!</h1>

			<Button variant="fill" size="lg" className="w-full">Criar conta</Button>
		</form>
	)
}
