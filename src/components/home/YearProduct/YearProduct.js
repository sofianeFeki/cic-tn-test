import React from "react";
import { Link } from "react-router-dom";
import { productOfTheYear } from "../../../assets/images";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div
        className="w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont drop-shadow-2xl

overflow-x-hidden group cursor-pointer"
      >
        <Image
          className="w-full h-full object-cover hidden md:inline-block"
          imgSrc={productOfTheYear}
        />
        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
          <h1 className="text-3xl font-semibold text-primeColor">
            Produit de L'année
          </h1>
          <p className="text-base font-normal text-primeColor max-w-[600px] mr-4">
            IMPRIMANTE PANTUM M6609N Imprimante Laser 3en1 à toner rechargeable
            PANTUM M6609N - Capacité d'impression Jusqu'à 1600 pages - Vitesse
            d’impression 22 ppm (A4) / 23 ppm (Lettre) Résolution (impression,
            copie et numérisation)
          </p>
          <ShopNow />
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;
