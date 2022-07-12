type RequestBodyEvento = {
	produtora?: String,
	nomeEvento?: String,
	tema?: String,
	local?: String,
	linkEvento?: String,
	linkCard?: String,
	modalidade?: String,
	eventoPagoGratuito?: String,
	categoria?: String,
	descricaoEvento?: String,
	dataHoraInicio: Date,
	dataHoraTermino: Date,
	cidade?: String,
	ingressosTotal?: Number,
	ingressosDisponiveis: Number,
	ingressosVendidos: Number,
	preco?: Number,
	visibilidade?: String,
	ambiente?: String,
	id_Usuario?: string,
	id_Evento?: string,
};
type RequestBodyCosts = {
	local: String,
	valorLocalUnd?: Number,
	qtLocal?: Number,
	divulgacao?: Number,
	decoraIlumina?: Number,
	equipamentos?: Number,
	alimentacao?: Number,
	hospedagem?: Number,
	equipeQtd?: Number,
	equipe?: Number,
	outros?: Number,
	id_Usuario: string,
	id_Evento: string,
	id?: string,
};

type TodoAttributesEvento = {
	nome?: string,
	sobrenome?: string,
	telefone?: Number,
	email?: string,
	senha?: string,
	id_Usuario?: string,
	id_Evento?: string,
};

type RequestBodyUsuarioCompleto = {
	rua?: String | Number,
	numero?: Number | String,
	bairro?: String,
	estado?: String,
	cidade?: String,
	nacionalidade?: String,
	cep?: String,
	telefone?: Number,
	cpf?: Number,
	rg?: Number,
	profissao?: String,
	produtorEventos?: boolean,
	id_Usuario?: string,
};
type RequestBodyIngresso = {
	ingresso?: String | Number,
	precoPago?: Number | String,
	cpf?: Number | String,
	telefone: Number,
	id_Evento: Number | String,
	protocoAutenticado: Number,
	id_Usuario: string,
};

interface TodoAttributes {
	name: string;
	sobrenome: string;
	email: string;
	senha: string;
}

interface TodoAttributesCompleto {
	rua: string;
	numero: string;
	bairro: string;
	estado: string;
	nacionalidade: string;
	cidade: string;
	cep: string;
	cpf: number | string;
	rg: string;
	profissao: string;
	produtorEventos: string;
}

export {
	RequestBodyEvento,
	TodoAttributesEvento,
	RequestBodyUsuarioCompleto,
	RequestBodyCosts,
	RequestBodyIngresso,
	TodoAttributes,
	TodoAttributesCompleto,
};
