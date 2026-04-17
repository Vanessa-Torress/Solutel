import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <h1 className="mb-4 text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">404</h1>
        <p className="mb-8 text-xl text-white/70">Oops! A página que você procura não foi encontrada.</p>
        <Link 
          href="/" 
          className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all glow-box"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
