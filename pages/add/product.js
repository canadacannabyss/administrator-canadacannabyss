import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import { FaBox, FaPlus, FaSpinner } from 'react-icons/fa';
import Router from 'next/router';
import _ from 'lodash';
import { withAdminAuth } from '../../utils/withAdminAuth';

import { slugifyString } from '../../utils/stringMethods';
import { roundFloatNumber } from '../../utils/numberConverter';

import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ItemNameDescription from '../../components/UI/Add/ItemNameDescription/ItemNameDescription';
import Pricing from '../../components/UI/Add/Pricing/Pricing';
import Media from '../../components/UI/Add/Media/Media';
import ExtraInfo from '../../components/UI/Add/ExtraInfo/ExtraInfo';
import Inventory from '../../components/UI/Add/Inventory/Inventory';
import Shipping from '../../components/UI/Add/Shipping/Shipping';
import Variants from '../../components/UI/Add/Variants/Variants';
import SEO from '../../components/UI/Add/SEO/SEO';
import Organization from '../../components/UI/Add/Organization/Organization';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning
} from '../../styles/Pages/Add/Product';

const AddProduct = () => {
  const childRef = useRef();

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const [slug, setSlug] = useState('');

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);

  const [price, setPrice] = useState(0);
  const [compareTo, setCompareTo] = useState(0);
  const [taxableProduct, setTaxableProduct] = useState(false);

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [allowPurchaseOutOfStock, setAllowPurchaseOutOfStock] = useState(false);

  const [physicalProduct, setPhysicalProduct] = useState(false);
  const [weightAmount, setWeightAmount] = useState(0.0);
  const [weightUnit, setWeightUnit] = useState('kg');

  const [extraInfo, setExtraInfo] = useState([]);

  const [variants, setVariants] = useState([]);
  const [variantsOptionNames, setVariantsOptionNames] = useState([]);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  const handleSetImagesArray = (images) => {
    setImagesArray(images);
  };

  const handleCheckTaxableProduct = () => {
    setTaxableProduct(!taxableProduct);
  };

  const handleSku = (e) => {
    setSku(e.target.value);
  };

  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleCheckAllowPurchaseOutOfStock = () => {
    setAllowPurchaseOutOfStock(!allowPurchaseOutOfStock);
  };

  const handleCheckPhysicalProduct = () => {
    setPhysicalProduct(!physicalProduct);
  };

  const handleWeightAmount = (e) => {
    setWeightAmount(roundFloatNumber(e.target.value));
  };

  const handleWeightUnit = (e) => {
    setWeightUnit(e.target.value);
  };

  const handleGetVariants = (variantsArray) => {
    setVariants(variantsArray);
  };

  const handleGetVariantsOptionNames = (variantsOptionNamesArray) => {
    setVariantsOptionNames(variantsOptionNamesArray);
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

  const changeSlugFromProductName = () => {
    setSlug(slugifyString(productName));
  };

  const handleSubmit = async () => {
    if (allFieldsFilled) {
      setImagesArrayLength(imagesArray.length);
      setLoading(true);
      await childRef.current.handleStartUploadingFiles();
    }
  };

  const disabledSubmitButton = () => {
    if (
      isSlugValid &&
      slug.length > 0 &&
      productName.length > 0 &&
      price > 0 &&
      !isNaN(compareTo) &&
      (taxableProduct || !taxableProduct) &&
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
      !_.isEmpty(tagsArray) &&
      !_.isEmpty(extraInfo)
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
    productName,
    price,
    compareTo,
    taxableProduct,
    description,
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
    extraInfo
  ]);

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'products',
      title: productName
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/set/global-variable`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyRequest)
      }
    );
    return response;
  };

  const verifySlug = async () => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/validation/slug/${slug}`,
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
    const data = await response.json();
    return data;
  };

  const publishProduct = async (product) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/publish`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  useEffect(() => {
    changeSlugFromProductName(productName);
  }, [productName, price]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [productName]);

  const onSubmit = async () => {
    disabledSubmitButton();
    const imagesArrayObj = [];
    imagesArray.map((image) => {
      imagesArrayObj.push(image.data._id);
    });
    if (allFieldsFilled) {
      const productInfo = {
        isSlugValid,
        media: imagesArrayObj,
        variants: {
          variantsOptionNames,
          values: variants
        },
        productName,
        prices: {
          price,
          compareTo
        },
        taxableProduct,
        description,
        extraInfo,
        inventory: {
          sku,
          barcode,
          quantity,
          allowPurchaseOutOfStock
        },
        shipping: {
          physicalProduct,
          weight: {
            unit: weightUnit,
            amount: weightAmount
          }
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
      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await publishProduct(productInfo);
        Router.push('/products');
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
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

  useEffect(() => {
    if (imagesArray.length > 0) {
      if (imagesArray[0].data !== null && imagesArray[0].data !== undefined) {
        if (imagesArray.length === imagesArrayLength) {
          onSubmit();
        }
      }
    }
  }, [imagesArray]);

  const onChangeCategories = (e) => {
    setCategories(e.target.value);
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
  };

  const handleGetExtraInfo = (extraInfoArray) => {
    setExtraInfo(extraInfoArray);
  };

  const onChangeProductName = (e) => {
    setProductName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
  };

  const onChangePrice = (e) => {
    setPrice(roundFloatNumber(e.target.value));
  };

  const onChangeCompareTo = (e) => {
    setCompareTo(roundFloatNumber(e.target.value));
  };

  return (
    <>
      <Head>
        <title>Add Product | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ItemNameDescription
              MainIcon={<FaBox className='mainIcon' />}
              PlusIcon={<FaPlus className='plus' />}
              title='Add Product'
              itemName='Product Name'
              onChangeItemName={onChangeProductName}
              description={description}
              onChangeDescription={onChangeDescription}
            />
            <Media
              childRef={childRef}
              handleSetImagesArray={handleSetImagesArray}
              imagesArray={imagesArray}
              multipleFiles
              apiEndpoint={`${process.env.MAIN_API_ENDPOINT}/admin/products/publish/media`}
            />
            <Pricing
              price={price}
              compareTo={compareTo}
              onChangePrice={onChangePrice}
              onChangeCompareTo={onChangeCompareTo}
              taxableProduct={taxableProduct}
              handleCheckTaxableProduct={handleCheckTaxableProduct}
            />
            <ExtraInfo handleGetExtraInfo={handleGetExtraInfo} />
            <Inventory
              handleSku={handleSku}
              handleBarcode={handleBarcode}
              handleQuantity={handleQuantity}
              allowPurchaseOutOfStock={allowPurchaseOutOfStock}
              handleCheckAllowPurchaseOutOfStock={
                handleCheckAllowPurchaseOutOfStock
              }
            />
            <Shipping
              handleWeightAmount={handleWeightAmount}
              handleWeightUnit={handleWeightUnit}
              physicalProduct={physicalProduct}
              handleCheckPhysicalProduct={handleCheckPhysicalProduct}
            />
            <Variants
              handleGetVariants={handleGetVariants}
              handleGetVariantsOptionNames={handleGetVariantsOptionNames}
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
          Add Product
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

export default withAdminAuth(AddProduct);
