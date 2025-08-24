import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import bestia_cock from '../assets/page/bestia_cock.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);

  const subItems = [
    { label: 'Academia de coctelería', href: '#academia' },
    { label: 'Catering de coctelería', href: '#catering' },
    { label: 'Competencias', href: '#competencias' },
    { label: 'Asesoría para bares y restaurantes', href: '#asesoria' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-500/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Marca + dropdown (desktop) */}
          <div className="relative group">
            <a
              href="#home"
              className="flex items-center gap-3 max-w-full"
            >
              {/* Logo con fondo propio */}
            
                <span className="flex items-center justify-center h-12 w-auto sm:h-12 sm:w-auto ">
                  <img
                    src={bestia_cock}
                    alt="Grupo Una Bestia Cocktails - Logo"
                    className="h-13 sm:h-18 w-auto object-contain"
                    draggable="false"
                  />
                </span>

              <span className="truncate text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Grupo Una Bestia Cocktails
              </span>

              <ChevronDown className="w-4 h-4 text-amber-400 transition-transform duration-300 hidden xl:block group-hover:rotate-180" />
            </a>

            {/* Dropdown desktop */}
            <div className="hidden xl:block absolute left-0 top-full mt-2 w-[320px] rounded-xl border border-amber-500/20 bg-black/95 backdrop-blur-md shadow-xl p-2
                            opacity-0 scale-95 translate-y-1 pointer-events-none transition-all duration-200
                            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
              {subItems.map(it => (
                <a
                  key={it.label}
                  href={it.href}
                  className="block px-4 py-3 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-amber-500/10"
                >
                  {it.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación desktop */}
          <div className="hidden xl:flex items-center gap-8 shrink-0">
            <a href="#home" className="hover:text-amber-400 transition-colors">Inicio</a>
            <a href="#competition" className="hover:text-amber-400 transition-colors">Competencia</a>
            <a href="#register" className="hover:text-amber-400 transition-colors">Inscríbete</a>
          </div>

          {/* Botón móvil */}
          <button
            className="xl:hidden p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="xl:hidden mt-3 pb-3 space-y-2">
            <button
              className="w-full flex items-center justify-between py-2 text-left hover:text-amber-400 transition-colors"
              onClick={() => setIsSubOpen(v => !v)}
              aria-expanded={isSubOpen}
            >
              <span className="font-semibold">Grupo Una Bestia Cocktails</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isSubOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`${isSubOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all`}>
              <div className="pl-3 border-l border-amber-500/20 space-y-1">
                {subItems.map(it => (
                  <a
                    key={it.label}
                    href={it.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm text-gray-200 hover:text-white hover:bg-amber-500/10 rounded-md px-3"
                  >
                    {it.label}
                  </a>
                ))}
              </div>
            </div>

            {[
              { label: 'Inicio', href: '#home' },
              { label: 'Competencia', href: '#competition' },
              { label: 'Inscríbete', href: '#register' },
            ].map(it => (
              <a
                key={it.label}
                href={it.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-amber-400 transition-colors"
              >
                {it.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
