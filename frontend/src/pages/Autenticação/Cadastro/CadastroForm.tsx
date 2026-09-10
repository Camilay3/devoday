import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cadastrar } from "@/services/auth.service";
import { cadastroSchema, type CadastroFormData } from "@/schemas/cadastro.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

interface CadastroFormProps {
	onCadastroSucesso: () => void;
}

export function CadastroForm({ onCadastroSucesso }: Readonly<CadastroFormProps>){
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);

	const {register, handleSubmit, setError, formState: { errors }} = useForm<CadastroFormData>({
		resolver: zodResolver(cadastroSchema),
	});

	async function onSubmit(data: CadastroFormData) {
		setApiError(null);
		setIsLoading(true);
		try {
			await cadastrar({
				name: data.name,
				email: data.email,
				password: data.password,
			});
			onCadastroSucesso();

		} catch (error: unknown) {
			(axios.isAxiosError<{ error?: string }>(error) && error.response?.data.error === "Email já cadastrado")
				? setError("email", { type: "server", message: "Email já cadastrado" })
				: setApiError("Não foi possível criar a conta. Tente novamente.");

		} finally { setIsLoading(false); }
	}

	return (
		<form className="flex flex-col justify-between bg-white rounded-4xl h-full p-6 shadow-uniforme" onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-4xl font-bold text-center">Boas vindas!</h1>

			<div className="inputs">
				<Input type="text" label="Nome" placeholder="Insira seu nome" size="lg" variant="custom" error={errors.name?.message} {...register("name")}></Input>
				<Input type="email" label="Email" placeholder="Insira seu email" size="lg" variant="custom" error={errors.email?.message} {...register("email")}></Input>
				<Input type="password" label="Senha" placeholder="Insira sua senha" size="lg" variant="custom" error={errors.password?.message} {...register("password")}></Input>
				<Input type="password" label="Confirmar senha" placeholder="Insira sua senha novamente" size="lg" variant="custom" error={errors.confirmPassword?.message} {...register("confirmPassword")}></Input>
			</div>
			{apiError && <p className="text-sm text-destructive">{apiError}</p>}

			<Button type="submit" disabled={isLoading} variant="fill" size="xl" className="w-full">Criar conta</Button>
		</form>
	)
}
