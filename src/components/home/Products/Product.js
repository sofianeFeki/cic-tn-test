import React, { useState } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import Image from '../../designLayouts/Image';
import Badge from './Badge';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/orebiSlice';
import { toast } from 'react-toastify';

const Product = (props) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const viewMode = useSelector((state) => state.orebi.viewMode);

  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const handleProductDetails = () => {
    navigate(`/product/${props.slug}`);
    console.log(props, '-----------------> slug');
  };

  const handleWishList = () => {
    toast.success('Product added to wish List');
    setWishList(wishList.push(props));
    //console.log(wishList);
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + ' ...';
    }
    return str;
  };

  const maxLength = 40;

  const containerClass =
    viewMode === 'grid'
      ? 'w-full relative group flex flex-col drop-shadow-xl'
      : 'w-full flex gap-4 p-4 border-b bg-white shadow-lg rounded-lg cursor-pointer';
  const imageClass =
    viewMode === 'grid'
      ? 'w-full h-full relative overflow-hidden'
      : 'w-1/3 h-full overflow-hidden rounded-lg';
  const detailsClass =
    viewMode === 'grid'
      ? 'w-full bg-white h-32 flex flex-col justify-between p-4'
      : 'w-2/3 flex flex-col justify-center';

  return (
    <div className={containerClass}>
      <div className={imageClass}>
        {props.loading ? (
          <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-48  bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={handleProductDetails} className="w-full h-full">
            <Image className="w-full h-full object-cover" imgSrc={props.img} />
          </div>
        )}
        {viewMode === 'grid' && !props.loading && (
          <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
              <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                Comparer
                <span>
                  <GiReturnArrow />
                </span>
              </li>
              <li
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: props._id,
                      name: props.productName,
                      quantity: 1,
                      image: props.img,
                      badge: props.badge,
                      colors: props.color,
                    })
                  )
                }
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Ajouter au panier{' '}
                <span>
                  <FaShoppingCart />
                </span>
              </li>
              <li
                onClick={handleProductDetails}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Voir les détails{' '}
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li>
              <li
                onClick={handleWishList}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Ajouter à la liste de souhaits{' '}
                <span>
                  <BsSuitHeartFill />
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
      {props.loading ? (
        <div class=" p-4  w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-4 bg-slate-100 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-4 bg-slate-100 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={detailsClass}>
          <div className="max-w-80 py-6 flex flex-col gap-1 px-1">
            <div className="flex items-center justify-between font-titleFont">
              <h2 className="text-lg text-primeColor font-bold">
                {props.productName &&
                  truncateString(props.productName, maxLength)}
              </h2>
            </div>
            {viewMode === 'list' && (
              <div>
                <p className="text-[#767676] text-[16px]">{props.des}</p>
              </div>
            )}
            <div>
              <p className="text-[#767676] text-[14px]">{props.color}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
