import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  Models: ["Roma", "SF90 Stradale", "Purosangue", "Portofino M", "812 GTS", "296 GTB"],
  Company: ["About Ferrari", "Scuderia Ferrari", "Ferrari Museum", "Press", "Careers"],
  Ownership: ["Aftersales", "Financing", "Insurance", "Extended Warranty", "Ferrari Classiche"],
  Legal: ["Privacy Policy", "Cookie Policy", "Terms of Use", "Accessibility"],
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="bg-ferrari-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" fill="#DC0000" />
                <path d="M14 4 L18 10 L14 8 L10 10 Z" fill="#C9A84C" />
                <path d="M10 10 L14 8 L18 10 L16 22 L14 20 L12 22 Z" fill="#C9A84C" />
                <rect x="11" y="13" width="6" height="1.5" fill="#DC0000" />
                <rect x="11" y="16" width="6" height="1.5" fill="#DC0000" />
              </svg>
              <span className="text-white font-serif text-lg tracking-[0.25em]">
                FERRARI
              </span>
            </div>
            <p className="text-white/35 text-xs font-sans leading-relaxed mb-6">
              Via Abetone Inferiore, 4
              <br />
              41053 Maranello (MO)
              <br />
              Italy
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/30 hover:text-ferrari-red transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-[10px] tracking-[0.35em] uppercase font-sans font-semibold mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/35 hover:text-white text-sm font-sans transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-sans tracking-wide">
            © {new Date().getFullYear()} Ferrari S.p.A. — All trademarks are
            property of their respective owners.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-6 h-px bg-ferrari-red" />
            <span className="text-white/25 text-xs font-sans tracking-[0.3em] uppercase">
              Maranello, Italy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
