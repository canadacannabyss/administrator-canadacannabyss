import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaBoxes, FaPen, FaSpinner } from 'react-icons/fa';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withAdminAuth } from '../../../utils/withAdminAuth';

import { roundFloatNumber } from '../../../utils/numberConverter';
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
import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ItemNameDescription from '../../../components/UI/Edit/ItemNameDescription/ItemNameDescription';
import ProductsList from '../../../components/UI/List/Add/ProductsList/ProductsList';
import Pricing from '../../../components/UI/Edit/Pricing/Pricing';
import ExtraInfo from '../../../components/UI/Edit/ExtraInfo/ExtraInfo';
import Inventory from '../../../components/UI/Edit/Inventory/Inventory';
import Shipping from '../../../components/UI/Edit/Shipping/Shipping';
import Variants from '../../../components/UI/Edit/Variants/Variants';
import SEO from '../../../components/UI/Edit/SEO/SEO';
import Organization from '../../../components/UI/Edit/Organization/Organization';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';
import { getBundle } from '../../../store/actions/bundle/bundle';

const mapStateToProps = (state) => {
  const { bundle, user } = state;

  return {
    bundle,
    user,
  };
};

const EditBundle = (props) => {
  const { user, bundle } = props;

  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);

  const [id, setId] = useState('');

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);

  const [productOnBundle, setProductOnBundle] = useState([]);

  const [slug, setSlug] = useState('');

  const [bundleName, setBundleName] = useState('');
  const [description, setDescription] = useState('');

  const [price, setPrice] = useState(0);
  const [compareTo, setCompareTo] = useState(0);
  const [taxableBundle, setTaxableBundle] = useState(false);

  const [extraInfo, setExtraInfo] = useState([]);

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [allowPurchaseOutOfStock, setAllowPurchaseOutOfStock] = useState(false);

  const [physicalProduct, setPhysicalProduct] = useState(false);
  const [weightAmount, setWeightAmount] = useState(0.0);
  const [weightUnit, setWeightUnit] = useState('kg');

  const [variants, setVariants] = useState([]);

  const [productList, setProductList] = useState([]);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  useEffect(() => {
    if (
      !_.isEmpty(bundle.data) &&
      bundle.fetched &&
      !bundle.loading &&
      !bundle.error
    ) {
      setId(bundle.data._id);
      setSlug(bundle.data.slug);
      setBundleName(bundle.data.bundleName);
      setPrice(bundle.data.prices.price);
      setCompareTo(bundle.data.prices.compareTo);
      setTaxableBundle(bundle.data.taxableBundle);
      setDescription(bundle.data.description);
      setSku(bundle.data.inventory.sku);
      setBarcode(bundle.data.inventory.barcode);
      setQuantity(bundle.data.inventory.quantity);
      setAllowPurchaseOutOfStock(bundle.data.inventory.allowPurchaseOutOfStock);
      setPhysicalProduct(bundle.data.shipping.physicalProduct);
      setWeightAmount(bundle.data.shipping.weight.amount);
      setWeightUnit(bundle.data.shipping.weight.unit);
      setVariants(bundle.data.variants);
      setSeoTitle(bundle.data.seo.title);
      setSeoSlug(bundle.data.seo.slug);
      setSeoDescription(bundle.data.seo.description);
      setCategories(
        categoriesArrayToString(bundle.data.organization.categories)
      );
      setCategoriesArray(
        editCategoriesToArray(bundle.data.organization.categories)
      );
      setTags(tagsArrayToString(bundle.data.organization.tags));
      setTagsArray(editTagsToArray(bundle.data.organization.tags));
      setExtraInfo(bundle.data.extraInfo);
      handleGetExtraInfo(bundle.data.extraInfo);
    }
  }, [bundle]);

  const disabledSubmitButton = () => {
    if (
      !_.isEmpty(productOnBundle) &&
      isSlugValid &&
      slug.length > 0 &&
      bundleName.length > 0 &&
      price > 0 &&
      compareTo > 0 &&
      (taxableBundle || !taxableBundle) &&
      description.length > 0 &&
      sku.length > 0 &&
      barcode.length > 0 &&
      quantity > 0 &&
      weightAmount > 0 &&
      weightUnit.length > 0 &&
      (weightUnit === 'kg' || weightUnit === 'lbs') &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0 &&
      categories.length > 0 &&
      tags.length > 0 &&
      !_.isEmpty(extraInfo) &&
      !_.isEmpty(categoriesArray) &&
      !_.isEmpty(tagsArray)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    isSlugValid,
    slug,
    bundleName,
    price,
    compareTo,
    taxableBundle,
    description,
    extraInfo,
    sku,
    barcode,
    quantity,
    weightAmount,
    weightUnit,
    variants,
    seoTitle,
    seoSlug,
    seoDescription,
    categories,
    categoriesArray,
    tags,
    tagsArray,
  ]);

  const fetchAllProducts = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/products`, {
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

  useEffect(() => {
    changeSlugFromBundleName(bundleName);
  }, [bundleName]);

  useEffect(() => {
    if (slug.length > 0) {
      verifySlug();
    }
  }, [slug]);

  const verifySlug = async () => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/bundles/validation/slug/${slug}`,
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
    const data = await response.json();
    return data;
  };

  const removeElementFromArray = (arr, element) => {
    const index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const handleGetElement = (el) => {
    const element = el;
    if (!productOnBundle.includes(element.id)) {
      setProductOnBundle((pOnBundle) => pOnBundle.concat(element.id));
      element.style.backgroundColor = '#18840f';
      element.style.border = '1px solid #18840f';
      element.querySelector('.name').style.color = '#fff';
    } else {
      setProductOnBundle(removeElementFromArray(productOnBundle, element.id));
      element.style.backgroundColor = '#efefef';
      element.style.border = '1px solid #efefef';
      element.querySelector('.name').style.color = '#18840f';
    }
  };

  const handleGetExtraInfo = (extraInfoArray) => {
    setExtraInfo(extraInfoArray);
  };

  const changeSlugFromBundleName = () => {
    setSlug(slugifyString(bundleName));
  };

  const handleCheckTaxableProduct = () => {
    setTaxableBundle(!taxableBundle);
  };

  const handleCheckAllowPurchaseOutOfStock = () => {
    setAllowPurchaseOutOfStock(!allowPurchaseOutOfStock);
  };
  const handleCheckPhysicalProduct = () => {
    setPhysicalProduct(!physicalProduct);
  };

  const onChangeDescription = async (e) => {
    setDescription(e.target.getContent());
  };

  const onChangeBundleName = (e) => {
    setBundleName(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(parseFloat(e.target.value).toFixed(2));
  };

  const onChangeCompareTo = (e) => {
    setCompareTo(parseFloat(e.target.value).toFixed(2));
  };

  const onChangeSku = (e) => {
    setSku(e.target.value);
  };

  const onChangeBarcode = (e) => {
    setBarcode(e.target.value);
  };

  const onChangeQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleWeightAmount = (e) => {
    setWeightAmount(parseFloat(e.target.value));
  };

  const handleWeightUnit = (e) => {
    setWeightUnit(e.target.value);
  };

  const onChangeSeoTitle = (e) => {
    setSeoTitle(e.target.value);
  };

  const onChangeSeoSlug = (e) => {
    setSeoSlug(slugifyString(e.target.value.toLowerCase()));
  };

  const onChangeSeoDescription = (e) => {
    setSeoDescription(e.target.value);
  };

  const onChangeCategories = (e) => {
    setCategories(e.target.value.toLowerCase());
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
  };

  const editBundle = async (bundle) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/bundles/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bundle),
      }
    );
    const data = await response.json();
    return data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    disabledSubmitButton();
    if (allFieldsFilled) {
      setLoading(true);
      console.log('productOnBundle:', productOnBundle);
      const bundleInfo = {
        products: productOnBundle,
        isSlugValid,
        variants,
        bundleName,
        prices: {
          price,
          compareTo,
        },
        taxableBundle,
        description,
        extraInfo,
        inventory: {
          sku,
          barcode,
          quantity,
          allowPurchaseOutOfStock,
        },
        shipping: {
          physicalProduct,
          weight: {
            unit: weightUnit,
            amount: weightAmount,
          },
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
      console.log('bundleInfo:', bundleInfo);

      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await editBundle(bundleInfo);
        // setUploaded(res.uploaded);
        Router.push('/bundles');
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
    }
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

  return (
    <>
      <Head>
        <title>Edit Bundle | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ItemNameDescription
              MainIcon={<FaBoxes className='mainIcon' />}
              PlusIcon={<FaPen className='plus' />}
              title='Edit Bundle'
              itemName='Bundle Name'
              itemNameInput={bundleName}
              onChangeItemName={onChangeBundleName}
              description={description}
              onChangeDescription={onChangeDescription}
            />
            <ProductsList
              title='Products on bundles'
              products={productList}
              handleGetElement={handleGetElement}
            />
            <Pricing
              price={price}
              compareTo={compareTo}
              onChangePrice={onChangePrice}
              onChangeCompareTo={onChangeCompareTo}
              taxableProduct={taxableBundle}
              handleCheckTaxableProduct={handleCheckTaxableProduct}
            />
            {extraInfo.length > 0 && (
              <ExtraInfo
                handleGetExtraInfo={handleGetExtraInfo}
                editable
                extraInfo={extraInfo}
              />
            )}
            <Inventory
              handleSku={onChangeSku}
              handleBarcode={onChangeBarcode}
              handleQuantity={onChangeQuantity}
              allowPurchaseOutOfStock={allowPurchaseOutOfStock}
              sku={sku}
              barcode={barcode}
              quantity={quantity}
              handleCheckAllowPurchaseOutOfStock={
                handleCheckAllowPurchaseOutOfStock
              }
            />
            <Shipping
              handleWeightAmount={handleWeightAmount}
              handleWeightUnit={handleWeightUnit}
              physicalProduct={physicalProduct}
              weightAmount={weightAmount}
              weightUnit={weightUnit}
              handleCheckPhysicalProduct={handleCheckPhysicalProduct}
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
        <SubmitButton type='button' onClick={onSubmit}>
          Update Bundle
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

EditBundle.getInitialProps = async ({ ctx }) => {
  const { asPath, store } = ctx;

  const slug = asPath.substring(13, asPath.length);

  store.dispatch(getBundle(slug));
};

EditBundle.propTypes = {
  bundle: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(EditBundle);
