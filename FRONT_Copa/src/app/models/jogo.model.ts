import { Selecao } from "./selecao.model";

export interface Jogo {
  id?: number;
  selecaoA?: Selecao;
  selecaoB?: Selecao;
  criadoEm?: string;
  golsTimeA?: number;
  golsTimeB?: number;
}
