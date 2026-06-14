export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <header className="border-b border-line/60 py-12">
      <div className="container-cabs">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">{intro}</p>
      </div>
    </header>
  );
}
