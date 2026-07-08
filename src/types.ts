export type AtendimentoStatus = 'EM_ANDAMENTO' | 'AGENDADO' | 'FINALIZADO' | 'CANCELADO';

export interface IServicoItem {
  id?: number;
  atendimentoId?: number;
  empresaId?: number;
  servicoId?: number;
  usuarioId: number | null;
  servicoDescricao: string;
  usuarioNome: string;
  valorTotal: number;
}

export interface IServico {
  id?: number;
  descricao: string;
  valor: number;
  valor_promocao: number;
  ativo: boolean;
  empresaId?: number;
  promocao_ativo: boolean;
}

export interface IAtendimento {
  id?: number;
  cliente: string;
  telefone: string;
  servicos: IServicoItem[];
  dataCriacao?: string;
  data_agendamento: string;
  valor_total: number;
  status: AtendimentoStatus;
  empresaId: number;
}

export interface IAtendimentoState {
  list: IAtendimento[];
  loading: boolean;
  error: string | null;
}

export interface IUsuario {
  id: number;
  nome: string;
  empresaId: number;
}

export interface IServicoSelecionado {
  servicoId: number;
  usuarioId: number | null;
}

export interface IDisponibilidade {
  data: string;
  horariosDisponiveis: string[];
}

export interface IEmpresa{
  id: string;
  description: string;
}

export type Step = 'form' | 'success';
