"use client";

import Link from "next/link";
import { Scissors, Clock, MapPin, Instagram, Star } from "lucide-react";

const SERVICOS = [
  {
    id: "corte",
    nome: "Corte de Cabelo",
    descricao: "Corte personalizado com acabamento impecável",
    duracao: "60 min",
    preco: "A partir de R$ 50",
  },
  {
    id: "corte-barba",
    nome: "Corte + Barba",
    descricao: "Combo completo para um visual renovado",
    duracao: "90 min",
    preco: "A partir de R$ 80",
  },
  {
    id: "sobrancelha",
    nome: "Sobrancelha",
    descricao: "Design e alinhamento precisos",
    duracao: "30 min",
    preco: "A partir de R$ 25",
  },
  {
    id: "luzes",
    nome: "Luzes",
    descricao: "Mechas naturais para um visual sofisticado",
    duracao: "120 min",
    preco: "A partir de R$ 150",
  },
  {
    id: "platinado",
    nome: "Platinado",
    descricao: "Loiro platinado com técnica avançada",
    duracao: "180 min",
    preco: "A partir de R$ 250",
  },
];

const HORARIOS = [
  "Seg–Sex: 09h às 19h",
  "Sábado: 09h às 17h",
  "Domingo: Fechado",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors size={18} className="text-[#c9a84c]" strokeWidth={1.5} />
            <span
              className="text-lg font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
            >
              Barbearia
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-white/50">
            <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
          </div>

          <Link
            href="/agendamento"
            className="text-xs tracking-widest uppercase font-semibold px-5 py-2.5 bg-white text-black hover:bg-[#c9a84c] transition-colors duration-200"
          >
            Agendar
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
          {/* Grade de linhas decorativas */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          {/* Ornamento */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <Scissors size={16} className="text-[#c9a84c]" strokeWidth={1.5} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>

          <p
            className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Estilo & Precisão desde 2018
          </p>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A arte do
            <br />
            <em className="not-italic text-[#c9a84c]">corte</em> perfeito
          </h1>

          <p
            className="text-white/50 text-base md:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Experiência premium de barbearia. Cada detalhe pensado para você sair
            daqui se sentindo exatamente como queria.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/agendamento"
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 bg-white text-black hover:bg-[#c9a84c] transition-colors duration-200"
            >
              Agendar Horário
            </Link>
            <a
              href="#servicos"
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 border border-white/20 text-white/70 hover:border-white hover:text-white transition-colors duration-200"
            >
              Ver Serviços
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-12 text-center">
            {[
              { num: "6+", label: "Anos de experiência" },
              { num: "2k+", label: "Clientes satisfeitos" },
              { num: "5★", label: "Avaliação média" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold text-[#c9a84c]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-xs text-white/40 mt-1 tracking-wider uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white animate-pulse" />
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              O que oferecemos
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Nossos Serviços
            </h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <Scissors size={12} className="text-[#c9a84c]/40" />
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
          </div>

          {/* Grid de serviços */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {SERVICOS.map((servico, i) => (
              <div
                key={servico.id}
                className="bg-[#0a0a0a] p-8 hover:bg-[#111] transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-4xl font-bold text-white/5 group-hover:text-[#c9a84c]/10 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    0{i + 1}
                  </span>
                  <Clock size={14} className="text-white/20 mt-1" />
                </div>

                <h3
                  className="text-xl font-bold mb-2 group-hover:text-[#c9a84c] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {servico.nome}
                </h3>

                <p
                  className="text-white/40 text-sm mb-6 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {servico.descricao}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span
                    className="text-xs text-white/30 tracking-wider"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {servico.duracao}
                  </span>
                  <span
                    className="text-sm text-[#c9a84c] font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {servico.preco}
                  </span>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-[#c9a84c] p-8 flex flex-col justify-between">
              <div>
                <h3
                  className="text-2xl font-bold text-black mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Pronto para transformar seu visual?
                </h3>
                <p
                  className="text-black/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  Agende agora e garanta seu horário.
                </p>
              </div>
              <Link
                href="/agendamento"
                className="mt-8 inline-block text-center text-xs tracking-[0.2em] uppercase font-bold px-6 py-3 bg-black text-white hover:bg-[#0a0a0a] transition-colors"
              >
                Agendar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE / DIFERENCIAIS */}
      <section id="sobre" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Por que nos escolher
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Tradição com
              <br />
              <em className="not-italic text-white/40">técnica moderna</em>
            </h2>
            <p
              className="text-white/40 text-base leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Combinamos o melhor da barbearia clássica com tendências modernas.
              Cada cliente recebe atenção personalizada, porque seu estilo é único.
            </p>

            <div className="space-y-4">
              {[
                "Profissionais certificados com mais de 5 anos de experiência",
                "Produtos premium nacionais e importados",
                "Ambiente climatizado e confortável",
                "Agendamento online — sem filas, sem espera",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Star
                    size={14}
                    className="text-[#c9a84c] mt-0.5 shrink-0"
                    fill="currentColor"
                  />
                  <span
                    className="text-sm text-white/50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bloco visual decorativo */}
          <div className="relative">
            <div className="aspect-[4/5] bg-[#111] border border-white/5 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Scissors
                    size={64}
                    className="text-[#c9a84c]/20 mx-auto mb-4"
                    strokeWidth={1}
                  />
                  <p
                    className="text-white/10 text-sm tracking-widest uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Foto em breve
                  </p>
                </div>
              </div>

              {/* Etiqueta decorativa */}
              <div className="absolute top-6 right-6 bg-[#c9a84c] px-4 py-2">
                <p
                  className="text-black text-xs font-bold tracking-wider uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Premium
                </p>
              </div>
            </div>

            {/* Card flutuante */}
            <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] p-6 shadow-2xl">
              <div
                className="text-3xl font-bold text-black"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                2.000+
              </div>
              <div
                className="text-black/60 text-xs tracking-wider uppercase mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Clientes Satisfeitos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Onde estamos
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Contato & Localização
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            <div className="bg-[#0a0a0a] p-8">
              <MapPin size={20} className="text-[#c9a84c] mb-4" strokeWidth={1.5} />
              <h4
                className="font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Endereço
              </h4>
              <p
                className="text-white/40 text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Rua da Barbearia, 123
                <br />
                Centro — Sumaré, SP
              </p>
            </div>

            <div className="bg-[#0a0a0a] p-8">
              <Clock size={20} className="text-[#c9a84c] mb-4" strokeWidth={1.5} />
              <h4
                className="font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Horários
              </h4>
              <div className="space-y-1">
                {HORARIOS.map((h) => (
                  <p
                    key={h}
                    className="text-white/40 text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {h}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-8">
              <Instagram size={20} className="text-[#c9a84c] mb-4" strokeWidth={1.5} />
              <h4
                className="font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Redes Sociais
              </h4>
              <p
                className="text-white/40 text-sm mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Siga nosso trabalho no Instagram
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-[#c9a84c] hover:text-white transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                @suabarbearia →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-[#c9a84c]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl font-bold text-black mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Seu próximo corte está a um clique
          </h2>
          <p
            className="text-black/60 mb-8 text-base"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Agende online, escolha o horário e apareça. Simples assim.
          </p>
          <Link
            href="/agendamento"
            className="inline-block text-xs tracking-[0.3em] uppercase font-bold px-12 py-4 bg-black text-white hover:bg-[#0a0a0a] transition-colors"
          >
            Agendar Agora
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scissors size={14} className="text-[#c9a84c]" strokeWidth={1.5} />
            <span
              className="text-sm tracking-widest uppercase text-white/40"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Barbearia
            </span>
          </div>
          <p
            className="text-xs text-white/20"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} Barbearia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
