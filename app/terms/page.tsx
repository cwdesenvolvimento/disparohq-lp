import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container-pad mx-auto py-16">
        <h1 className="font-display text-3xl font-semibold">Termos</h1>
        <div className="mt-4 grid gap-4 text-sm text-muted">
          <p>
            Estes Termos de Uso estabelecem condições gerais para utilização do
            DisparoHQ. Ao acessar ou usar o serviço, você concorda com estes
            termos.
          </p>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              1. Uso do serviço
            </h2>
            <p>
              O serviço deve ser utilizado de forma lícita e em conformidade
              com boas práticas e regras aplicáveis.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              2. Conta e acesso
            </h2>
            <p>
              Você é responsável pelas informações fornecidas e pelo uso da sua
              conta, quando aplicável.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              3. Conteúdo e mensagens
            </h2>
            <p>
              Você é responsável pelas mensagens enviadas e pelo cumprimento de
              consentimentos necessários.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              4. Disponibilidade
            </h2>
            <p>
              O serviço é fornecido “no estado em que se encontra”, podendo
              sofrer alterações, pausas ou melhorias sem aviso prévio.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              5. Limitação de responsabilidade
            </h2>
            <p>
              Em nenhuma hipótese o DisparoHQ será responsável por perdas
              indiretas, lucros cessantes ou danos decorrentes do uso do
              serviço.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              6. Alterações
            </h2>
            <p>
              Estes termos podem ser atualizados periodicamente. A versão
              vigente estará sempre disponível nesta página.
            </p>
          </div>
        </div>
        <Link href="/" className="mt-6 inline-block text-sm text-primary">
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}
