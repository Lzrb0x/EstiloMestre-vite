import { Header } from "@/components/Header"

export default function BarbershopDetails() {
  return (
    <div className="min-h-screen cta-section">
      <Header />

      {/* banner */}
      <div className="hero-bg relative h-[50vh] flex items-center justify-center overflow-hidden animate-[fadeInUp_1s_ease-out_forwards] opacity-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 animate-pulse-slow">
            Foto Barbearia
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider">
            BARBEARIA ESTILO MESTRE
          </p>
        </div>
      </div>

      {/* detalhes da barbearia */}
      <section className="container mx-auto px-4 py-16 animate-[slideUp_0.8s_ease-out_0.6s_forwards] opacity-0">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 card-hover border bg-white border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl mr-4">
                📍
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Endereço e Contato</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="text-lg">Rua da Moda, 123 - Centro, São Paulo</p>
              <p className="text-lg font-semibold text-primary">(11) 98765-4321</p>
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl mr-2">★</span>
                <span className="text-lg font-semibold">4.8 (Avaliação)</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 card-hover border bg-white border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl mr-4">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Especialidades</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-primary mr-3">✦</span>
                <span className="text-gray-700 text-lg">Cortes Modernos</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-3">✦</span>
                <span className="text-gray-700 text-lg">Barba Terapêutica</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-3">✦</span>
                <span className="text-gray-700 text-lg">Pigmentação</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Nossos Profissionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-3 border rounded-2xl p-10 py-20">photo</div>
              <h4 className="font-semibold text-gray-900 mb-1">Name Employee</h4>
              <p className="text-gray-600 text-sm">Descrição do profissional</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-3 border rounded-2xl p-10 py-20">photo</div>
              <h4 className="font-semibold text-gray-900 mb-1">Name Employee</h4>
              <p className="text-gray-600 text-sm">Descrição do profissional</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-3xl mb-3 border rounded-2xl p-10 py-20">photo</div>
              <h4 className="font-semibold text-gray-900 mb-1">Name Employee</h4>
              <p className="text-gray-600 text-sm">Descrição do profissional</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 max-w-2xl mx-auto mb-8">
            <button className="btn-primary text-white px-12 py-4 rounded-2xl text-xl font-bold flex items-center justify-center mx-auto group">
              <span className="text-2xl mr-3">📅</span>
              QUERO AGENDAR AGORA!
              <div className="ml-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}