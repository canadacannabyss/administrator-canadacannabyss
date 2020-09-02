import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import { FaListUl, FaPlus, FaSpinner } from 'react-icons/fa';
import Router from 'next/router';
import _ from 'lodash';

import { slugifyString } from '../../utils/stringMethods';

import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import BannerNameDescription from '../../components/UI/Add/BannerNameDescription/BannerNameDescription';
import Media from '../../components/UI/Add/Media/Media';
import SEO from '../../components/UI/Add/SEO/SEO';

import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning
} from '../../styles/Pages/Add/Product';

const AddCategory = () => {
  const childRef = useRef();

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const [featured, setFeatured] = useState(false);

  const [slug, setSlug] = useState('');

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const handleSubmit = async () => {
    if (allFieldsFilled) {
      setImagesArrayLength(imagesArray.length);
      setLoading(true);
      await childRef.current.handleStartUploadingFiles();
    }
  };

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

  const changeSlugFromCategoryName = () => {
    setSlug(slugifyString(categoryName));
  };

  const disabledSubmitButton = () => {
    if (
      isSlugValid &&
      slug.length > 0 &&
      categoryName.length > 0 &&
      description.length > 0 &&
      typeof featured === 'boolean' &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0 &&
      !_.isEmpty(imagesArray)
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
    categoryName,
    featured,
    description,
    seoTitle,
    seoSlug,
    seoDescription
  ]);

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'banners',
      title: categoryName
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/set/global-variable`,
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
      `${process.env.MAIN_API_ENDPOINT}/admin/category/validation/slug/${slug}`,
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

  const publishCategory = async (product) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/publish`,
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
    changeSlugFromCategoryName(categoryName);
  }, [categoryName]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [categoryName]);

  const onSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const imagesArrayObj = [];
      imagesArray.map((image) => {
        imagesArrayObj.push(image.data._id);
      });
      const productInfo = {
        isSlugValid,
        media: imagesArrayObj,
        categoryName,
        description,
        featured,
        seo: {
          title: seoTitle,
          slug: seoSlug,
          description: seoDescription
        }
      };
      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await publishCategory(productInfo);
        Router.push('/categories');
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

  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
  };

  const handleCheckFeatured = () => {
    setFeatured(!featured);
  };

  return (
    <>
      <Head>
        <title>Add Category | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <BannerNameDescription
              MainIcon={<FaListUl className='mainIcon' />}
              PlusIcon={<FaPlus className='plus' />}
              title='Add Category'
              itemName='Category Name'
              onChangeItemName={onChangeCategoryName}
              description={description}
              onChangeDescription={onChangeDescription}
              handleCheckFeatured={handleCheckFeatured}
              featured={featured}
            />
            <Media
              multipleFiles={false}
              childRef={childRef}
              handleSetImagesArray={handleSetImagesArray}
              imagesArray={imagesArray}
              apiEndpoint={`${process.env.MAIN_API_ENDPOINT}/admin/category/publish/media`}
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
          <StickyDiv />
        </Wrapper>
        {warning && <Warning>Fill all fields before submit</Warning>}
        <SubmitButton type='button' onClick={handleSubmit}>
          Add Category
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

export default AddCategory;
