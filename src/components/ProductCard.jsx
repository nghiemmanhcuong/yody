import {Link} from 'react-router-dom';
import {IoMdHeartEmpty,IoMdHeart} from 'react-icons/io';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import numberWithComas from '../utils/numberWithComas.js';
import {likeProduct, unlikeProduct} from '../store/actions/authActions.js';
import userApi from '../api/userApi.js';
import activeHeartProduct from '../utils/activeHeartProduct.js';

const imgUrl = process.env.REACT_APP_IMG_URL;

const ProductCard = (props) => {
    const dispatch = useDispatch();
    const {user, likeProducts} = useSelector((state) => state.authReducer);
    const [mainImg, setMainImg] = useState(props.data.image_main);
    const product = props.data ? props.data : {};

    useEffect(() => {
        setMainImg(props.data.image_main);
    }, [product]);

    // handle likeProducts
    const handleLikeProduct = async () => {
        const index = likeProducts.findIndex((item) => item._id == product._id);
        if (index == -1) {
            const chooseProduct = {
                _id: product._id,
                name: product.name,
                image: product.image_main,
                warehouse: product.warehouse,
                price: product.price,
                slug: product.slug,
            };
            dispatch(likeProduct(chooseProduct));
            await userApi.likeProduct({email: user.email, product: chooseProduct});
        } else {
            dispatch(unlikeProduct(product._id));
            await userApi.unlikeProduct({email: user.email, productId: product._id});
        }
    };

    return (
        <div className='product-card' style={{height: !props.isSubImage ? 'unset' : 405 + 'px'}}>
            <div className='product-card_img'>
                <Link to={`/san-pham/${product.slug}`}>
                    <img src={`${imgUrl + mainImg}`} alt='product image' />
                </Link>
                <div className='product-card_add-cart'>
                    <Link to={`/san-pham/${product.slug}`}>
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='34'
                        height='34'
                        viewBox='0 0 34 34'
                        fill='none'
                        className='mdl-js'
                    >
                        <path
                            d='M0 34C0 15.2223 15.2223 0 34 0V34H0Z'
                            fill='black'
                            fillOpacity='0.6'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M16.8917 19.803C16.6234 19.803 16.406 19.5855 16.406 19.3173L16.406 16.2092C16.406 14.2244 18.015 12.6154 19.9998 12.6154C21.9846 12.6154 23.5936 14.2244 23.5936 16.2092L23.5936 19.3173C23.5936 19.5855 23.3761 19.803 23.1079 19.803C22.8397 19.803 22.6223 19.5855 22.6223 19.3173L22.6223 16.2092C22.6223 14.7608 21.4481 13.5867 19.9998 13.5867C18.5514 13.5867 17.3773 14.7608 17.3773 16.2092L17.3773 19.3173C17.3773 19.5855 17.1599 19.803 16.8917 19.803Z'
                            fill='white'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M16.6107 16.4998H23.3891C24.0399 16.4997 24.5752 16.4997 25.0017 16.5551C25.4491 16.6132 25.8419 16.739 26.1673 17.0385C26.4928 17.3379 26.6508 17.7189 26.7458 18.16C26.8364 18.5804 26.8809 19.1138 26.9349 19.7623L27.3396 24.6182C27.3701 24.9846 27.3971 25.3084 27.3828 25.5705C27.3674 25.8541 27.301 26.1452 27.0779 26.3877C26.8548 26.6302 26.5702 26.7205 26.2888 26.7595C26.0288 26.7955 25.7039 26.7955 25.3362 26.7954H14.6636C14.2959 26.7955 13.971 26.7955 13.711 26.7595C13.4296 26.7205 13.145 26.6302 12.9219 26.3877C12.6988 26.1452 12.6324 25.8541 12.617 25.5705C12.6027 25.3084 12.6297 24.9846 12.6602 24.6182L13.0649 19.7623C13.1189 19.1138 13.1634 18.5804 13.254 18.16C13.349 17.7189 13.507 17.3379 13.8325 17.0385C14.1579 16.739 14.5507 16.6132 14.9981 16.5551C15.4246 16.4997 15.9599 16.4997 16.6107 16.4998ZM15.1232 17.5183C14.7804 17.5628 14.6108 17.6422 14.4902 17.7532C14.3695 17.8642 14.2763 18.0267 14.2035 18.3646C14.1277 18.7161 14.0876 19.1863 14.0301 19.8757L13.6308 24.667C13.5968 25.075 13.5766 25.3308 13.5868 25.5176C13.596 25.6864 13.6274 25.7201 13.6361 25.7294L13.6367 25.7301L13.6372 25.7307C13.6458 25.7401 13.6768 25.7742 13.8443 25.7974C14.0296 25.823 14.2861 25.8241 14.6956 25.8241H25.3042C25.7137 25.8241 25.9702 25.823 26.1555 25.7974C26.323 25.7742 26.354 25.7401 26.3626 25.7307L26.3631 25.7301L26.3637 25.7294C26.3724 25.7201 26.4038 25.6864 26.413 25.5176C26.4232 25.3307 26.403 25.075 26.369 24.667L25.9697 19.8757C25.9122 19.1863 25.8721 18.7161 25.7963 18.3646C25.7235 18.0267 25.6303 17.8642 25.5097 17.7532C25.389 17.6422 25.2194 17.5628 24.8766 17.5183C24.52 17.472 24.0481 17.471 23.3563 17.471H16.6435C15.9517 17.471 15.4798 17.472 15.1232 17.5183Z'
                            fill='white'
                        />
                        <mask
                            id='path-4-outside-1_10203_8538'
                            maskUnits='userSpaceOnUse'
                            x='20.9999'
                            y='19.9995'
                            width='9'
                            height='9'
                            fill='black'
                        >
                            <rect fill='white' x='20.9999' y='19.9995' width='9' height='9' />
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M27.1666 25.3328C27.6269 25.3328 27.9999 24.9598 27.9999 24.4995C27.9999 24.0393 27.6269 23.6662 27.1666 23.6662H26.3333V22.8328C26.3333 22.3726 25.9602 21.9995 25.4999 21.9995C25.0397 21.9995 24.6666 22.3726 24.6666 22.8328V23.6662H23.8333C23.373 23.6662 22.9999 24.0393 22.9999 24.4995C22.9999 24.9598 23.373 25.3328 23.8333 25.3328H24.6666V26.1662C24.6666 26.6264 25.0397 26.9995 25.4999 26.9995C25.9602 26.9995 26.3333 26.6264 26.3333 26.1662V25.3328H27.1666Z'
                            />
                        </mask>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M27.1666 25.3328C27.6269 25.3328 27.9999 24.9598 27.9999 24.4995C27.9999 24.0393 27.6269 23.6662 27.1666 23.6662H26.3333V22.8328C26.3333 22.3726 25.9602 21.9995 25.4999 21.9995C25.0397 21.9995 24.6666 22.3726 24.6666 22.8328V23.6662H23.8333C23.373 23.6662 22.9999 24.0393 22.9999 24.4995C22.9999 24.9598 23.373 25.3328 23.8333 25.3328H24.6666V26.1662C24.6666 26.6264 25.0397 26.9995 25.4999 26.9995C25.9602 26.9995 26.3333 26.6264 26.3333 26.1662V25.3328H27.1666Z'
                            fill='white'
                        />
                        <path
                            d='M26.3333 23.6662H24.3333V25.6662H26.3333V23.6662ZM24.6666 23.6662V25.6662H26.6666V23.6662H24.6666ZM24.6666 25.3328H26.6666V23.3328H24.6666V25.3328ZM26.3333 25.3328V23.3328H24.3333V25.3328H26.3333ZM25.9999 24.4995C25.9999 23.8552 26.5223 23.3328 27.1666 23.3328V27.3328C28.7314 27.3328 29.9999 26.0643 29.9999 24.4995H25.9999ZM27.1666 25.6662C26.5223 25.6662 25.9999 25.1438 25.9999 24.4995H29.9999C29.9999 22.9347 28.7314 21.6662 27.1666 21.6662V25.6662ZM26.3333 25.6662H27.1666V21.6662H26.3333V25.6662ZM24.3333 22.8328V23.6662H28.3333V22.8328H24.3333ZM25.4999 23.9995C24.8556 23.9995 24.3333 23.4772 24.3333 22.8328H28.3333C28.3333 21.268 27.0648 19.9995 25.4999 19.9995V23.9995ZM26.6666 22.8328C26.6666 23.4772 26.1443 23.9995 25.4999 23.9995V19.9995C23.9351 19.9995 22.6666 21.268 22.6666 22.8328H26.6666ZM26.6666 23.6662V22.8328H22.6666V23.6662H26.6666ZM23.8333 25.6662H24.6666V21.6662H23.8333V25.6662ZM24.9999 24.4995C24.9999 25.1438 24.4776 25.6662 23.8333 25.6662V21.6662C22.2685 21.6662 20.9999 22.9347 20.9999 24.4995H24.9999ZM23.8333 23.3328C24.4776 23.3328 24.9999 23.8552 24.9999 24.4995H20.9999C20.9999 26.0643 22.2685 27.3328 23.8333 27.3328V23.3328ZM24.6666 23.3328H23.8333V27.3328H24.6666V23.3328ZM26.6666 26.1662V25.3328H22.6666V26.1662H26.6666ZM25.4999 24.9995C26.1443 24.9995 26.6666 25.5219 26.6666 26.1662H22.6666C22.6666 27.731 23.9351 28.9995 25.4999 28.9995V24.9995ZM24.3333 26.1662C24.3333 25.5219 24.8556 24.9995 25.4999 24.9995V28.9995C27.0648 28.9995 28.3333 27.731 28.3333 26.1662H24.3333ZM24.3333 25.3328V26.1662H28.3333V25.3328H24.3333ZM27.1666 23.3328H26.3333V27.3328H27.1666V23.3328Z'
                            fill='#5A595A'
                            mask='url(#path-4-outside-1_10203_8538)'
                        />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='product-card_info'>
                <p>
                    <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
                </p>
                <div className='product-card_info_price'>
                    <span className='product-card_info_price_real'>
                        {numberWithComas(product.price.real_price)}đ
                    </span>
                    {product.price.sale_price != 0 && (
                        <span className='product-card_info_price_sale'>
                            {numberWithComas(product.price.sale_price)}đ
                        </span>
                    )}
                </div>
            </div>
            {product.price.sale_number != 0 && (
                <div className='product-card_sale'>
                    <span>-{product.price.sale_number}%</span>
                </div>
            )}
            {props.isSubImage && (
                <div className='product-card_images'>
                    <div className='product-card_images_wrapper'>
                        {product.images.map((image, index) => (
                            <div
                                className='product-card_images_item'
                                key={index}
                                onClick={() => setMainImg(image)}
                            >
                                <img src={imgUrl + image} alt='product sub image' />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {user && (
                <div
                    className={`product-card_heart ${
                        activeHeartProduct(likeProducts, product._id) ? 'active' : ''
                    }`}
                    onClick={handleLikeProduct}
                >
                    {activeHeartProduct(likeProducts, product._id) ? <IoMdHeart size={26} /> : <IoMdHeartEmpty size={26} />}
                </div>
            )}
        </div>
    );
};

ProductCard.propTypes = {
    data: PropTypes.object.isRequired,
    isSubImage: PropTypes.bool,
};

export default ProductCard;
