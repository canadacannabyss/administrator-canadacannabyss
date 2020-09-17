import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { FaPercent, FaPlus, FaSpinner } from 'react-icons/fa';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  categoriesArrayToString,
  tagsArrayToString
} from '../../utils/arrayMethods';
import {
  slugifyString,
  categoriesToArray,
  tagsToArray,
  editCategoriesToArray,
  editTagsToArray
} from '../../utils/stringMethods';
import { roundFloatNumber } from '../../utils/numberConverter';

import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ResellerSelector from '../../components/UI/Add/ResellerSelector/ResellerSelector';
import CouponNameDescription from '../../components/UI/Add/CouponNameDescription/CouponNameDescription';
import SEO from '../../components/UI/Add/SEO/SEO';
import Organization from '../../components/UI/Add/Organization/Organization';
import ProductsBundlesList from '../../components/UI/List/Add/Coupon/ProductsBundlesList';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning
} from '../../styles/Pages/Add/Product';
import { getResellers } from '../../store/actions/resellers/resellers';

const mapStateToProps = (state) => {
  const { resellers } = state;

  return {
    resellers
  };
};

const AddCoupon = (props) => {
  const { resellers } = props;

  const [couponCode, setCouponCode] = useState('');

  const [reseller, setReseller] = useState('');

  const [slug, setSlug] = useState('');

  const [discountAmount, setdiscountAmount] = useState('');
  const [discountType, setDiscountType] = useState('percent');

  const [applyCouponOn, setApplyCouponOn] = useState('items');

  const [availableAt, setAvailableAt] = useState('canada');

  const [productsOnCoupon, setProductsOnCoupon] = useState([]);
  const [bundlesOnCoupon, setBundlesOnCoupon] = useState([]);
  const [productList, setProductList] = useState([]);
  const [bundleList, setBundleList] = useState([]);

  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  // const locationList = new Location();

  // useEffect(() => {
  //   const provinces = locationList.mapThroughtCanadaProvinces();
  //   setProvincesList(provinces);
  // }, []);

  const fetchAllProducts = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/products/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setProductList(data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  const changeSlugFromCouponCode = () => {
    setSlug(slugifyString(couponCode));
  };

  useEffect(() => {
    changeSlugFromCouponCode(couponCode);
  }, [couponCode]);

  const fetchValidateCouponName = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/coupons/validate/couponName/${couponCode}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (applyCouponOn === 'items') {
      setProductList([]);
      setBundleList([]);
      setProductList([]);
      setBundleList([]);
      const fetchAllProductsBundlesCategoriesOnChange = async () => {
        const resProducts = await fetch(
          `${process.env.MAIN_API_ENDPOINT}/products/`,
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const resBundles = await fetch(
          `${process.env.MAIN_API_ENDPOINT}/bundles/`,
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const dataProducts = await resProducts.json();
        const dataBundles = await resBundles.json();
        setProductList(dataProducts);
        setBundleList(dataBundles);
      };
      fetchAllProductsBundlesCategoriesOnChange();
    }
    if (applyCouponOn === 'products') {
      setProductList([]);
      setBundleList([]);
      setProductList([]);
      setBundleList([]);
      const fetchAllProductsOnChange = async () => {
        const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/products/`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setProductList(data);
      };
      fetchAllProductsOnChange();
    }
    if (applyCouponOn === 'bundles') {
      setProductList([]);
      setBundleList([]);
      setProductList([]);
      setBundleList([]);
      const fetchAllBundlesOnChange = async () => {
        const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/bundles/`, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        setBundleList(data);
      };
      fetchAllBundlesOnChange();
    }
  }, [applyCouponOn]);

  const removeElementFromArray = (arr, element) => {
    const index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const handleGetElement = (el) => {
    const element = el;
    if (element.classList[2] === 'product') {
      if (!productsOnCoupon.includes(element.id)) {
        setProductsOnCoupon((pOnPromotion) => pOnPromotion.concat(element.id));
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setProductsOnCoupon(removeElementFromArray(productsOnCoupon, element.id));
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    } else if (element.classList[2] === 'bundle') {
      if (!bundlesOnCoupon.includes(element.id)) {
        setBundlesOnCoupon((bOnPromotion) => bOnPromotion.concat(element.id));
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setBundlesOnCoupon(removeElementFromArray(bundlesOnCoupon, element.id));
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    }
  };

  const categoriesToArray = () => {
    const tempCategories = categories.split(',');
    tempCategories.map((category, i) => {
      tempCategories[i] = tempCategories[i].trim();
    });
    setCategoriesArray(tempCategories);
  };

  useEffect(() => {
    categoriesToArray();
  }, [categories]);

  const tagsToArray = () => {
    const tempTags = tags.split(',');
    tempTags.map((tag, i) => {
      tempTags[i] = tempTags[i].trim();
    });
    setTagsArray(tempTags);
  };

  useEffect(() => {
    tagsToArray();
  }, [tags]);

  const onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
  };

  const onChangeSeoTitle = (e) => {
    setSeoTitle(e.target.value);
  };

  const onChangeSeoSlug = (e) => {
    setSeoSlug(slugifyString(e.target.value));
  };

  const onChangeSeoDescription = (e) => {
    setSeoDescription(e.target.value);
  };

  const handleCheckFeatured = () => {
    setFeatured(!featured);
  };

  const handleCheckFreeShipping = () => {
    setFreeShipping(!freeShipping);
  };

  const onChangeCounponCode = (e) => {
    setCouponCode(e.target.value);
  };

  const onChangeDiscountAmount = (e) => {
    setdiscountAmount(roundFloatNumber(e.target.value));
  };

  const onChangeDiscountType = (e) => {
    setDiscountType(e.target.value);
  };

  const onChangeAvailableAt = (e) => {
    setAvailableAt(e.target.value);
  };

  const onChangeApplyOn = (e) => {
    setApplyCouponOn(e.target.value);
  };

  const handleCouponDescription = (e) => {
    setDescription(e.target.getContent());
  };

  const onChangeQuantity = (e) => {
    setQuantity(roundFloatNumber(e.target.value));
  };

  const disabledSubmitButton = () => {
    if (
      quantity > 0 &&
      couponCode.length > 0 &&
      description.length > 0 &&
      discountAmount > 0 &&
      (discountType === 'percent' || discountType === 'cash') &&
      (applyCouponOn === 'items' ||
        applyCouponOn === 'products' ||
        applyCouponOn === 'bundles') &&
      availableAt === 'canada' &&
      (!_.isEmpty(productsOnCoupon) || !_.isEmpty(bundlesOnCoupon)) &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0 &&
      categories.length > 0 &&
      tags.length > 0 &&
      reseller.length > 0 &&
      !_.isEmpty(tagsArray) &&
      !_.isEmpty(categoriesArray) &&
      (featured || !featured) &&
      (freeShipping || !freeShipping)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    couponCode,
    description,
    discountAmount,
    discountType,
    applyCouponOn,
    availableAt,
    productsOnCoupon,
    bundlesOnCoupon,
    productList,
    bundleList,
    featured,
    quantity,
    freeShipping,
    seoTitle,
    seoSlug,
    seoDescription,
    categories,
    categoriesArray,
    tags,
    reseller
  ]);

  const fetchNewCoupon = async (couponObj) => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/coupons/create`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(couponObj)
      }
    );
    const data = await res.json();
    return data;
  };

  const handleSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const fetchedValidCouponNameRes = await fetchValidateCouponName();
      console.log('fetchedValidCouponNameRes:', fetchedValidCouponNameRes);
      if (fetchedValidCouponNameRes) {
        const couponObj = {
          userId: reseller,
          couponName: couponCode,
          description,
          featured,
          freeShipping,
          availableAt,
          quantity: parseInt(quantity),
          products: productsOnCoupon,
          bundles: bundlesOnCoupon,
          discount: {
            type: discountType,
            amount: discountAmount
          },
          seo: {
            title: seoTitle,
            slug: seoSlug,
            description: seoDescription
          },
          organization: {
            categories: categoriesArray,
            tags: tagsArray
          }
        };
        const fetchedCoupon = await fetchNewCoupon(couponObj);
        if (fetchedCoupon.ok === true) {
          Router.push('/coupons');
        }
      }
    } else {
      setWarning(true);
    }
  };

  const onChangeSelectReseller = (e) => {
    setReseller(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Add Coupon | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <CouponNameDescription
              MainIcon={<FaPercent className='mainIcon' />}
              PlusIcon={<FaPlus className='plus' />}
              title='Add Coupon'
              itemName='Coupon Code'
              onChangeItemName={onChangeCounponCode}
              onChangeDiscountAmount={onChangeDiscountAmount}
              onChangeDiscountType={onChangeDiscountType}
              onChangeAvailableAt={onChangeAvailableAt}
              onChangeApplyOn={onChangeApplyOn}
              onChangeQuantity={onChangeQuantity}
              description={description}
              onChangeDescription={handleCouponDescription}
              handleCheckFeatured={handleCheckFeatured}
              handleCheckFreeShipping={handleCheckFreeShipping}
              featured={featured}
              freeShipping={freeShipping}
            />
            <ResellerSelector
              resellers={resellers}
              onChangeSelectReseller={onChangeSelectReseller}
            />
            <ProductsBundlesList
              title='Items on coupon'
              products={productList.results}
              bundles={bundleList.results}
              handleGetElement={handleGetElement}
              applyCouponOn={applyCouponOn}
            />
            <SEO
              onChangeSeoTitle={onChangeSeoTitle}
              onChangeSeoSlug={onChangeSeoSlug}
              onChangeSeoDescription={onChangeSeoDescription}
              title={seoTitle}
              slug={seoSlug}
              description={seoDescription}
            />
          </MainGrid>
          <StickyDiv>
            <Organization
              onChangeCategories={onChangeCategories}
              onChangeTags={onChangeTags}
              categories={categories}
              tags={tags}
            />
          </StickyDiv>
        </Wrapper>
        {warning && <Warning>Fill all fields before submit</Warning>}
        <SubmitButton type='button' onClick={handleSubmit}>
          Add Coupon
        </SubmitButton>
      </BackgroundAdd>
      {loading && (
        <Loading>
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        </Loading>
      )}
    </>
  );
};

AddCoupon.getInitialProps = async ({ ctx }) => {
  const { store } = ctx;

  store.dispatch(getResellers());
};

export default connect(mapStateToProps)(AddCoupon);
