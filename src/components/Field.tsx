import styles from './Field.module.css';

interface Props {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, error, children }: Props) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
