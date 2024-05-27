import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { bannerImg1, bannerImg2, bannerImg3 } from "../../assets/images";
import Image from "../designLayouts/Image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div>
    <div>
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    // beforeChange: (prev, next) => {
    //   setDotActive(next);
    // },
    // appendDots: (dots) => (
    //   <div
    //     style={{
    //       position: "absolute",
    //       top: "50%",
    //       left: "7%",
    //       transform: "translateY(-50%)",
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: (i) => (
    //   <div
    //     style={
    //       i === dotActive
    //         ? {
    //             width: "30px",
    //             color: "#262626",
    //             borderRight: "3px #262626 solid",
    //             padding: "8px 0",
    //             cursor: "pointer",
    //           }
    //         : {
    //             width: "30px",
    //             color: "transparent",
    //             borderRight: "3px white solid",
    //             padding: "8px 0",
    //             cursor: "pointer",
    //           }
    //     }
    //   >
    //     0{i + 1}
    //   </div>
    // ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          adaptiveHeight: true,
          // appendDots: (dots) => (
          //   <div
          //     style={{
          //       position: "absolute",
          //       top: "50%",
          //       left: "2%",
          //       transform: "translateY(-50%)",
          //     }}
          //   >
          //     <ul style={{ margin: "0px" }}> {dots} </ul>
          //   </div>
          // ),
          // customPaging: (i) => (
          //   <div
          //     style={
          //       i === dotActive
          //         ? {
          //             width: "25px",
          //             color: "#262626",
          //             borderRight: "3px #262626 solid",
          //             cursor: "pointer",
          //             fontSize: "12px",
          //           }
          //         : {
          //             width: "25px",
          //             color: "transparent",
          //             borderRight: "3px white solid",
          //             cursor: "pointer",
          //             fontSize: "12px",
          //           }
          //     }
          //   >
          //     0{i + 1}
          //   </div>
          // ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImg1,
      text: "",
      Subtext: "",
      buttonLink: "",
      buttonText: "",
    },
    {
      imgSrc: bannerImg2,
      text: "",
      Subtext: "",
      buttonLink: "",
      buttonText: "",
    },
    {
      imgSrc: bannerImg3,
      text: " ",
      Subtext: "",
      buttonLink: "",
      buttonText: "",
    },
    // Add more slides as needed
  ];

  return (
    <div className='w-full bg-white'>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
