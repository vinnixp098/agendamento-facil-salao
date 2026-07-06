import styles from './SuccessScreen.module.css';

interface Props {
  onNovo: () => void;
}

export function SuccessScreen({ onNovo }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>✓</div>
      <h2 className={styles.title}>Agendamento confirmado!</h2>
      <p className={styles.sub}>Seu atendimento foi agendado com sucesso. Te esperamos!</p>
      <button className={styles.btn} onClick={onNovo}>
        Fazer novo agendamento
      </button>
    </div>
  );
}
