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
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

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
        <div className="px-2">
          <Product
            _id="100001"
            img={ricoh1}
            productName="IMPRIMANTE RICOH P501"
            badge={true}
            des="Ricoh P 501 - Imprimante - Noir et blanc - Recto-verso - LED - A4 - 1200 x 1200 ppp - jusqu'à 43 ppm - capacité : 600 feuilles - USB 2.0, Gigabit LAN, hôte USB 2.0"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100002"
            img={ricoh2}
            productName="IMPRIMANTE RICOH SP3710DN"
            badge={true}
            des="Grâce à son faible encombrement, la SP 3710DN s'intègre facilement dans les espaces de travail les plus restreints. Malgré son petit gabarit, cet appareil offre des caractéristiques et des fonctionnalités grandioses, telles que l'impression sécurisée et une vitesse d'impression pouvant atteindre 32 ppm. "
          />
        </div>
        <div className="px-2">
          <Product
            _id="100003"
            img={ricoh3}
            productName="cloth Basket"
            badge={true}
            des="Ricoh SP 4520DN 1200 x 1200 DPI A4 - Imprimantes Laser (LED, 1200 x 1200 DPI, A4, 600 Feuilles, 40 ppm, Impression Recto-Verso)SP 4520DN Imprimante laser monochrome A4, recto-verso, résolution 1200 x 1200 ppp, vitesse jusquà 40 ppm, écran tactile 4.3, capacité totale 600 feuilles, interfaces USB 2.0, Gigabit LAN, Wifi, dimensions (LxPxH) 37 x 39.2 x 42.7 cm, poids 15.5 kg"
          />
        </div>
        <div className="px-2">
          <Product
            _id="100004"
            img={ricoh4}
            productName="IMPRIMANTE RICOH COULEUR LASER SPC840"
            badge={false}
            des="Imprimante laser couleur Transformer la production légère en avantage de poids ,Imprime jusqu'à 45 ppm,Résolution maximum de 1200x1200 ppp ,Capacité de papier jusqu'à 4 700 pages,Utilisez l’écran tactile intuitif pour produire des impressions professionnelles à l’interne "
          />
        </div>
        <div className="px-2">
          <Product
            _id="100005"
            img={ricoh5}
            productName="Funny toys for babies"
            badge={false}
            des="Imprimante laser Noir et Blanc - Format A4 - Vitesse d'impression: 40 ppm - Préchauffage en 17 sec - Première page imprimée en 5 sec - Ecran LCD 4 lignes - Capacité papier standard 600 feuilles - Résolution d'impression: 1200 x 1200 dpi - Interface: USB 2.0 / Ethernet 10 base-T/100 base-TX - Recto/Verso - Garantie 1 an"
          />
        </div>
      </Slider>
    </div>
  );
};

export default NewArrivals;
