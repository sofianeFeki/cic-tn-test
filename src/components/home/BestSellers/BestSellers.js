import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  IMPRIMANTE_PANTUM_M6609N,
  IMPRIMANTE_PANTUM_BP5100DN,
  IMPRIMANTE_PANTUM_BM5100FDW,
  IMPRIMANTE_PANTUM_CP2200DW,
  CP2200DW,
  BM5100,
  BP5100DN,
  M6609N,
  PUNTUM,
} from "../../../assets/images/index";

const BestSellersProduct = [
  {
    _id: "201",
    img: IMPRIMANTE_PANTUM_CP2200DW,
    video: PUNTUM,
    productName: "Imprimante PANTUM CP2200DW",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Laser PANTUM Couleur - Fonctions: Impression  - Technologie d'impression: Laser - Format Papier: A4 - Vitesse d’impression(Couleur/N&B): 24 ppm (A4) / 26 ppm (Lettre) - Résolution d'impression: 600 x 600 dpi - Sortie papier: 100 page - Mémoire: Double cœur, 1 GHz - Impression recto verso: Automatique - Heure de la première impression: Moins de 11s  - Connecteurs: USB 2.0 haut débit Ethernet 10/100/1000 BaseTX (RJ-45) 802.11b/g/n Sans fil - Dimensions: 411.2 x 394.1 x 243.7mm - Poids: 16,1 kg - Couleur: Blanc",
    cat: "Imprimante",
    pdf: CP2200DW,
    ficheTech: [
      { label: "Technology ", value: "Electrophotographic monochrome laser " },
      { label: "Print speed ", value: "22 ppm (A4)/23 ppm (Letter)" },

      { label: "First print out time ", value: "Less than 7.8s       " },
      { label: "Maximum Monthly Duty Cycle", value: "15,000 pages " },
      {
        label: "Recommended monthly volume Resolution(dpi) ",
        value: "700 pages ",
      },
      { label: "Printer language Duplex Mode ", value: "Max. 1,200×1,200 " },
      { label: "Printer  ", value: "Max. 1,2   " },
      { label: "galass  ", value: "Max. 1,2   " },
    ],
  },
  {
    _id: "202",
    img: IMPRIMANTE_PANTUM_BM5100FDW,
    video: PUNTUM,
    productName: "IMPRIMANTE PANTUM BM5100FDW",
    color: "Blanc",
    badge: false,
    brand: "Pantum",
    des: "Pantum BM5100fdw Imprimante laser mono : Pantum BM5100fdw -Imprimante :laser -monochrome multifonction,:format A4-,4-en-1 avec fonctions impression, copie, numérisation et fax, vitesse d'impression de 40ppm, connexion Réseau :LAN RJ45-, Wifichrome multifonction, format A4, 4-en-1 avec fonctions impression, copie, numérisation et fax, vitesse d'impression de 40ppm, connexion Réseau LAN RJ45, Wifi",
    cat: "Imprimante",
    pdf: BM5100,
    ficheTech: [
      { label: "Vitesse d'impression ", value: "40ppm(A4)/42ppm(lettre) " },
      { label: "Temps de sortie de la première page ", value: "≤6.9 s" },

      {
        label: "Nombre de pages mensuel recommandé",
        value: "750 à 4,000 Pages",
      },
      { label: "Résolution d'impression", value: "Max.1,200x1,200 dpi" },
      {
        label: "Langage d'impression ",
        value: "PCL5e, PCL6, PS        ",
      },
      { label: "Vitesse du processeur", value: "1.2 GHz" },
      { label: "Mémoire", value: "512 MB" },
      {
        label: "Panneau de commande ",
        value: "LCD 2 lignes ||  Écran tactile 3,5 pouces      ",
      },
      { label: "Impression recto-verso automatique      ", value: "Oui" },
      {
        label: "Autres fonctions d'impression      ",
        value:
          "Impression brochure, impression sécurisée, impression disque USB Compatible AirPrint, Mopria, APP mobile (APP iOS/App Android)",
      },
      { label: "Vitese de copie ", value: "40ppm(A4)/42ppm(lettre)" },
      {
        label: "Temps de sortie de la première page",
        value: "Plateau : moins de 10 s ADF : moins de 11 s",
      },
    ],
  },

  {
    _id: "203",
    img: IMPRIMANTE_PANTUM_BP5100DN,
    video: PUNTUM,
    productName: "IMPRIMANTE PANTUM BP5100DN",
    color: "Blanc",
    badge: true,
    brand: "Pantum",
    des: "Imprimante Monochrome Laser PANTUM BP5100DN : Fonctions Impression - :Capacité Bac à papier 250 pages - :Formats papier -: A4 - Technologie d’impression Laser Monochrome - :Vitesse d’impression Noir & Blanc Jusqu’à 40 pages par minute en A4 -: Résolution 1200 dpi -: Mémoire 512 Mo - Connectivité Ethernet, USB 2.0 -:Auto-Duplex-, Network-Ready : Impression silencieuse - faible encombrement et respectueux de l'environnement -: cartouches à haut rendement en option - processeur haute vitesse 1,2 GHz - Dimensions: 364 x 344 x 257 mm - Poids: 9.3 kg - Garantie: 1 an",
    cat: "Imprimante",
    pdf: BP5100DN,
    ficheTech: [
      { label: "Vitesse d'impression ", value: "40ppm(A4)/42ppm(lettre) " },
      { label: "Temps de sortie de la première page ", value: "≤6.9 s" },

      {
        label: "Nombre de pages mensuel recommandé",
        value: "750 à 4,000 Pages",
      },
      { label: "Résolution d'impression", value: "Max.1,200x1,200 dpi" },
      {
        label: "Langage d'impression ",
        value: "PCL5e, PCL6, PS        ",
      },
      { label: "Vitesse du processeur", value: "1.2 GHz" },
      { label: "Mémoire", value: "512 MB" },
      {
        label: "Panneau de commande ",
        value: "LCD 2 lignes ||  Écran tactile 3,5 pouces      ",
      },
      { label: "Impression recto-verso automatique      ", value: "Oui" },
      {
        label: "Autres fonctions d'impression      ",
        value:
          "Impression brochure, impression sécurisée, impression disque USB Compatible AirPrint, Mopria, APP mobile (APP iOS/App Android)",
      },
      { label: "Vitese de copie ", value: "40ppm(A4)/42ppm(lettre)" },
      {
        label: "Temps de sortie de la première page",
        value: "Plateau : moins de 10 s ADF : moins de 11 s",
      },
    ],
  },
  {
    _id: "2005",
    img: IMPRIMANTE_PANTUM_M6609N,
    video: PUNTUM,
    productName: "IMPRIMANTE PANTUM M6609N",
    color: "Blanc",
    badge: false,
    brand: "Pantum",
    des: "Imprimante Laser 3en1 à toner rechargeable PANTUM M6609N - Capacité d'impression Jusqu'à 1600 pages - Vitesse d’impression : 22 ppm (A4) / 23 ppm (Lettre) - Résolution (impression, copie et numérisation) : 1200×1200dpi - Heure de la première impression : Moins de 7.8s - Connectivité : USB 2.0 haute vitesse - Vitesse de copie : 22cpm (A4) / 23cpm (Lettre) - Capacité du chargeur automatique de documents : 35 pages - Entrée papier : 150 pages - Sortie papier : 100 pages - Dimensions : 417 x 305 x 301 mm - Poids : 8.5 kg - Garantie 1 an",
    cat: "Imprimante",
    pdf: M6609N,
    ficheTech: [
      { label: "Print Speed", value: "22ppm (A4) / 23ppm (Letter)" },
      { label: "Resolution (print, copy & scan)", value: "1200×1200dpi" },
      { label: "First Print Out Time", value: "Less than 7.8s" },
      { label: "Processor", value: "600 MHz" },
      { label: "Memory", value: "128 MB" },
      { label: "Duplex Mode", value: "Manual" },
      {
        label: "Connectivity",
        value: [
          "Hi-speed USB 2.0",
          "Hi-speed USB 2.0 10/100Base-Tx Ethernet",
          "Hi-speed USB 2.0 10/100Base-Tx Ethernet WiFi 802.11b/g/n",
        ],
      },
      { label: "Max. Monthly Volume", value: "20,000 pages" },
      { label: "Recommended Monthly Volume", value: "2000 pages" },
      { label: "Copy Speed", value: "22cpm (A4) / 23cpm (Letter)" },
      { label: "First Copy Out Time", value: "Less than 12 seconds" },
      { label: "Zoom", value: "25% - 400%" },
      { label: "Max. Copy Pages", value: "1 - 99 pages" },
      {
        label: "Additional Function",
        value: "ID copy, Receipt copy, N-up copy, Clone copy",
      },
      { label: "Scanner Type", value: "Flatbed+ADF" },
      {
        label: "Max. Scan Size",
        value: "216 x 297mm (Flatbed), 216 x 356mm (ADF)",
      },
      { label: "Color Scanning", value: "Yes" },
      { label: "Output Function", value: "Scan to E-mail, PC, FTP" },
      { label: "Paper Input Capacity", value: "150 pages" },
      { label: "Paper Output Capacity", value: "100 pages" },
      {
        label: "Media Type",
        value: "Plain, Thick, Transparency, Cardstock, Label, Envelope, Thin",
      },
      {
        label: "Media Size",
        value:
          "A4, A5, A6, JIS B5, ISO B5, B6, Letter, Legal, Executive, Statement, Monarch envelope, DL envelope, C5 envelope, C6 envelope, NO.10 envelope, Japanese Postcard, Folio, Oficio, Big 16k, 32k, 16k, Big 32k, ZL, Yougata4, Postcard, Younaga3, Nagagata3, Yougata2",
      },
      { label: "Media Weight", value: "60~163g/m²" },
      {
        label: "Operating System Compatibility",
        value:
          "Microsoft Windows Server2003/Server2008/Server2012/XP/Vista/Win7/Win8/Win8.1/Win10 (32/64 Bit), Mac OS 10.7-10.13, Linux (Ubuntu 12.04&14.04&16.04&18.04)",
      },
      {
        label: "Dimensions (W×D×H)",
        value: "417x305x301mm(16.4''×12.0''×11.8'')",
      },
      { label: "Weight (with Cartridges)", value: "8.5Kg (18.7lb)" },
      { label: "Humidity Range", value: "20 - 80%" },
      { label: "Energy Efficiency", value: "ENERGY STAR® 2.0 certified" },
      { label: "Starter Toner Cartridge", value: "1600 pages" },
      { label: "Standard Replacement Consumable", value: "PD-219 (1600)" },
    ],
  },
];

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Meilleures ventes" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {BestSellersProduct.map((item) => (
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
            pdf={item.pdf}
            ficheTech={item.ficheTech}
            video={item.video}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
