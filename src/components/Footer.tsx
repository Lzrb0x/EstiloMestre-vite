export const Footer = () => {

    return (
        <footer id="about" className="bg-slate-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-bold mb-4">
                            Estilo<span className="text-blue-400">Mestre</span>
                        </div>
                        <p className="text-slate-300">
                            Conectando você aos melhores barbeiros da sua cidade.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Para Clientes</h3>
                        <div className="space-y-2 text-slate-300">
                            <div className="hover:text-white cursor-pointer">Como Funciona</div>
                            <div className="hover:text-white cursor-pointer">Encontrar Barbearia</div>
                            <div className="hover:text-white cursor-pointer">Suporte</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Empresa</h3>
                        <div className="space-y-2 text-slate-300">
                            <div className="hover:text-white cursor-pointer">Sobre Nós</div>
                            <div className="hover:text-white cursor-pointer">Contato</div>
                            <div className="hover:text-white cursor-pointer">Termos de Uso</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Ajuda</h3>
                        <div className="space-y-2 text-slate-300">
                            <div className="hover:text-white cursor-pointer">Central de Ajuda</div>
                            <div className="hover:text-white cursor-pointer">WhatsApp</div>
                            <div className="hover:text-white cursor-pointer">Email</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
                    <p>&copy; 2025 EstiloMestre. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}