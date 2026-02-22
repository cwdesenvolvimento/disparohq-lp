import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container-pad mx-auto py-16">
        <h1 className="font-display text-3xl font-semibold">Privacidade</h1>
        <div className="mt-4 grid gap-4 text-sm text-muted">
          <p>
            Esta Política de Privacidade descreve, de forma geral, como o
            DisparoHQ lida com informações quando você utiliza nossos serviços.
          </p>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              1. Informações coletadas
            </h2>
            <p>
              Coletamos informações fornecidas por você (ex.: nome, e-mail,
              telefone) e dados técnicos básicos de uso, quando aplicável.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              2. Uso das informações
            </h2>
            <p>
              Usamos as informações para operar, melhorar e oferecer suporte ao
              serviço, bem como para comunicações relacionadas ao produto.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              3. Compartilhamento
            </h2>
            <p>
              Não vendemos seus dados. Compartilhamentos podem ocorrer com
              fornecedores essenciais para a operação do serviço, quando
              necessário.
            </p>
          </div>

          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">
              4. Seus direitos
            </h2>
            <p>
              Você pode solicitar atualização ou remoção de dados entrando em
              contato conosco.
            </p>
          </div>
          <div className="grid gap-2">
            <h2 className="text-base font-semibold text-text">5. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A versão vigente
              estará sempre disponível nesta página.
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
