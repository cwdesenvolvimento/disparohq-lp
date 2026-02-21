import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container-pad mx-auto py-16">
        <h1 className="font-display text-3xl font-semibold">Termos</h1>
        <p className="mt-4 text-sm text-muted">
          Esta página é um placeholder para os termos de uso do DisparoHQ.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm text-primary">
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}