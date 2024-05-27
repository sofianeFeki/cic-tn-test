import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";

const ProductDetails = () => {
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
    console.log(productInfo, "im info");
  }, [location, productInfo.ficheTech]);

  const tabs = [
    {
      id: "Fiche Technique",
      label: "Fiche Technique",
      content: productInfo.ficheTech ? (
        <div>
          <table className='table-auto w-full'>
            <tbody>
              {productInfo.ficheTech.map((row) => (
                <tr key={row.label} className='bg-gray-100'>
                  <td className='border px-4 py-2 font-semibold'>
                    {row.label}
                  </td>
                  <td className='border px-4 py-2'>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {productInfo.pdf ? (
            <div className='my-4 flex justify-end'>
              <a
                href={productInfo.pdf}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white'
              >
                <button className='inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont'>
                  <FaDownload className='h-5 w-5 mr-2 text-white' />
                  Download PDF
                </button>
              </a>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null,
    },

    {
      id: "Video",
      label: "Video",
      content: productInfo.video ? (
        <div>
          <video width='560' height='315' controls>
            <source src={productInfo.video} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null,
    },
    // Add more tabs as needed
  ];

  const availableTabs = tabs.filter((tab) => tab.content !== null);

  if (availableTabs.length > 0 && activeTab === "") {
    setActiveTab(availableTabs[0].id);
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className='w-full mx-auto border-b-[1px] border-b-gray-300'>
      <div className='max-w-container mx-auto px-4'>
        <div className='xl:-mt-10 -mt-7'>
          <Breadcrumbs title='' prevLocation={prevLocation} />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4'>
          <div className='h-full xl:col-span-2'>
            <img
              className='w-full h-full '
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className='h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center'>
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        {availableTabs.length > 0 && (
          <div>
            <div className=' space-x-4  pt-4'>
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4  focus:outline-none`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className='my-4'>
              {availableTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={activeTab === tab.id ? "" : "hidden"}
                >
                  {tab.content !== null ? (
                    <div>{tab.content}</div>
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
