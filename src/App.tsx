import { useEffect, useState } from 'react';
import type { IEmpresa, Step } from './types';
import { AgendamentoForm } from './components/AgendamentoForm';
import { SuccessScreen } from './components/SuccessScreen';
import styles from './App.module.css';
import { api } from './api';

export default function App() {
  const [step, setStep] = useState<Step>('form');
  const [empresa, setEmpresa] = useState<IEmpresa>()

  const empresaId = Number(new URLSearchParams(window.location.search).get('empresaId'));

  useEffect(() => {
    Promise.all([
      api.getDadosEmpresa(empresaId),
      api.getServicos(empresaId),
      api.getUsuarios(empresaId),
    ])
      .then(([d]) => { setEmpresa(d[0]) })
      .catch(() => { })
      .finally(() => { });
  }, [empresaId])

  if (!empresaId) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.erroEmpresa}>Link inválido. Entre em contato com o salão para obter o link correto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logo}>✂</div>
          <div>
            <h1 className={styles.title}>{empresa?.description}</h1>
            {/* <h1 className={styles.title}>Agende seu atendimento</h1> */}
            <p className={styles.subtitle}>Rápido e fácil, sem precisar ligar</p>
          </div>
        </header>

        {step === 'form' ? (
          <AgendamentoForm empresaId={empresaId} onSuccess={() => setStep('success')} />
        ) : (
          <SuccessScreen onNovo={() => setStep('form')} />
        )}
      </div>
    </div>
  );
}
