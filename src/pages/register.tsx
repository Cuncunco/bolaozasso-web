import { useState } from "react";
import { registerUser } from "../lib/api-auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await registerUser({ name, email, password });
    window.location.href = "/";
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Registrar</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input placeholder="Nome (opcional)" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Criar conta</button>
      </form>
    </main>
  );
}
