"use client";

import { useState } from "react";

const segments = [
  "Achadinhos / Promoções",
  "E-commerce",
  "Serviços / Operações",
  "Outro"
];

type FormState = {
  name: string;
  company: string;
  segment: string;
  volume: string;
  whatsapp: string;
  email: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  segment: "",
  volume: "",
  whatsapp: "",
  email: ""
};

export default function WaitlistForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setMessage("Cadastro recebido. Vamos priorizar seu acesso.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage("Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          Nome
          <input
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Empresa / Perfil
          <input
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="company"
            placeholder="Nome do perfil ou empresa"
            value={form.company}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          Segmento
          <select
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="segment"
            value={form.segment}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Volume/mês
          <input
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="volume"
            placeholder="Ex: 10.000 mensagens"
            value={form.volume}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          WhatsApp
          <input
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="whatsapp"
            placeholder="(11) 99999-0000"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          E-mail
          <input
            type="email"
            className="h-11 rounded-xl border border-border px-3 text-text transition focus-visible:focus-ring"
            name="email"
            placeholder="voce@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn-animated h-12 rounded-xl text-sm font-semibold text-white shadow-soft transition hover:shadow-[0_12px_30px_rgba(250,12,247,0.25)] active:scale-[0.98] focus-visible:focus-ring"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Entrar no Beta"}
      </button>
      <p className="text-xs text-muted">Quantidade limitada.</p>
      {message && (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-600" : "text-emerald-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}