import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import { FaTags, FaPlus, FaSpinner, FaObjectUngroup } from 'react-icons/fa';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withAdminAuth } from '../../../utils/withAdminAuth';
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
import BannerNameDescription from '../../../components/UI/Add/BannerNameDescription/BannerNameDescription';
import SEO from '../../../components/UI/Add/SEO/SEO';
import Organization from '../../../components/UI/Add/Organization/Organization';
import PromotionsList from '../../../components/UI/List/Add/PromotionsList/PromotionsList';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

const EditBanner = (props) => {
  const { banner } = props;

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [id, setId] = useState('');

  const [promotionsOnBanner, setPromotionsOnBanner] = useState([]);
  const [promotionsList, setPromotionsList] = useState([]);
  const [slug, setSlug] = useState('');
  const [bannerName, setBannerName] = useState('');
  const [description, setDescription] = useState('');

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    disabledSubmitButton();
  }, [
    promotionsOnBanner,
    isSlugValid,
    slug,
    bannerName,
    description,
    seoTitle,
    seoSlug,
    seoDescription,
    categories,
    categoriesArray,
    tags,
    tagsArray,
  ]);

  useEffect(() => {
    if (!_.isEmpty(banner)) {
      setId(banner._id);
      setFeatured(banner.featured);
      setSlug(banner.slug);
      setBannerName(banner.bannerName);
      setDescription(banner.description);
      setSeoTitle(banner.seo.title);
      setSeoSlug(banner.seo.slug);
      setSeoDescription(banner.seo.description);
      setCategories(categoriesArrayToString(banner.organization.categories));
      setCategoriesArray(editCategoriesToArray(banner.organization.categories));
      setTags(tagsArrayToString(banner.organization.tags));
      setTagsArray(editTagsToArray(banner.organization.tags));
    }
  }, [banner]);

  const fetchAllPromotions = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/get/all`,
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
    setPromotionsList(data);
  };

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  const disabledSubmitButton = () => {
    if (
      !_.isEmpty(promotionsOnBanner) &&
      isSlugValid &&
      slug.length > 0 &&
      bannerName.length > 0 &&
      description.length > 0 &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0 &&
      categories.length > 0 &&
      tags.length > 0 &&
      !_.isEmpty(tagsArray) &&
      !_.isEmpty(categoriesArray)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'banners',
      title: bannerName,
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/set/global-variable`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRequest),
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
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        const isSlugValidRes = await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [bannerName]);

  useEffect(() => {
    if (slug.length > 0) {
      verifySlug();
    }
  }, [slug]);

  useEffect(() => {
    setCategoriesArray(categoriesToArray(categories));
  }, [categories]);

  useEffect(() => {
    setTagsArray(tagsToArray(tags));
  }, [tags]);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  const removeElementFromArray = (arr, element) => {
    const index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const editBanner = async (banner) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/banners/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banner),
      }
    );
    const data = await response.json();
    return data;
  };

  const handleCheckFeatured = () => {
    setFeatured(!featured);
  };

  const changeSlugFromBannerName = () => {
    setSlug(slugifyString(bannerName));
  };

  useEffect(() => {
    setGlobalVariable();
    changeSlugFromBannerName(bannerName);
  }, [bannerName]);

  const onChangeBannerDescription = (e) => {
    setDescription(e.target.getContent());
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

  const onChangeCategories = (e) => {
    setCategories(e.target.value.toLowerCase());
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
  };

  const handleGetElement = (el) => {
    const element = el;
    if (!promotionsOnBanner.includes(element.id)) {
      setPromotionsOnBanner((promotionsOnBanner) =>
        promotionsOnBanner.concat(element.id)
      );
      element.style.backgroundColor = '#18840f';
      element.style.border = '1px solid #18840f';
      element.querySelector('.name').style.color = '#fff';
    } else {
      setPromotionsOnBanner(
        removeElementFromArray(promotionsOnBanner, element.id)
      );
      element.style.backgroundColor = '#efefef';
      element.style.border = '1px solid #efefef';
      element.querySelector('.name').style.color = '#18840f';
    }
  };

  const onChangeBannerName = (e) => {
    if (bannerName.length <= 100) {
      setBannerName(e.target.value);
    } else {
      setBannerName(bannerName.substring(0, bannerName.length - 1));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    disabledSubmitButton();
    if (allFieldsFilled) {
      setLoading(true);
      const bannerInfo = {
        isSlugValid,
        bannerName,
        description,
        featured,
        promotions: promotionsOnBanner,
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
      console.log('bannerInfo:', bannerInfo);

      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await editBanner(bannerInfo);
        // setUploaded(res.uploaded);
        Router.push('/banners');
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
    }
  };

  return (
    <>
      <Head>
        <title>Add Banner | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <BannerNameDescription
              MainIcon={<FaObjectUngroup className='mainIcon' />}
              PlusIcon={<FaPlus className='plus' />}
              title='Add Banner'
              itemName='Banner Name'
              itemNameInput={bannerName}
              onChangeItemName={onChangeBannerName}
              description={description}
              onChangeDescription={onChangeBannerDescription}
              handleCheckFeatured={handleCheckFeatured}
              featured={featured}
            />
            <PromotionsList
              title='Promotions on banner'
              promotions={promotionsList}
              handleGetElement={handleGetElement}
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
          Update Banner
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

EditBanner.getInitialProps = async (props) => {
  const { asPath } = props.ctx;

  const slug = asPath.substring(13, asPath.length);

  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/promotions/banners/${slug}`,
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
  return {
    banner: data,
  };
};

EditBanner.propTypes = {
  banner: PropTypes.shape().isRequired,
  // user: PropTypes.shape().isRequired,
};

export default EditBanner;
