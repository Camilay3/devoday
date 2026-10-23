import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { confirmarEmail } from "@/services/auth.service";
import { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

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
	const { control, handleSubmit, setError, reset, formState: { errors } } = useForm<CodigoFormData>({
		defaultValues: { code: "", },
	});
	useEffect(() => {
		if (open) reset({ code: "" });
	}, [open, reset]);

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
					<DialogTitle>Verificar email</DialogTitle>
					<DialogDescription align="center">Informe o código enviado para o email: <b>{cutMail}</b>.</DialogDescription>
				</DialogHeader>

				{/* <Input
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
				/> */}

				<Controller name="code"
					control={control}
					rules={{
						required: "Informe o código de verificação",
						pattern: { value: /^\d{6}$/, message: "O código deve ter 6 números" },
					}}
					render={({ field }) => (
						<InputOTP maxLength={6}
							pattern={REGEXP_ONLY_DIGITS}
							value={field.value}
							onChange={field.onChange}
							error={errors.code?.message}
							containerClassName="justify-center"
						>
							<InputOTPGroup>
								{Array.from({ length: 6 }, (_, index) => (
									<InputOTPSlot key={index} index={index} className="size-14 text-base"/>
								))}
							</InputOTPGroup>
						</InputOTP>
					)}
				/>

				<DialogFooter>
					<Button variant="secondary" onClick={() => onOpenChange(false)}>
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
