export interface ICadastro extends ILogin {
	name: string,
}

export interface ILogin {
	email: string,
	password: string,
}

export interface IUsuario {
	id: number,
	name: string,
	email: string,
}

export interface AuthProps {
    readonly onLogin: (accessToken: string) => void;
}
