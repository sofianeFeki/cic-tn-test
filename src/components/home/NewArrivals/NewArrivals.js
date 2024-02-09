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
            img={espson1}
            productName="IMPRIMANTE EPSON L3251 3EN1 A4 WIFI"
            price="250.00"
            color="Black"
            badge={true}
            des="Imprimante à Réservoir Intégré EPSON ECOTANK L3251 3En1 Couleur Wifi - Fonction: Impression, Copie, Numérisation - Technologie d'impression: Jet d'encre (tête d'impression Epson Micro Piezo) - Vitesse d'impression (N&B/Couleur): 33 pages/min , 15 pages/min - Qualité d'impression noir: 5.760 x 1.440 DPI (ppp) - Qualité d'impression couleur: 5.760 x 1.440 DPI (ppp) - Vitesse de Numérisation: 11 s noir (200 DPI) / 28 s couleur (200 DPI) - Impression recto/verso: Manuel - Format Papier: A4 - Interface: USB, Wi-Fi, Wi-Fi Direct - Capacité Papier: 100 feuilles - Dimensions: 375‎ x 347 x 179 mm - Poids: 3.9 kg - Garantie: 1 an    "
          />
        </div>
        <div className="px-2">
          <Product
            _id="100003"
            img={newArrThree}
            productName="cloth Basket"
            price="80.00"
            color="Mixed"
            badge={true}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100004"
            img={newArrFour}
            productName="Funny toys for babies"
            price="60.00"
            color="Mixed"
            badge={false}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
        <div className="px-2">
          <Product
            _id="100005"
            img={newArrTwo}
            productName="Funny toys for babies"
            price="60.00"
            color="Mixed"
            badge={false}
            des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
          />
        </div>
      </Slider>
    </div>
  );
};

export default NewArrivals;
