import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaMapMarkedAlt,
  FaFax,
  FaEnvelope,
} from 'react-icons/fa';
import FooterListTitle from './FooterListTitle';
import { paymentCard } from '../../../assets/images';
import Image from '../../designLayouts/Image';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState('');
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === '') {
      setErrMsg('Please provide an Email !');
    } else if (!emailValidation(emailInfo)) {
      setErrMsg('Please give a valid Email!');
    } else {
      setSubscription(true);
      setErrMsg('');
      setEmailInfo('');
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3]  absolute py-14">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-8 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title="INFORMATIONS DE CONTACT" />
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-2">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                <div className="flex items-center gap-2">
                  {' '}
                  <FaMapMarkedAlt />
                  20 Rue de Koweit Lafayette TUNIS -
                </div>
                ZI : MEGRINE SAINT GOBAIN, 2 RUE REDAIEF 2033
              </li>

              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                <div className="flex items-center gap-2">
                  <FaFax />
                  71 835 865 - 71 834 046 - Fax : 71 831 418
                </div>
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  contact@cic-tn.com
                </div>
              </li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  sav@cic-tn.com
                </div>
              </li>
            </ul>
            <ul className="flex items-center gap-2">
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaYoutube />
                </li>
              </a>

              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <FooterListTitle title="À propos" />
          <ul className="flex flex-col gap-3">
            <Link to={'/about'}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                À propos de "Chemical Ink Company of Bureautic" (CIC)
              </li>
            </Link>
            <Link to={'about'}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Notre Équipe{' '}
              </li>
            </Link>
            <Link to={'contact'}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Contactez-Nous
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <FooterListTitle title="Boutique" />
          <ul className="flex flex-col gap-2">
            <Link to={'category/Imprimante'}>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Imprimante
              </li>
            </Link>
            <Link to={'category/Photocopieur'}>
              {' '}
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Photocopieur
              </li>
            </Link>
            <Link to={'category/Consommable'}>
              {' '}
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Consommable
              </li>
            </Link>
          </ul>
        </div>

        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.214687049167!2d10.181641100000002!3d36.8133751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3463338b5493%3A0xa78dc0b154a7c664!2z2LTYsdmD2Kkg2KfZhNit2KjYsSDZhNmE2YXZg9in2KrYqA!5e0!3m2!1sen!2stn!4v1716806537177!5m2!1sen!2stn"
            width="400"
            height="270"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
