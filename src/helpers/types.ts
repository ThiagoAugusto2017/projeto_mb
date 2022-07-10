type RequestBodyEvento = {
	produtora: String,
	nomeEvento: String,
	tema: String,
	link: String,
	modalidade: String,
	eventoPagoGratuito: String,
	categoria: String,
	descricaoEvento: String,
	dataHoraInicio: Date,
	dataHoraTermino: Date,
	ingressosQtd: String,
	preco: Number,
	visibilidade: String,
	ambiente: String,
	id_Usuario: string,
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
	name: string,
	sobrenome: string,
	email: string,
	senha: string,
};

type RequestBodyUsuarioCompleto = {
	rua?: String | Number,
	numero?: Number | String,
	bairro?: String,
	estado?: String,
	nacionalidade?: String,
	cep?: String,
	cpf?: Number,
	rg?: Number,
	profissao?: String,
	produtorEventos?: boolean,
	id_Usuario?: string,
};

export {
	RequestBodyEvento,
	TodoAttributesEvento,
	RequestBodyUsuarioCompleto,
	RequestBodyCosts,
};
