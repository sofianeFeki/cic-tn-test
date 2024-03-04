import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  ricoh1,
  espson1,
  ricoh2,
  ricoh3,
  ricoh4,
  ricoh5,
  IMPRIMANTE_RICOH_P501,
  IMPRIMANTE_RICOH_SP4520DN,
  IMPRIMANTE_RICOH_SP3710DN,
  IMPRIMANTE_COULEUR_LASER_SPC840,
  IMPRIMANTE_RICOH_SP4510DN,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivalsProduct = [
  {
    _id: "ricoh1",
    img: ricoh1,
    productName: "IMPRIMANTE RICOH P501",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Ricoh P 501 - Imprimante - Noir et blanc - Recto-verso - LED - A4 - 1200 x 1200 ppp - jusqu'à 43 ppm - capacité : 600 feuilles - USB 2.0, Gigabit LAN, hôte USB 2.0",
    cat: "Imprimante",
    pdf: IMPRIMANTE_RICOH_P501,
    ficheTech: [
      {
        label: "Description du produit",
        value: "Ricoh P 501 - imprimante - Noir et blanc - LED",
      },
      {
        label: "Type d'imprimante",
        value: "Imprimante de groupe de travail - LED - Noir et blanc",
      },
      { label: "Poids", value: "19.3 kg" },
      { label: "Classe de taille de support", value: "A4" },
      { label: "Taille max. du support", value: "A4 (210 x 297 mm)" },
      {
        label: "Vitesse d'impression",
        value: "Jusqu'à 43 ppm - Noir & blanc - A4 (210 x 297 mm)",
      },
      { label: "Résolution maximum (N&B)", value: "1200 x 1200 ppp" },
      { label: "Impression recto-verso automatique", value: "Oui" },
      { label: "Interface", value: "USB 2.0, Gigabit LAN, hôte USB 2.0" },
      { label: "AirPrint activé", value: "Oui" },
      { label: "Processeur", value: "1.3 GHz" },
      { label: "RAM installée (maximum)", value: "2 Go (2 Go)" },
      { label: "Langage(s) d'impression", value: "PCL 5E, PCL 6" },
      {
        label: "Type de supports",
        value:
          "Enveloppes, papier uni, papier recyclé, papier à étiquettes, papier préimprimé, papier à en-tête, papier coloré",
      },
      { label: "Capacité totale", value: "600 feuilles" },
      {
        label: "Gestion des supports",
        value: "Bac d'entrée 500 feuilles, bac de dérivation 100 feuilles",
      },
      { label: "Réseaux", value: "Serveur d'impression" },
      {
        label: "Configuration requise",
        value:
          "SCO OpenServer, UNIX, IBM AIX, SunSoft Solaris, HP-UX, Red Hat Linux, Microsoft Windows Server 2008 R2, Microsoft Windows Server 2008, Microsoft Windows Server 2012, Microsoft Windows Server 2012 R2, Microsoft Windows Server 2016, Apple MacOS X 10.10 ou plus récent, Microsoft Windows 7 / 8.1 / 10",
      },
    ],
  },
  {
    _id: "ricoh2",
    img: ricoh2,
    productName: "IMPRIMANTE RICOH SP3710DN",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Grâce à son faible encombrement, la SP 3710DN s'intègre facilement dans les espaces de travail les plus restreints. Malgré son petit gabarit, cet appareil offre des caractéristiques et des fonctionnalités grandioses, telles que l'impression sécurisée et une vitesse d'impression pouvant atteindre 32 ppm.",
    cat: "Imprimante",
    pdf: IMPRIMANTE_RICOH_SP3710DN,
    ficheTech: [
      { label: "Temps de préchauffage (sec.)", value: "26" },
      { label: "Temps sortie de 1ère page (sec.)", value: "7,5" },
      { label: "Vitesse en continu (ppm)", value: "32" },
      { label: "Mémoire : en standard (Mo)", value: "128" },
      { label: "Poids (kg)", value: "13" },
      { label: "Dimensions (l x P x H) (mm)", value: "370 x 392 x 262" },
      {
        label: "Source d'alimentation électrique",
        value: "220 - 240 V, 50/60 Hz",
      },
      {
        label: "Classification laser",
        value: "Produit laser classe (IEC60825 - 1:2014)",
      },
      {
        label: "Langage d'impression : en standard",
        value: "PCL5e, PCL5e (Mac OS), PCL6 (Windows), PostScript 3",
      },
      { label: "Résolution : max. (dpi)", value: "1 200 x 1 200" },
      {
        label: "Interface : en standard",
        value: "Ethernet 10 base-T/100 base-TX, USB2.0 Type B",
      },
      {
        label: "Interface : en option",
        value: "Wireless LAN (IEEE 802.11 a/b/g/n/ac)",
      },
      {
        label: "Environnements Windows®",
        value: "Windows® 7/8.1/10, Windows® Server 2008/2012/2012R2/2016",
      },
      {
        label: "Environnements Mac OS",
        value: "Macintosh OS X v10.10 ou version ultérieure",
      },
      { label: "Autres environnements", value: "Environnement Linux" },
    ],
  },
  {
    _id: "ricoh3",
    img: ricoh3,
    productName: "IMPRIMANTE RICOH SP4520DN",
    color: "Blanc",
    badge: false,
    brand: "Ricoh",
    des: " Ricoh SP 4520DN 1200 x 1200 DPI A4 - Imprimantes Laser (LED, 1200 x 1200 DPI, A4, 600 Feuilles, 40 ppm, Impression Recto-Verso)SP 4520DN Imprimante laser monochrome A4, recto-verso, résolution 1200 x 1200 ppp, vitesse jusquà 40 ppm, écran tactile 4.3, capacité totale 600 feuilles, interfaces USB 2.0, Gigabit LAN, Wifi, dimensions (LxPxH) 37 x 39.2 x 42.7 cm, poids 15.5 kg",
    cat: "Imprimante",
    pdf: IMPRIMANTE_RICOH_SP4520DN,
    ficheTech: [
      { label: "Type de produit", value: "Imprimante laser monochrome" },
      { label: "Date de lancement", value: "22/11/2015" },
      {
        label: "Volume d'impression maximum mensuel (duty cycle)",
        value: "10000 pages / mois",
      },
      { label: "Cartouche de démarrage Noir livrée", value: "18000 pages" },
      { label: "Capacité mémoire RAM (Standard)", value: "512 Mo" },
      { label: "Capacité mémoire (Maximum)", value: "1536 Mo" },
      { label: "Disque dur", value: "Option / 320 Go" },
      {
        label: "Affichage",
        value: 'Écran tactile LCD (couleur) / 10,9 cm (4,3")',
      },
      {
        label: "Cycle d'utilisation mensuel conseillé (max.)",
        value: "3000 pages / mois",
      },
      {
        label: "Résolution d'impression monochrome (Maximum)",
        value: "1200 x 1200 ppp",
      },
      { label: "Vitesse d'impression 1ère page monochrome", value: "6 s" },
      { label: "Vitesse d'impression (Noir, A4)", value: "40 ppm" },
      { label: "Format de papier", value: "A4" },
      {
        label: "Nombre de bacs papier en entrée (Standard)",
        value: "2 bac(s)",
      },
      { label: "Nombre de bacs papier en entrée (Maximum)", value: "4 bac(s)" },
      { label: "Capacité papier en sortie (Standard)", value: "250 feuilles" },
      { label: "Capacité papier en sortie (Maximum)", value: "250 feuilles" },
      { label: "Sortie papier", value: "250 feuilles face dessous" },
      {
        label: "Grammage du support",
        value: "Bac Multiformat : 52 à 162 g/m², Bac standard : 52 à 162 g/m²",
      },
    ],
  },
  {
    _id: "ricoh4",
    img: ricoh4,
    productName: "IMPRIMANTE RICOH COULEUR LASER SPC840",
    color: "Blanc",
    badge: false,
    brand: "Ricoh",
    des: "Imprimante laser couleur Transformer la production légère en avantage de poids ,Imprime jusqu'à 45 ppm,Résolution maximum de 1200x1200 ppp ,Capacité de papier jusqu'à 4 700 pages,Utilisez l’écran tactile intuitif pour produire des impressions professionnelles à l’interne ",
    cat: "Imprimante",
    pdf: IMPRIMANTE_COULEUR_LASER_SPC840,
    ficheTech: [
      { label: "Temps de préchauffage (sec.)", value: "26" },
      { label: "Temps sortie de 1ère page (sec.)", value: "7,5" },
      { label: "Vitesse en continu (ppm)", value: "32" },
      { label: "Mémoire : en standard (Mo)", value: "128" },
      { label: "Poids (kg)", value: "13" },
      { label: "Dimensions (l x P x H) (mm)", value: "370 x 392 x 262" },
      {
        label: "Source d'alimentation électrique",
        value: "220 - 240 V, 50/60 Hz",
      },
      {
        label: "Classification laser",
        value: "Produit laser classe (IEC60825 - 1:2014)",
      },
      {
        label: "Langage d'impression : en standard",
        value: "PCL5e, PCL5e (Mac OS), PCL6 (Windows), PostScript 3",
      },
      { label: "Résolution : max. (dpi)", value: "1 200 x 1 200" },
      {
        label: "Interface : en standard",
        value: "Ethernet 10 base-T/100 base-TX, USB2.0 Type B",
      },
      {
        label: "Interface : en option",
        value: "Wireless LAN (IEEE 802.11 a/b/g/n/ac)",
      },
      {
        label: "Environnements Windows®",
        value: "Windows® 7/8.1/10, Windows® Server 2008/2012/2012R2/2016",
      },
      {
        label: "Environnements Mac OS",
        value: "Macintosh OS X v10.10 ou version ultérieure",
      },
      { label: "Autres environnements", value: "Environnement Linux" },
    ],
  },
  {
    _id: "ricoh5",
    img: ricoh5,
    productName: "IMPRIMANTE RICOH SP4510DN (407313)",
    color: "Blanc",
    badge: true,
    brand: "Ricoh",
    des: "Imprimante laser Noir et Blanc - Format A4 - Vitesse d'impression: 40 ppm - Préchauffage en 17 sec - Première page imprimée en 5 sec - Ecran LCD 4 lignes - Capacité papier standard 600 feuilles - Résolution d'impression: 1200 x 1200 dpi - Interface: USB 2.0 / Ethernet 10 base-T/100 base-TX - Recto/Verso - Garantie 1 an",
    cat: "Imprimante",
    pdf: IMPRIMANTE_RICOH_SP4510DN,
    ficheTech: [
      { label: "Marque", value: "RICOH" },
      { label: "Nom du produit", value: "RICOH SP 4510DN 407313" },
      { label: "Catégorie", value: "IMPRIMANTE" },
      {
        label: "Type d'imprimante",
        value: "Imprimante de groupe de travail - LED - monochrome",
      },
      { label: "Technologie de connectivité", value: "Filaire" },
      { label: "Interface", value: "USB 2.0, Gigabit LAN, hôte USB 2.0" },
      {
        label: "Vitesse d'impression",
        value: "Jusqu'à 40 ppm - Noir & blanc - A4 (210 x 297 mm)",
      },
      {
        label: "Durée de sortie de la première impression, Noir et blanc",
        value: "5 s",
      },
      {
        label: "Langage(s) d'impression",
        value: "PCL 5E, PostScript 3, PCL 6, PDF",
      },
      { label: "Support postscript", value: "Standard" },
      {
        label: "Polices incluses",
        value: "45 x PCL, 136 x PostScript 3, 13 x Intellifonts",
      },
      {
        label: "Fonctionnalités de l'imprimante",
        value: "Impression depuis un appareil mobile",
      },
      { label: "Périphériques intégrés", value: "Ecran LCD" },
      { label: "Impression recto-verso automatique", value: "Oui" },
      { label: "Résolution maximum (N&B)", value: "1200 x 1200 ppp" },
      { label: "Capacité totale", value: "600 feuilles" },
      { label: "Capacité des bacs de sortie", value: "250 feuilles" },
      { label: "Formats standard reconnus", value: "A4, A5, B5, A6, B6" },
      { label: "Classe de taille de support", value: "A4" },
      { label: "Grammage", value: "52 g/m² - 162 g/m²" },
      {
        label: "Entrées de média",
        value: "1 x automatique - A4 poids : 52 g/m² - 162 g/m²",
      },
      { label: "Taille max. du support", value: "A4 (210 x 297 mm)" },
      {
        label: "Type de supports",
        value:
          "Papier uni, papier recyclé, papier épais, papier fin, papier préimprimé",
      },
      { label: "Capacité max. du support", value: "1600 feuilles" },
    ],
  },
];

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="Dernières Nouveautés" />
      <Slider {...settings}>
        {NewArrivalsProduct.map((item) => (
          <div className="px-2">
            <div key={item._id} className="w-full drop-shadow-xl  ">
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
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
