import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TreeDeciduous, Heart, ShieldCheck, Home, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

// --- Types & Context ---

type Language = 'EN' | 'FR';

interface Translation {
  nav: {
    home: string;
    story: string;
    catalog: string;
    contact: string;
    shop: string;
  };
  hero: {
    badge: string;
    title: string;
    titleItalic: string;
    description: string;
    btnCatalog: string;
    btnStory: string;
  };
  features: {
    eco: { title: string; desc: string };
    toxic: { title: string; desc: string };
    handmade: { title: string; desc: string };
    local: { title: string; desc: string };
  };
  about: {
    badge: string;
    title: string;
    titleItalic: string;
    p1: string;
    p2: string;
    p3: string;
    founders: string;
    foundersDesc: string;
    quote: string;
  };
  catalog: {
    badge: string;
    title: string;
    titleItalic: string;
    viewAll: string;
    addToCart: string;
  };
  contact: {
    title: string;
    desc: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    details: { email: string; workshop: string };
  };
  footer: {
    desc: string;
    nav: string;
    contact: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
}

const translations: Record<Language, Translation> = {
  EN: {
    nav: {
      home: "Home",
      story: "Our Story",
      catalog: "Catalog",
      contact: "Contact",
      shop: "Shop",
    },
    hero: {
      badge: "Local & Sustainable Craftsmanship",
      title: "Awakening through",
      titleItalic: "nature.",
      description: "Rose & Baobab creates wooden toys that stimulate the imagination, respect the planet, and last a lifetime.",
      btnCatalog: "View Catalog",
      btnStory: "Our Story",
    },
    features: {
      eco: { title: "Eco-friendly Wood", desc: "We only use wood from sustainable sources to preserve our planet." },
      toxic: { title: "Non-Toxic", desc: "Natural finishes and water-based paints safe for little ones." },
      handmade: { title: "Handmade", desc: "Each piece is unique, crafted with care in our home workshop." },
      local: { title: "Local", desc: "Located in the heart of the Outaouais Valley, we prioritize short circuits." },
    },
    about: {
      badge: "Our Essence",
      title: "The story of",
      titleItalic: "Rose & Baobab",
      p1: "Rose & Baobab was born from a simple desire: to offer our children toys that respect their health and their environment. Located in the beautiful Outaouais Valley, we manufacture each piece by hand, respecting artisanal traditions.",
      p2: "The 'Rose' evokes the sweetness of childhood and the delicacy of our finishes. The 'Baobab' represents the strength of nature and the longevity of our products, designed to be passed down from generation to generation.",
      p3: "We exclusively use local wood and non-toxic finishes (natural oils, water-based paints). Each toy is an invitation to exploration, without electronic noises or unnecessary plastics.",
      founders: "The Founders",
      foundersDesc: "Artisans in Outaouais",
      quote: "Nature is the most beautiful playground.",
    },
    catalog: {
      badge: "The Collection",
      title: "Our artisanal",
      titleItalic: "creations",
      viewAll: "View all favorites",
      addToCart: "Add to cart",
    },
    contact: {
      title: "Contact Us",
      desc: "A question about our products? A special order? We would love to chat with you.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Your message",
      send: "Send Message",
      details: { email: "Email", workshop: "Workshop" },
    },
    footer: {
      desc: "Inspired by nature, made for the future. Join our community of conscious parents and offer the best to your children.",
      nav: "Navigation",
      contact: "Contact",
      copyright: "© 2024 Rose & Baobab. Made with love in Quebec.",
      privacy: "Privacy",
      terms: "Terms",
    },
  },
  FR: {
    nav: {
      home: "Accueil",
      story: "Notre Histoire",
      catalog: "Catalogue",
      contact: "Contact",
      shop: "Boutique",
    },
    hero: {
      badge: "Artisanat Local & Durable",
      title: "L'éveil par",
      titleItalic: "la nature.",
      description: "Rose & Baobab crée des jouets en bois qui stimulent l'imaginaire, respectent la planète et durent toute une vie.",
      btnCatalog: "Voir le catalogue",
      btnStory: "Notre histoire",
    },
    features: {
      eco: { title: "Bois Écologique", desc: "Nous utilisons uniquement du bois provenant de sources durables pour préserver notre planète." },
      toxic: { title: "Non Toxique", desc: "Finitions naturelles et peintures à l'eau sécuritaires pour les tout-petits." },
      handmade: { title: "Fait Main", desc: "Chaque pièce est unique, fabriquée avec soin dans notre atelier à domicile." },
      local: { title: "Local", desc: "Situé au cœur de la vallée de l'Outaouais, nous privilégions le circuit court." },
    },
    about: {
      badge: "Notre Essence",
      title: "L'histoire de",
      titleItalic: "Rose & Baobab",
      p1: "Rose & Baobab est né d'un désir simple : offrir à nos enfants des jouets qui respectent leur santé et leur environnement. Situés dans la magnifique vallée de l'Outaouais, nous fabriquons chaque pièce à la main, dans le respect des traditions artisanales.",
      p2: "Le 'Rose' évoque la douceur de l'enfance et la délicatesse de nos finitions. Le 'Baobab' représente la force de la nature et la longévité de nos produits, conçus pour être transmis de génération en génération.",
      p3: "Nous utilisons exclusivement du bois local et des finitions non toxiques (huiles naturelles, peintures à l'eau). Chaque jouet est une invitation à l'exploration, sans bruits électroniques ni plastiques inutiles.",
      founders: "Les fondateurs",
      foundersDesc: "Artisans en Outaouais",
      quote: "La nature est le plus beau terrain de jeu.",
    },
    catalog: {
      badge: "La Collection",
      title: "Nos créations",
      titleItalic: "artisanales",
      viewAll: "Tout voir",
      addToCart: "Ajouter au panier",
    },
    contact: {
      title: "Contactez-nous",
      desc: "Une question sur nos produits ? Une commande spéciale ? Nous serions ravis de discuter avec vous.",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Votre message",
      send: "Envoyer le message",
      details: { email: "Email", workshop: "Atelier" },
    },
    footer: {
      desc: "Inspiré par la nature, fabriqué pour l'avenir. Rejoignez notre communauté de parents conscients et offrez le meilleur à vos enfants.",
      nav: "Navigation",
      contact: "Contact",
      copyright: "© 2024 Rose & Baobab. Fait avec amour au Québec.",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
  },
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
}>({
  lang: 'EN',
  setLang: () => {},
  t: translations.EN,
});

const useTranslation = () => useContext(LanguageContext);

// --- Data ---

const PRODUCTS = [
  {
    id: 1,
    name: { EN: "Elephant ", FR: "L'Elephant en faimille" },
    category: { EN: "St. Patrick's Edition", FR: "Édition Saint-Patrick" },
    price: "45$",
    description: { EN: "A sturdy natural wood truck carrying a lucky clover.", FR: "Un camion robuste en bois naturel transportant un trèfle porte-bonheur." },
    image: "/imagerose7.jpg"
  },
  {
    id: 2,
    name: { EN: "Go Canada Truck", FR: "Camion Go Canada" },
    category: { EN: "Early Learning", FR: "Éveil & Motricité" },
    price: "28$",
    description: { EN: "Set of three wooden rabbits to learn lacing while having fun.", FR: "Ensemble de trois lapins en bois pour apprendre à lacer tout en s'amusant." },
    image: "/imagerose4.jpg"
  },
  {
    id: 3,
    name: { EN: "The Maned Horse", FR: "Le Cheval à Crinière'" },
    category: { EN: "Patriotic Edition", FR: "Édition Patriotique" },
    price: "42$",
    description: { EN: "Celebrate our roots with this engraved 'Go Canada' truck.", FR: "Célébrez nos racines avec ce camion gravé 'Go Canada'." },
    image: "/imagerose5.jpg"
  },
  {
    id: 4,
    name: { EN: "Rabbit", FR: "Lapin" },
    category: { EN: "Rolling Toy", FR: "Jouet à rouler" },
    price: "52$",
    description: { EN: "A faithful companion with a natural fiber mane.", FR: "Un compagnon fidèle avec une crinière en fibre naturelle." },
    image: "/imagerose6.jpg"
  },
  {
    id: 5,
    name: { EN: "Saint Patrick", FR: "Saint Patrick" },
    category: { EN: "Rolling Toy", FR: "Jouet à rouler" },
    price: "48$",
    description: { EN: "A carefully saint patrick, perfect for small hands.", FR: "Un jouet Saint Patrick avec soin, parfait pour les petites mains." },
    image: "/imagerose3.jpg"
  },
  {
    id: 6,
    name: { EN: "The Valley Rainbow", FR: "L'Arc-en-ciel des Vallées" },
    category: { EN: "Open Play", FR: "Jeu Libre" },
    price: "65$",
    description: { EN: "A rainbow in natural tones for building and imagining.", FR: "Un arc-en-ciel aux tons naturels pour construire et imaginer." },
    image: "/imagerose1.jpg"
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const { lang, setLang, t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rose-light/90 backdrop-blur-md border-b border-rose-primary">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-rose-primary flex items-center justify-center shadow-sm overflow-hidden">
            <image : "/rosebaobab.jpg" 
              alt="Rose & Baobab Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-2xl font-serif font-semibold tracking-tight text-baobab-dark">Rose & Baobab</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-baobab-dark">
          <Link to="/" className="hover:text-rose-dark transition-colors">{t.nav.home}</Link>
          <Link to="/histoire" className="hover:text-rose-dark transition-colors">{t.nav.story}</Link>
          <Link to="/catalogue" className="hover:text-rose-dark transition-colors">{t.nav.catalog}</Link>
          <Link to="/contact" className="hover:text-rose-dark transition-colors">{t.nav.contact}</Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-tighter">
            <button 
              onClick={() => setLang('EN')}
              className={`px-2 py-1 rounded transition-all ${lang === 'EN' ? 'bg-baobab-dark text-cream' : 'text-baobab-muted hover:text-baobab-dark'}`}
            >
              EN
            </button>
            <span className="text-rose-primary">|</span>
            <button 
              onClick={() => setLang('FR')}
              className={`px-2 py-1 rounded transition-all ${lang === 'FR' ? 'bg-baobab-dark text-cream' : 'text-baobab-muted hover:text-baobab-dark'}`}
            >
              FR
            </button>
          </div>
          <Link to="/catalogue" className="bg-baobab-dark text-cream px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-rose-dark transition-all shadow-md">
            {t.nav.shop}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-baobab-dark text-cream pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-primary flex items-center justify-center overflow-hidden">
                <image : "/rosebaobab.jpg" 
                  alt="Rose & Baobab Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-2xl font-serif font-semibold">Rose & Baobab</span>
            </div>
            <p className="text-baobab-muted max-w-sm mb-6 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-baobab-muted rounded-full hover:bg-rose-primary hover:text-baobab-dark transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-baobab-muted rounded-full hover:bg-rose-primary hover:text-baobab-dark transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t.footer.nav}</h4>
            <ul className="space-y-3 text-sm text-baobab-muted uppercase tracking-widest font-medium">
              <li><Link to="/" className="hover:text-rose-primary transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/histoire" className="hover:text-rose-primary transition-colors">{t.nav.story}</Link></li>
              <li><Link to="/catalogue" className="hover:text-rose-primary transition-colors">{t.nav.catalog}</Link></li>
              <li><Link to="/contact" className="hover:text-rose-primary transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm text-baobab-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-rose-primary" />
                <span>Vallée de l'Outaouais, Ontario</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-rose-primary" />
                <span>bonjour@roseetbaobab.ca</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-rose-primary" />
                <span>+1 (819) 555-0123</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-baobab-muted/20 text-center text-xs text-baobab-muted uppercase tracking-widest">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  const { t, lang } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition"
    >
      {/* Hero */}
      <section className="px-6 py-12 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-rose-primary text-baobab-dark text-xs uppercase tracking-widest font-bold mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-6xl md:text-8xl leading-tight mb-8 text-baobab-dark">
              {t.hero.title} <br />
              <span className="italic text-rose-dark">{t.hero.titleItalic}</span>
            </h1>
            <p className="text-lg text-baobab-muted max-w-md mb-10 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue" className="bg-baobab-dark text-cream px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-rose-dark transition-all shadow-lg">
                {t.hero.btnCatalog}
              </Link>
              <Link to="/histoire" className="border border-baobab-dark text-baobab-dark px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-rose-primary transition-all">
                {t.hero.btnStory}
              </Link>
            </div>
          </div>
          <div className="relative">
  {/* Ajout de max-w-sm et mx-auto pour réduire et centrer */}
  <div className="aspect-[4/5] max-w-sm mx-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/50">
    <img 
      src="/imagerose5.jpg" 
      alt="Jouets Rose & Baobab" 
      className="w-full h-full object-cover"
    />
  </div>
  {/* On ajuste l'ombre portée pour qu'elle suive l'image réduite */}
  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-primary rounded-full -z-10 blur-2xl opacity-60"></div>
</div>
            
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-rose-primary/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[t.features.eco, t.features.toxic, t.features.handmade, t.features.local].map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm text-rose-dark">
                  {i === 0 && <TreeDeciduous />}
                  {i === 1 && <ShieldCheck />}
                  {i === 2 && <Heart />}
                  {i === 3 && <Home />}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-baobab-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-serif">{t.catalog.title} <span className="italic">{t.catalog.titleItalic}</span></h2>
            <Link to="/catalogue" className="text-baobab-dark border-b border-baobab-dark pb-1 text-xs uppercase tracking-widest font-bold hover:text-rose-dark hover:border-rose-dark transition-all">
              {t.catalog.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((p) => (
              <Link key={p.id} to="/catalogue" className="group">
                <div className="aspect-square rounded-3xl overflow-hidden mb-4 bg-rose-light">
                  <img src={p.image} alt={p.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-serif font-bold">{p.name[lang]}</h3>
                <p className="text-rose-dark font-bold">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const HistoirePage = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="page-transition px-6"
    >
      <div className="max-w-4xl mx-auto text-center mb-16 pt-32">
  <span className="text-rose-dark uppercase tracking-widest text-xs font-bold mb-4 block">{t.about.badge}</span>
  <h1 className="text-5xl md:text-7xl mb-8">{t.about.title} <br /><span className="italic">{t.about.titleItalic}</span></h1>
  
  {/* Ajout de max-w-2xl et mx-auto */}
  <div className="aspect-video max-w-2xl mx-auto rounded-[40px] overflow-hidden mb-12 shadow-xl">
    <img src="/imagerose2.jpg" alt="Atelier" className="w-full h-full object-cover" />
  </div>

  <div className="space-y-8 text-lg text-baobab-muted leading-relaxed text-left">
    <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
      </div>
    </motion.div>
  );
};

const CataloguePage = () => {
  const { t, lang } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition px-6"
    >
      <div className="max-w-7xl mx-auto pt-32">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl mb-4">{t.nav.catalog}</h1>
          <p className="text-baobab-muted uppercase tracking-widest text-xs font-bold">{t.catalog.badge}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="group bg-white/20 rounded-[32px] p-4 border border-rose-primary/30 hover:shadow-xl transition-all">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-rose-light">
                <img src={p.image} alt={p.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="px-2 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] text-rose-dark uppercase tracking-widest font-bold mb-1">{p.category[lang]}</p>
                    <h3 className="text-2xl font-serif font-bold text-baobab-dark">{p.name[lang]}</h3>
                  </div>
                  <span className="text-xl font-bold text-baobab-dark">{p.price}</span>
                </div>
                <p className="text-sm text-baobab-muted mb-6 leading-relaxed">{p.description[lang]}</p>
                <button className="w-full bg-rose-primary text-baobab-dark py-3 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-rose-dark hover:text-white transition-all">
                  {t.catalog.addToCart}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }}
      className="page-transition px-6"
    >
      <div className="max-w-5xl mx-auto bg-white/40 rounded-[40px] p-8 md:p-16 shadow-2xl border border-rose-primary mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-serif mb-6">{t.contact.title}</h1>
            <p className="text-baobab-muted mb-10 leading-relaxed">
              {t.contact.desc}
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-primary flex items-center justify-center text-baobab-dark">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-baobab-muted">{t.contact.details.email}</p>
                  <p className="font-bold">bonjour@roseetbaobab.ca</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-primary flex items-center justify-center text-baobab-dark">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-baobab-muted">{t.contact.details.workshop}</p>
                  <p className="font-bold">Vallée de l'Outaouais, ON</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={t.contact.name} className="bg-white/50 border border-rose-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-dark" />
              <input type="email" placeholder={t.contact.email} className="bg-white/50 border border-rose-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-dark" />
            </div>
            <input type="text" placeholder={t.contact.subject} className="w-full bg-white/50 border border-rose-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-dark" />
            <textarea placeholder={t.contact.message} rows={5} className="w-full bg-white/50 border border-rose-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-dark"></textarea>
            <button className="w-full bg-baobab-dark text-cream py-4 rounded-2xl text-sm uppercase tracking-widest font-bold hover:bg-rose-dark transition-all shadow-lg">
              {t.contact.send}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('EN');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-rose-light selection:bg-rose-primary selection:text-baobab-dark">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/histoire" element={<HistoirePage />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}