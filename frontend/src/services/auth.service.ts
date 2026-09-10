import type { ICadastro } from "@/interfaces/auth";
import { api } from "./api";

export async function cadastrar(data: ICadastro) {
    const response = await api.post("/auth/cadastro", {
		name: data.name,
        email: data.email,
        password: data.password,
    });

    return response;
}
