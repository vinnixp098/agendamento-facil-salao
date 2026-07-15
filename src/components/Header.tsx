import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{
      background: 'linear-gradient(135deg, #3D3535, #4A4035)',
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <div>
        <img src="../public/image-logo1.png" alt="" style={{width: '80px', borderRadius: "50%"}}/>
        {user && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>{user.nome}</p>}
      </div>
      <button
        onClick={logout}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
      >
        <LogOut size={16} /> Sair
      </button>
    </header>
  );
}
