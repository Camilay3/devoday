import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { confirmarEmail } from "@/services/auth.service";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface CodigoFormData {
	code: string;
}

interface ModalConfirmarCodigoProps {
	readonly email: string;
	readonly open: boolean;
	readonly onVerified: () => void;
	readonly onOpenChange: (open: boolean) => void;
}

export function ModalConfirmarCodigo({ email, open, onVerified, onOpenChange }: ModalConfirmarCodigoProps) {
	const [isLoading, setIsLoading] = useState(false);
	const cutMail = email.replace(/^(.{2}).*(@.*)$/, "$1***$2");
	const { register, handleSubmit, setError, formState: { errors } } = useForm<CodigoFormData>();

	async function handleSalvar(data: CodigoFormData) {
		setIsLoading(true);

		try {
			await confirmarEmail(email, Number(data.code));
			toast.success("Email verificado com sucesso!");
			onVerified();
			onOpenChange(false);

		} catch (error: unknown) {
			if (axios.isAxiosError<{ message?: string }>(error)) {
				(error.response?.data.message)
					? setError("code", { type: "server", message: error.response?.data.message })
					: toast.error("Não foi possível verificar o email. Tente novamente.");
			} else {
				toast.error("Não foi possível verificar o email. Tente novamente.");
			}

		} finally { setIsLoading(false); }
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Digite o código de verificação</DialogTitle>
					<DialogDescription>Confira o código enviado para o email: {cutMail}.</DialogDescription>
				</DialogHeader>

				<Input
					type="text"
					inputMode="numeric"
					placeholder="Código de verificação"
					error={errors.code?.message}
					{...register("code", {
						required: "Informe o código de verificação",
						pattern: {
							value: /^\d{6}$/,
							message: "O código deve ter 6 números",
						},
					})}
				/>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button variant="fill" onClick={handleSubmit(handleSalvar)} disabled={isLoading} >
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
