import React from "react";
import { noImage } from "../../assets/images";

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
