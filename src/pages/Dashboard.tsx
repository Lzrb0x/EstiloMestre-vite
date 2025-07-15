import { Calendar, Clock, Scissors, Search, Smartphone, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { BarberIcon } from "@/components/BarberIcon";
import ShortBarbershopCardList from "@/components/ShortBarbershopCardList";

export default function Dashboard() {
  return (
    <div className="min-h-screen cta-section">

      <Header />

      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-8">
            <div className="flex-1 animate-[fadeInUp_1s_ease-out_forwards] opacity-0">
              <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
                Encontre sua barbearia ideal
                <span className="text-primary"> em segundos</span>
              </h1>
              <p className="text-xl md:text-2xl text-popover mb-8 animate-[fadeInUp_1s_ease-out_0.3s_forwards] opacity-0">
                Agende seu corte de forma rápida e prática. Veja horários disponíveis em tempo real.
              </p>
            </div>

            <BarberIcon />
          </div>
        </div>
      </section>


      <section className="py-12 bg-white animate-[slideUp_0.8s_ease-out_0.6s_forwards] opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
              Nossas Barbearias Parceiras
            </h2>
            <p className="text-popover ">
              Veja algumas opções disponíveis na sua região
            </p>
          </div>

            <ShortBarbershopCardList />

          <div className="text-center mt-8">
            <Button variant={"link"} className="font-medium text-lg font-mono">
              Ver todas as barbearias →
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Como é fácil agendar
            </h2>
            <p className="text-popover max-w-2xl mx-auto">
              Em apenas 3 passos você agenda seu corte e recebe confirmação na hora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2 ">1. Encontre</h3>
              <p className="text-popover ">Digite seu endereço e veja barbearias próximas com horários disponíveis</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-green-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">2. Agende</h3>
              <p className="text-slate-600">Escolha o horário que funciona melhor para você e confirme</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="text-purple-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">3. Corte</h3>
              <p className="text-slate-600">Chegue na hora marcada e aproveite seu novo visual</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
              Tudo na palma da sua mão
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">100% Mobile</h3>
              <p className="text-popover">Agende pelo celular, tablet ou computador. Funciona em qualquer lugar.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Confirmação Instantânea</h3>
              <p className="text-popover">Receba confirmação na hora por SMS e WhatsApp. Sem espera.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Horários Reais</h3>
              <p className="text-popover">Veja disponibilidade em tempo real. Sem surpresas ou desencontros.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 cta-section">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-600 mb-2">
              Você é barbeiro ou tem uma barbearia?
            </p>
            <Button variant={"link"} className="font-medium underline decoration-2 cursor-pointer font-mono">
              Quero minha barbearia online
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}