import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { cic1, cic2, cic3 } from '../../assets/images';

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="À propos" prevLocation={prevLocation} />
      <div className="pb-10 flex flex-col lg:flex-row">
        {/* Text Section */}
        <div className="lg:w-2/3 lg:pr-8">
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              À propos de "Chemical Ink Company of Bureautic" (CIC)
            </span>{' '}
            Bienvenue chez Chemical Ink Company of Bureautic (CIC), votre
            fournisseur de confiance en Tunisie spécialisé dans la distribution
            de produits destinés aux détaillants spécialisés ainsi qu'aux
            revendeurs B2B et B2C. Notre catalogue inclut une gamme complète
            d'accessoires d'imprimantes et de fournitures informatiques de haute
            qualité. Fondée en 1997, par Monsieur Amor Draoui, notre société
            s'est donnée pour mission de fournir des produits d'exception à des
            prix compétitifs, tout en offrant un service client incomparable.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Notre Histoire
            </span>{' '}
            Depuis notre création en 1997, Chemical Ink Company of Bureautic a
            su bâtir une réputation solide grâce à la fidélité de nos clients et
            à notre engagement indéfectible envers l'excellence. Implantée en
            Tunisie, notre société est rapidement devenue un acteur majeur dans
            le secteur des technologies de l'information.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Portefeuille de marques
            </span>{' '}
            Au fil des années, Chemical Ink Company of Bureautic (CIC) a forgé
            des partenariats solides avec des leaders mondiaux dans le domaine
            des technologies d'impression et des fournitures informatiques. Nous
            sommes le distributeur officiel de la marque "Ricoh", un partenariat
            qui témoigne de notre engagement envers la qualité et l'innovation.
            Nous avons élargi notre portefeuille en devenant le distributeur
            officiel de la marque "Pantum", renforçant ainsi notre offre avec
            des solutions d'impression performantes et économiques. Plus
            récemment, nous avons ajouté "Tally Dascom" à notre gamme de marques
            distribuées, offrant à nos clients des solutions d'impression
            robustes et fiables. De plus, en tant que partenaire PLATINIUM de la
            marque HP, nous continuons à offrir des produits de pointe à nos
            clients. Nous avons également eu l'honneur de représenter la marque
            "Samsung", consolidant ainsi notre position en tant que distributeur
            de confiance dans le secteur.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Nos Valeurs
            </span>{' '}
            Qualité Incomparable : Chaque produit est soigneusement sélectionné
            pour garantir une qualité supérieure et une durabilité optimale,
            afin de répondre aux exigences les plus élevées de nos clients.
            Service Client Dévoué : La satisfaction de nos clients est au cœur
            de notre mission. Notre équipe, toujours à l'écoute, est disponible
            pour vous offrir un support personnalisé et répondre à tous vos
            besoins. Innovation Constante : Nous nous engageons à rester à
            l'avant-garde de l'innovation, en vous proposant les dernières
            tendances et technologies du marché, pour que vous puissiez toujours
            bénéficier des meilleures solutions disponibles.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Pourquoi Choisir Chemical Ink Company of Bureautic (CIC) ?
            </span>{' '}
            Vaste Gamme de Produits : Explorez notre large sélection, comprenant
            des cartouches d'encre, des toners, une variété d'imprimantes, ainsi
            que des ordinateurs et PC portables. Notre catalogue répond à tous
            vos besoins en matière de technologie et de bureautique. Livraison
            Efficace : Avec une logistique optimisée et une forte présence en
            Tunisie, nous garantissons des délais de livraison rapides, où que
            vous soyez. Satisfaction Garantie : Votre satisfaction est notre
            priorité absolue. Tous nos produits sont couverts par une garantie
            de satisfaction, vous offrant ainsi la tranquillité d'esprit et la
            confiance que vous méritez.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Notre Équipe
            </span>{' '}
            Notre équipe, composée de professionnels passionnés et expérimentés,
            est entièrement dédiée à vous offrir une expérience d'achat
            inégalée. Convaincus que chaque client mérite une attention
            personnalisée, nous nous engageons à dépasser vos attentes à chaque
            étape, en vous fournissant un service exceptionnel et des solutions
            parfaitement adaptées à vos besoins.
          </h1>
          <h1 className="max-w-[720px] text-base text-lightText mb-2">
            <span className="text-primeColor font-semibold text-lg">
              Contactez-Nous
            </span>{' '}
            Pour toute question ou demande d'assistance, notre équipe est à
            votre disposition. N'hésitez pas à nous contacter par email à
            contact@cic-tn.com ou par téléphone au +216 71 835 865 / +216 71 834
            046.
          </h1>
          <Link to="/shop">
            <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0 mt-6 lg:mt-0 lg:ml-8 lg:w-1/3">
          <div className="space-y-6">
            {/* First Image with Address */}
            <div className="relative group">
              <img
                src={cic1}
                alt="Company Location 1"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                <span className="text-white font-semibold text-lg">
                  ZI : MEGRINE SAINT GOBAIN, 2 RUE REDAIEF 2033
                </span>
              </div>
            </div>

            {/* Second Image with Address */}
            <div className="relative group">
              <img
                src={cic3}
                alt="Company Location 2"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                <span className="text-white font-semibold text-lg">
                  20 Rue de Koweit Lafayette TUNIS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
