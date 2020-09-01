import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import { FaTags, FaPlus, FaSpinner } from 'react-icons/fa';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withAdminAuth } from '../../utils/withAdminAuth';

import { slugifyString } from '../../utils/stringMethods';
import { roundFloatNumber } from '../../utils/numberConverter';

import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ItemNameDescription from '../../components/UI/Add/ItemNameDescription/ItemNameDescription';
import Media from '../../components/UI/Add/Media/Media';
import SEO from '../../components/UI/Add/SEO/SEO';
import ProductsList from '../../components/UI/List/Add/ProductsList/ProductsList';
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

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const AddPromotion = (props) => {
  const { user } = props;

  const childRef = useRef();

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [promotionName, setPromotionName] = useState('');
  const [description, setDescription] = useState('');

  const [productsOnPromotion, setProductsOnPromotion] = useState([]);
  const [bundlesOnPromotion, setBundlesOnPromotion] = useState([]);
  const [productList, setProductList] = useState([]);
  const [bundleList, setBundleList] = useState([]);

  const [slug, setSlug] = useState('');

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);

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
    setSlug(slugifyString(promotionName));
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
      promotionName.length > 0 &&
      description.length > 0 &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0 &&
      categories.length > 0 &&
      tags.length > 0 &&
      !_.isEmpty(imagesArray) &&
      !_.isEmpty(tagsArray) &&
      !_.isEmpty(categoriesArray)
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
    promotionName,
    description,
    seoTitle,
    seoSlug,
    seoDescription,
    categories,
    categoriesArray,
    tags,
    tagsArray,
    imagesArray
  ]);

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'promotions',
      title: promotionName
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/set/global-variable`,
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
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/validation/slug/${slug}`,
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
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/publish`,
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

  const fetchAllProducts = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/products`, {
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

  const fetchAllBundles = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/bundles`, {
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

  useEffect(() => {
    fetchAllProducts();
    fetchAllBundles();
  }, []);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  useEffect(() => {
    changeSlugFromProductName(promotionName);
  }, [promotionName]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [promotionName]);

  const onSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const imagesArrayObj = [];
      imagesArray.map((image) => {
        imagesArrayObj.push(image.data._id);
      });
      const promotionInfo = {
        isSlugValid,
        userId: user.data._id,
        media: imagesArrayObj,
        promotionName,
        description,
        products: productsOnPromotion,
        bundles: bundlesOnPromotion,
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
        const res = await publishProduct(promotionInfo);
        Router.push('/promotions');
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    if (imagesArray.length > 0) {
      if (imagesArray[0].data !== null && imagesArray[0].data !== undefined) {
        if (imagesArray.length === imagesArrayLength) {
          onSubmit();
        }
      }
    }
  }, [imagesArray]);

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

  const onChangeProductName = (e) => {
    setPromotionName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
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
    if (element.classList[2] === 'product') {
      if (!productsOnPromotion.includes(element.id)) {
        setProductsOnPromotion((pOnPromotion) => pOnPromotion.concat(element.id));
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setProductsOnPromotion(removeElementFromArray(productsOnPromotion, element.id));
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    } else if (element.classList[2] === 'bundle') {
      if (!bundlesOnPromotion.includes(element.id)) {
        setBundlesOnPromotion((bOnPromotion) => bOnPromotion.concat(element.id));
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setBundlesOnPromotion(removeElementFromArray(bundlesOnPromotion, element.id));
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add Promotion | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ItemNameDescription
              MainIcon={<FaTags className='mainIcon' />}
              PlusIcon={<FaPlus className='plus' />}
              title='Add Promotion'
              itemName='Promotion Name'
              onChangeItemName={onChangeProductName}
              description={description}
              onChangeDescription={onChangeDescription}
            />
            <Media
              multipleFiles={false}
              childRef={childRef}
              handleSetImagesArray={handleSetImagesArray}
              imagesArray={imagesArray}
              apiEndpoint={`${process.env.MAIN_API_ENDPOINT}/admin/promotions/publish/media`}
            />
            <ProductsBundlesList
              title='Items on promotion'
              products={productList}
              bundles={bundleList}
              handleGetElement={handleGetElement}
              applyCouponOn='items'
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
          Add Promotion
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

export default withAdminAuth(connect(mapStateToProps)(AddPromotion));
