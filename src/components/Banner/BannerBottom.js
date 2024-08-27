import React from 'react';
import { CgAdd } from 'react-icons/cg';
import { CgRedo } from 'react-icons/cg';
import {
  ClockIcon,
  MegaphoneIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const BannerBottom = () => {
  return (
    <div className="w-full  py-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Support Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="text-4xl text-yellow-500">
            <ClockIcon className="block h-12 w-12" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Support Gratuit
            </h3>
            <p className="text-sm text-gray-600">Support 7 jours/7</p>
          </div>
        </div>

        {/* Livraison Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="text-4xl text-yellow-500">
            <TruckIcon className="block h-12 w-14" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Livraison Gratuite
            </h3>
            <p className="text-sm text-gray-600">
              Livraison Gratuite, Partout en Tunisie
            </p>
          </div>
        </div>

        {/* Large Choix Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="text-4xl text-yellow-500">
            <MegaphoneIcon className="block h-12 w-12" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Large Choix</h3>
            <p className="text-sm text-gray-600">
              Les Meilleurs Prix du Marché
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
