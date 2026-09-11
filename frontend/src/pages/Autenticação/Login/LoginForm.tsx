import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AuthProps } from "@/interfaces/auth";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { entrar } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm({ onLogin }: AuthProps){
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {register, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(data: LoginFormData) {
		setIsLoading(true);
		try {
			const response = await entrar({
				email: data.email,
				password: data.password,
			});
			onLogin(response.data.data.accessToken);
			navigate('/');

		} catch (error: unknown) {
			(axios.isAxiosError<{ message?: string }>(error) && error.response?.data.message === "Email ou senha incorretos")
				? toast.error("Não foi possível entrar na conta.", { description: "Email ou senha incorretos, verifique novamente." })
				: toast.error("Não foi possível entrar na conta. Tente novamente.");

		} finally { setIsLoading(false); }
	}

	return (
		<form className="flex flex-col justify-between bg-white rounded-2xl h-full p-6 shadow-uniforme" onSubmit={handleSubmit(onSubmit)}>
			<h1 className="text-4xl font-bold text-center">Boas vindas novamente!</h1>

			<div className="inputs">
				<Input type="email" label="Email" placeholder="Insira seu email" size="lg" variant="custom" error={errors.email?.message} {...register("email")}></Input>
				<Input type="password" label="Senha" placeholder="Insira sua senha" size="lg" variant="custom" error={errors.password?.message} {...register("password")}></Input>
			</div>

			<Button type="submit" disabled={isLoading} variant="fill" size="xl" className="w-full">Entrar</Button>
		</form>
	)
}
