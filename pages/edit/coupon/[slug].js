import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { FaPercent, FaPlus, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Router from 'next/router';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  categoriesArrayToString,
  tagsArrayToString,
} from '../../../utils/arrayMethods';
import {
  slugifyString,
  categoriesToArray,
  tagsToArray,
  editCategoriesToArray,
  editTagsToArray,
} from '../../../utils/stringMethods';

import { roundFloatNumber } from '../../../utils/numberConverter';

import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import CouponNameDescription from '../../../components/UI/Edit/CouponNameDescription/CouponNameDescription';
import SEO from '../../../components/UI/Edit/SEO/SEO';
import Organization from '../../../components/UI/Edit/Organization/Organization';
import ProductsBundlesList from '../../../components/UI/List/Add/Coupon/ProductsBundlesList';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';
import { getCoupon } from '../../../store/actions/coupon/coupon';
import WithAuth from '../../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { coupon } = state;

  return {
    coupon,
  };
};

const EditCoupon = (props) => {
  const { coupon } = props;

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const [couponId, setCouponId] = useState('');

  const [couponCode, setCouponCode] = useState('');

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

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(coupon.data)) {
      setCouponId(coupon.data._id);
      setCouponCode(coupon.data.couponName);
      setDiscountType(coupon.data.discount.type);
      setdiscountAmount(coupon.data.discount.amount);
      setDescription(coupon.data.description);
      setFeatured(coupon.data.featured);
      setFreeShipping(coupon.data.freeShipping);
      setAvailableAt(coupon.data.availableAt);
      setQuantity(coupon.data.quantity);
      setCategories(
        categoriesArrayToString(coupon.data.organization.categories)
      );
      setCategoriesArray(
        editCategoriesToArray(coupon.data.organization.categories)
      );
      setTags(tagsArrayToString(coupon.data.organization.tags));
      setTagsArray(editTagsToArray(coupon.data.organization.tags));
      setSeoTitle(coupon.data.seo.title);
      setSeoSlug(coupon.data.seo.slug);
      setSeoDescription(coupon.data.seo.description);
    }
  }, [coupon]);

  const fetchAllProducts = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/products/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setProductList(data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchValidateCouponName = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/coupons/validate/couponName/${couponCode}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
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
              'Content-Type': 'application/json',
            },
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
              'Content-Type': 'application/json',
            },
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
            'Content-Type': 'application/json',
          },
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
            'Content-Type': 'application/json',
          },
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
        setProductsOnCoupon(
          removeElementFromArray(productsOnCoupon, element.id)
        );
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
    setdiscountAmount(e.target.value);
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
    setQuantity(e.target.value);
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

  const changeSlugFromCouponCode = () => {
    setSlug(slugifyString(couponCode));
  };

  useEffect(() => {
    setCategoriesArray(categoriesToArray(categories));
  }, [categories]);

  useEffect(() => {
    setTagsArray(tagsToArray(tags));
  }, [tags]);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  useEffect(() => {
    changeSlugFromCouponCode();
  }, [couponCode]);

  const onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
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
  ]);

  const fetchEditCoupon = async (couponObj) => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/coupons/edit`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponObj),
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
          id: couponId,
          couponName: couponCode,
          description,
          featured,
          freeShipping,
          availableAt,
          quantity: parseInt(quantity, 10),
          products: productsOnCoupon,
          bundles: bundlesOnCoupon,
          discount: {
            type: discountType,
            amount: discountAmount,
          },
          seo: {
            title: seoTitle,
            slug: seoSlug,
            description: seoDescription,
          },
          organization: {
            categories: categoriesArray,
            tags: tagsArray,
          },
        };
        const fetchedCoupon = await fetchEditCoupon(couponObj);
        if (fetchedCoupon.ok === true) {
          Router.push('/coupons');
        }
      }
    } else {
      setWarning(true);
    }
  };

  return (
    <WithAuth>
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
              itemNameInput={couponCode}
              onChangeItemName={onChangeCounponCode}
              onChangeDiscountAmount={onChangeDiscountAmount}
              discountAmountInput={discountAmount}
              onChangeDiscountType={onChangeDiscountType}
              discountTypeInput={discountType}
              onChangeAvailableAt={onChangeAvailableAt}
              availableAtInput={availableAt}
              onChangeApplyOn={onChangeApplyOn}
              applyCouponOnInput={applyCouponOn}
              onChangeQuantity={onChangeQuantity}
              quantityInput={quantity}
              description={description}
              onChangeDescription={handleCouponDescription}
              handleCheckFeatured={handleCheckFeatured}
              handleCheckFreeShipping={handleCheckFreeShipping}
              featured={featured}
              freeShipping={freeShipping}
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
          Update Coupon
        </SubmitButton>
      </BackgroundAdd>
      {loading && (
        <Loading>
          <LoadingSpinner>
            <FaSpinner />
          </LoadingSpinner>
        </Loading>
      )}
    </WithAuth>
  );
};

EditCoupon.propTypes = {
  coupon: PropTypes.shape().isRequired,
};

EditCoupon.getInitialProps = async ({ ctx }) => {
  const { store, asPath } = ctx;

  const slug = asPath.substring(13, asPath.length);

  store.dispatch(getCoupon(slug));
};

export default connect(mapStateToProps)(EditCoupon);
