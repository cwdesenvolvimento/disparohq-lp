"use client";

import Link from "next/link";
import {
  Bell,
  CalendarClock,
  LayoutDashboard,
  Megaphone,
  Send,
  Shield,
  Users
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import GlowCard from "../components/GlowCard";
import HeroMockup from "../components/HeroMockup";
import FAQAccordion from "../components/FAQAccordion";
import StatCounter from "../components/StatCounter";
import WaitlistForm from "../components/WaitlistForm";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const metrics = [
  { label: "Setup em minutos" },
  { label: "Agendamentos ilimitados" },
  { label: "Controle de grupos em um só lugar" }
];

const audiences = [
  {
    title: "Achadinhos / Promoções",
    description:
      "Organize grupos, programe postagens e mantenha consistência no conteúdo.",
    icon: Users
  },
  {
    title: "E-commerce",
    description:
      "Recuperação de carrinho, pós-compra, status de pedido e suporte com agilidade.",
    icon: Send
  },
  {
    title: "Serviços / Operações",
    description:
      "Confirmações, lembretes e avisos (agenda, logística, eventos, cobranças).",
    icon: CalendarClock
  }
];

const benefits = [
  {
    title: "Gestão de grupos completa",
    description:
      "Criar/importar, atualizar nome/foto/descrição, administrar membros e admins.",
    icon: Users
  },
  {
    title: "Envio em massa com personalização",
    description:
      "Variáveis, conteúdos dinâmicos e listas simples para segmentar melhor.",
    icon: Megaphone
  },
  {
    title: "Agendamento e fila de disparos",
    description: "Programe agora e deixe rodando o dia todo.",
    icon: CalendarClock
  },
  {
    title: "Transacional e notificações",
    description:
      "Mensagens de compra, status, lembretes e alertas via WhatsApp e SMS.",
    icon: Bell
  },
  {
    title: "Painel único",
    description:
      "Acompanhamento do que foi enviado e do que está agendado.",
    icon: LayoutDashboard
  },
  {
    title: "Rotina mais leve",
    description:
      "Menos trampo no celular, mais consistência e controle.",
    icon: Shield
  }
];

const steps = [
  {
    title: "Conecte e organize",
    description: "Crie ou importe seus grupos e deixe tudo padronizado."
  },
  {
    title: "Prepare suas mensagens",
    description: "Escreva, personalize e defina botões/enquetes."
  },
  {
    title: "Agende ou dispare",
    description: "Publique na hora ou programe uma sequência para o dia inteiro."
  }
];

const useCases = [
  {
    title: "Achadinhos / Grupos",
    items: [
      "“Bom dia! Promoções de hoje ✅” (post fixo/rotina)",
      "Sequência de posts por horários (manhã/tarde/noite)",
      "Troca de foto/descrição do grupo para campanhas especiais"
    ]
  },
  {
    title: "E-commerce / Transacional",
    items: [
      "Confirmação de pedido + prazo",
      "Status: “pedido enviado / saiu para entrega”",
      "Recuperação de carrinho com mensagem personalizada"
    ]
  },
  {
    title: "Operação / Serviços",
    items: [
      "Lembrete de consulta/agendamento",
      "Aviso de cobrança/pendência",
      "Confirmação de presença em evento"
    ]
  }
];

const faqItems = [
  {
    question: "Para que tipos de negócio o DisparoHQ serve?",
    answer:
      "Para qualquer tipo de negócio e operação que necessita do envio de mensagens (promoções, avisos, recuperação de conta), perfis de achadinhos e divulgação, e-commerces "
  },
  {
    question: "Consigo agendar mensagens e executar ações na hora?",
    answer:
      "Sim. Você pode programar envios e ações de gestão, ou executá-las imediatamente."
  },
  {
    question: "Preciso solicitar aprovação de templates de mensagens?",
    answer:
      "Depende. No caso dos grupos, você pode criar e enviar mensagens com o texto e personalização que preferir (imagens, videos, botões, enquetes), sem a necessidade de aprovação de template. Nas mensagens transacionais, você cria o template de mensagem direto no nosso painel, para facilitar o uso com a sua plataforma, mas não é necessário aguardar aprovação."
  },
  {
    question: "Dá para importar grupos que eu já tenho?",
    answer:
      "Sim. Você consegue trazer grupos existentes para gerenciar e operar pelo painel, ou criar novos grupos e começar do zero."
  },
  {
    question: "Posso gerenciar membros e administradores?",
    answer:
      "Sim. O painel permite adicionar/remover membros e administrar permissões conforme o fluxo do grupo."
  },
  {
    question:
      "O DisparoHQ serve para mensagens transacionais (pedido, entrega, lembrete)?",
    answer:
      "Sim. Além de disparos em massa, temos uma API dedicada para mensagens transacionais com fácil integração, para você poder se comunicar de forma pontual com seus clientes."
  },
  {
    question: "Como vocês lidam com opt-in e descadastro?",
    answer:
      "Recomendamos operar com base em consentimento. Você poderá definir boas práticas (listas e regras) para reduzir reclamações e manter qualidade de entrega."
  },
  {
    question: "Tem limite de mensagens?",
    answer:
      "Mensagens para grupos são ilimitadas. Os disparos em massa e envios transacionais são administrados por créditos adquiridos de forma segura dentro da plataforma. Ao entrar na lista, informe seu volume/mês para priorizarmos o melhor pacote de testes."
  },
  {
    question: "Quando será liberado o acesso à versão beta?",
    answer:
      "A previsão é para a segunda quinzena de março. Quem entrar na lista receberá o convite assim que liberarmos as vagas."
  }
];

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [glowEnabled, setGlowEnabled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateGlow = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      setGlowEnabled(finePointer && window.innerWidth >= 768);
    };
    updateGlow();
    window.addEventListener("resize", updateGlow);
    return () => window.removeEventListener("resize", updateGlow);
  }, []);

  const handleHeroMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!glowEnabled || !heroRef.current) {
      return;
    }

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const { left, top } = heroRef.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    rafRef.current = requestAnimationFrame(() => {
      heroRef.current?.style.setProperty("--cursor-x", `${x}px`);
      heroRef.current?.style.setProperty("--cursor-y", `${y}px`);
    });
  };

  const handleHeroLeave = () => {
    if (!heroRef.current) {
      return;
    }
    heroRef.current.style.setProperty("--cursor-x", "50%");
    heroRef.current.style.setProperty("--cursor-y", "50%");
  };

  const gridVariants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08 }
      }
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
      visible: { opacity: 1, y: 0 }
    }),
    [shouldReduceMotion]
  );

  return (
    <div className="text-text bg-background">
      <header
        className={`sticky top-0 z-50 border-b border-border transition ${
          isScrolled ? "bg-white/80 shadow-sm backdrop-blur" : "bg-white/60"
        }`}
      >
        <div className="container-pad mx-auto flex items-center justify-between py-4">
          <span className="font-display text-xl font-semibold">DisparoHQ</span>
          <Link
            href="#early-access"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent focus-visible:focus-ring"
          >
            Inscrever-me para o Beta
          </Link>
        </div>
      </header>

      <main>
        <AnimatedSection className="section-pad">
          <div
            ref={heroRef}
            className="container-pad mx-auto hero-grid relative overflow-hidden rounded-[2rem] border border-border bg-white/80 p-6 md:p-10 mesh-bg"
            onMouseMove={handleHeroMove}
            onMouseLeave={handleHeroLeave}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background: glowEnabled
                  ? "radial-gradient(220px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(250, 12, 247, 0.2), transparent 70%)"
                  : "none"
              }}
            />
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(15,23,42,0.15)_1px,transparent_1px)] [background-size:26px_26px]" />
            {!shouldReduceMotion && (
              <motion.div
                className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-[rgba(43,179,1,0.18)] blur-3xl"
                animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="relative z-10 stagger">
              <div className="-mt-14 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-text shadow-soft">
                <span className="badge-shimmer rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide text-text">
                  Beta limitado
                </span>
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                DisparoHQ — Mensageria Pro para WhatsApp e SMS
              </h1>
              <p className="text-lg text-muted">
                Envie mensagens em massa e transacionais, gerencie grupos e
                agende disparos em um painel amigável. Feito para negócios e
                operações que precisam de velocidade e simplicidade.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-muted">
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Grupos: crie/importa, gerencie membros/admins e publique com
                    organização
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Megaphone className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Disparos: mensagens em massa com personalização total e
                    agendamento
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Send className="mt-0.5 h-4 w-4 text-primary" />
                  <span>
                    Transacional: confirmações, status e alertas via WhatsApp e
                    SMS
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="#early-access"
                  className="btn-animated rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-[0_16px_40px_rgba(250,12,247,0.2)] active:scale-[0.98] focus-visible:focus-ring"
                >
                  Inscrever-me para o Beta (lista de espera)
                </Link>
                <Link
                  href="#como-funciona"
                  className="rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-text shadow-soft transition hover:border-accent hover:text-accent hover:shadow-[0_12px_30px_rgba(250,12,247,0.18)] focus-visible:focus-ring"
                >
                  Ver como funciona
                </Link>
              </div>
              <p className="text-xs text-muted">Quantidade limitada.</p>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <HeroMockup />
              <div className="grid gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
                <p className="text-sm text-muted">
                  Para quem envia promoções o dia todo e não quer perder tempo
                  com retrabalho.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {metrics.map((metric) => (
                    <StatCounter key={metric.label} label={metric.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-pad bg-surface">
          <div className="container-pad mx-auto">
            <h2 className="font-display text-3xl font-semibold">
              Feito para quem vive de WhatsApp
            </h2>
            <motion.div
              className="mt-8 grid gap-6 md:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {audiences.map((item) => {
                const Icon = item.icon;
                return (
                  <GlowCard key={item.title} variants={itemVariants}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </GlowCard>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-pad">
          <div className="container-pad mx-auto">
            <h2 className="font-display text-3xl font-semibold">
              Tudo que você precisa para disparar e gerenciar
            </h2>
            <motion.div
              className="mt-8 grid gap-6 md:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <GlowCard key={item.title} variants={itemVariants}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-transform duration-200 group-hover:rotate-3 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </GlowCard>
                );
              })}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="como-funciona" className="section-pad bg-surface">
          <div className="container-pad mx-auto">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="font-display text-3xl font-semibold">
                Comece em 3 passos
              </h2>
              <Link
                href="#early-access"
                className="text-sm font-semibold text-primary focus-visible:focus-ring"
              >
                Quero participar do beta
              </Link>
            </div>
            <motion.div
              className="mt-8 grid gap-6 md:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {steps.map((step, index) => (
                <GlowCard key={step.title} variants={itemVariants}>
                  <p className="text-xs font-semibold text-primary">
                    Passo {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-pad">
          <div className="container-pad mx-auto">
            <h2 className="font-display text-3xl font-semibold">
              Exemplos prontos de uso
            </h2>
            <motion.div
              className="mt-8 grid gap-6 md:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {useCases.map((block) => (
                <GlowCard key={block.title} variants={itemVariants}>
                  <h3 className="text-lg font-semibold">{block.title}</h3>
                  <ul className="mt-3 grid gap-2 text-sm text-muted">
                    {block.items.map((item) => (
                      <motion.li key={item} variants={itemVariants}>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </GlowCard>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="early-access" className="section-pad bg-surface">
          <div className="container-pad mx-auto grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold">
                Early access com prioridade
              </h2>
              <motion.ul
                className="mt-6 grid gap-3 text-sm text-muted"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  "Acesso antecipado ao DisparoHQ",
                  "Canal direto para sugerir melhorias",
                  "Migração/entrada assistida (quando necessário)",
                  "Condições especiais de lançamento para quem participa"
                ].map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <WaitlistForm />
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-pad">
          <div className="container-pad mx-auto">
            <h2 className="font-display text-3xl font-semibold">FAQ</h2>
            <FAQAccordion items={faqItems} />
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-pad">
          <div className="container-pad mx-auto">
            <div className="border-animated relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-soft">
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-[linear-gradient(90deg,rgba(43,179,1,0.35),rgba(250,12,247,0.35),rgba(43,179,1,0.35))] opacity-40 blur-2xl" />
              <div className="relative grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <h2 className="font-display text-3xl font-semibold">
                    Pronto para centralizar seus disparos e grupos?
                  </h2>
                  <p className="mt-3 text-sm text-muted">
                    Entre na lista do beta e ajude a moldar o DisparoHQ para o seu
                    fluxo real.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                  <Link
                    href="#early-access"
                    className="btn-animated block rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-soft transition hover:shadow-[0_16px_40px_rgba(250,12,247,0.2)] active:scale-[0.98] focus-visible:focus-ring"
                  >
                    Inscrever-me para o Beta
                  </Link>
                  <p className="mt-3 text-xs text-muted">
                    Sem spam. Você recebe apenas o convite e novidades do beta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container-pad mx-auto flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} DisparoHQ Mensageria Pro. Todos os
            direitos reservados.
          </span>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-accent">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Termos
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}