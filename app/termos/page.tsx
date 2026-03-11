import { Topbar } from "@/components/topbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Termos de Uso | Tem Onda",
  description: "Termos de uso e condicoes do servico Tem Onda - Previsao Costeira",
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Topbar />
      
      <main className="flex-1 px-6 py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Termos de Uso</h1>
          <p className="text-sm text-muted-foreground mb-8">Ultima atualizacao: 11 de marco de 2026</p>
          
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Aceitacao dos Termos</h2>
              <p>
                Ao acessar e utilizar o servico Tem Onda ("Servico"), voce concorda em cumprir e estar vinculado a estes Termos de Uso. Se voce nao concordar com qualquer parte destes termos, nao devera utilizar nosso Servico.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Descricao do Servico</h2>
              <p>
                O Tem Onda e uma plataforma de previsao costeira que fornece informacoes sobre condicoes de ondas, vento, mare e outros dados meteorologicos relacionados ao surf e atividades aquaticas. As informacoes sao fornecidas apenas para fins informativos e de orientacao.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Uso das Informacoes</h2>
              <p className="mb-3">
                As previsoes e dados fornecidos pelo Tem Onda sao baseados em modelos meteorologicos e podem nao ser 100% precisos. Voce reconhece e concorda que:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>As informacoes sao fornecidas "como estao" sem garantias de exatidao</li>
                <li>Voce e responsavel por suas proprias decisoes ao praticar atividades aquaticas</li>
                <li>Condicoes reais podem diferir das previsoes apresentadas</li>
                <li>Voce deve sempre verificar as condicoes locais antes de entrar na agua</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitacao de Responsabilidade</h2>
              <p>
                O Tem Onda nao se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar nosso Servico, incluindo, mas nao limitado a, acidentes, lesoes ou perdas relacionadas a atividades aquaticas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Propriedade Intelectual</h2>
              <p>
                Todo o conteudo presente no Tem Onda, incluindo textos, graficos, logos, icones, imagens, dados e software, e propriedade do Tem Onda ou de seus licenciadores e esta protegido por leis de direitos autorais e propriedade intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Conta do Usuario</h2>
              <p>
                Ao criar uma conta no Tem Onda, voce e responsavel por manter a confidencialidade de suas credenciais de acesso e por todas as atividades que ocorrerem em sua conta. Voce concorda em notificar imediatamente o Tem Onda sobre qualquer uso nao autorizado de sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Modificacoes dos Termos</h2>
              <p>
                O Tem Onda reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alteracoes entrarao em vigor imediatamente apos a publicacao no site. O uso continuado do Servico apos quaisquer alteracoes constitui sua aceitacao dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Lei Aplicavel</h2>
              <p>
                Estes Termos de Uso serao regidos e interpretados de acordo com as leis da Republica Federativa do Brasil. Quaisquer disputas relacionadas a estes termos serao submetidas a jurisdicao exclusiva dos tribunais brasileiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Contato</h2>
              <p>
                Se voce tiver duvidas sobre estes Termos de Uso, entre em contato conosco atraves do email: contato@temonda.com.br
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
