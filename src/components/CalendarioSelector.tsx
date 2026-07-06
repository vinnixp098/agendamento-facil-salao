import { useState } from 'react';
import { isDiaLotado } from '../mock/horarios';
import styles from './CalendarioSelector.module.css';

interface Props {
  value: string;
  onChange: (data: string) => void;
  minData: string;
  maxData: string;
}

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function toStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function CalendarioSelector({ value, onChange, minData, maxData }: Props) {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const offsetInicio = primeiroDia.getDay(); // 0=Dom

  // Gera todos os dias do mês
  const dias: (Date | null)[] = [
    ...Array(offsetInicio).fill(null),
    ...Array.from({ length: ultimoDia.getDate() }, (_, i) => new Date(ano, mes, i + 1)),
  ];

  function navMes(dir: number) {
    const d = new Date(ano, mes + dir, 1);
    setMes(d.getMonth());
    setAno(d.getFullYear());
  }

  const minDate = new Date(minData + 'T00:00:00');
  const maxDate = new Date(maxData + 'T00:00:00');

  // Impede navegar para meses sem dias disponíveis
  const mesAnteriorBloqueado = new Date(ano, mes, 1) <= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const mesProximoBloqueado = new Date(ano, mes, 1) >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  return (
    <div className={styles.calendario}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => navMes(-1)}
          disabled={mesAnteriorBloqueado}
        >
          ‹
        </button>
        <span className={styles.mesAno}>{MESES[mes]} {ano}</span>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => navMes(1)}
          disabled={mesProximoBloqueado}
        >
          ›
        </button>
      </div>

      <div className={styles.diasSemana}>
        {DIAS_SEMANA.map((d) => (
          <span key={d} className={styles.diaSemanaLabel}>{d}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {dias.map((dia, i) => {
          if (!dia) return <span key={`empty-${i}`} />;

          const str = toStr(dia);
          const fora = dia < minDate || dia > maxDate;
          const lotado = !fora && isDiaLotado(str);
          const desabilitado = fora || lotado;
          const selecionado = str === value;
          const ehHoje = str === toStr(hoje);

          return (
            <button
              key={str}
              type="button"
              disabled={desabilitado}
              onClick={() => onChange(str)}
              className={[
                styles.diaBtn,
                selecionado ? styles.diaSelecionado : '',
                ehHoje && !selecionado ? styles.diaHoje : '',
                lotado ? styles.diaLotado : '',
                fora ? styles.diaFora : '',
              ].join(' ')}
            >
              {dia.getDate()}
              {lotado && <span className={styles.lotadoDot} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
