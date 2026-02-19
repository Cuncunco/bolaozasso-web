import { useState } from "react";
import { loginUser } from "../lib/api-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await loginUser({ email, password });
    window.location.href = "/";
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Entrar</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
