import type { ICadastro } from "@/interfaces/auth";
import type { IUsuario } from "@/interfaces/auth";
import type { IResponse } from "@/interfaces/defaultResponse";
import type { AxiosResponse } from "axios";
import { api } from "./api";

export async function cadastrar(data: ICadastro): Promise<AxiosResponse<IResponse<IUsuario>>> {
    const response = await api.post<IResponse<IUsuario>>("/auth/cadastro", {
		name: data.name,
        email: data.email,
        password: data.password,
    });

    return response;
}
