import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import { FaPen, FaSpinner, FaListUl } from 'react-icons/fa';
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

import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import BannerNameDescription from '../../../components/UI/Edit/BannerNameDescription/BannerNameDescription';
import Media from '../../../components/UI/Edit/Media/Media';
import SEO from '../../../components/UI/Edit/SEO/SEO';

import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';

import { getCategory } from '../../../store/actions/category/category';

const mapStateToProps = (state) => {
  const { category } = state;

  return {
    category,
  };
};

const EditCategory = (props) => {
  const { category } = props;

  const childRef = useRef();

  const [loading, setLoading] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [enableCoverUploader, setEnableCoverUploader] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);

  const [categoryName, setCategoryName] = useState('');

  const [description, setDescription] = useState('');

  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [featured, setFeatured] = useState(false);

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);
  const [toDeleteImagesArray, setToDeleteImagesArray] = useState([]);
  const [isNewImagesUploaded, setIsNewImagesUploaded] = useState(false);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const handleSetImagesArray = (images) => {
    setImagesArray(images);
  };

  useEffect(() => {
    if (imagesArray.length !== toDeleteImagesArray.length) {
      setIsNewImagesUploaded(true);
    } else {
      imagesArray.map((image, index) => {
        if (image.data === undefined || image.data === null) {
          if (image.file.name !== toDeleteImagesArray[index].data.name) {
            setIsNewImagesUploaded(true);
          }
        }
      });
    }
  }, [imagesArray, toDeleteImagesArray]);

  useEffect(() => {
    if (!_.isEmpty(category.data)) {
      if (category.data.media !== null) {
        const imagesObj = [
          {
            data: category.data.media,
          },
        ];
        handleSetImagesArray(imagesObj);
        setToDeleteImagesArray(imagesObj);
      } else {
        handleSetImagesArray([]);
        setToDeleteImagesArray([]);
      }
      setCategoryId(category.data._id);
      setCategoryName(category.data.categoryName);
      setDescription(category.data.description);
      setSeoTitle(category.data.seo.title);
      setSeoSlug(category.data.seo.slug);
      setSeoDescription(category.data.seo.description);
      setFeatured(category.data.featured);
    }
  }, [category]);

  useEffect(() => {
    if (imagesArray.length > 0) {
      if (imagesArray[0].data !== null && imagesArray[0].data !== undefined) {
        if (imagesArray.length === imagesArrayLength) {
          onSubmit();
        }
      }
    }
  }, [imagesArray]);

  const handleCheckFeatured = () => {
    setFeatured(!featured);
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    isSlugValid,
    slug,
    categoryName,
    description,
    seoTitle,
    seoSlug,
    seoDescription,
    featured,
  ]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        const isSlugValidRes = await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [categoryName]);

  useEffect(() => {
    if (slug.length > 0) {
      verifySlug();
    }
  }, [slug]);

  useEffect(() => {
    updateSeoSlugFromTitle();
  }, [seoTitle]);

  useEffect(() => {
    changeSlugFromCategoryName(categoryName);
    handleEnableCoverUploader();
  }, [categoryName]);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  // Input Handlers
  const onChangeCategoryName = (e) => {
    if (categoryName.length <= 100) {
      setCategoryName(e.target.value);
    } else {
      setCategoryName(categoryName.substring(0, categoryName.length - 1));
    }
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
  };

  const updateSeoSlugFromTitle = () => {
    setSeoSlug(slugifyString(seoTitle));
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

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'categories',
      title: categoryName,
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/set/global-variable`,
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
      `${process.env.MAIN_API_ENDPOINT}/admin/category/validation/slug/${slug}`,
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

  const editCategory = async (category) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/update/${categoryId}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      }
    );
    const data = await response.json();
    return data;
  };

  const deleteCategoryMedia = async (imageId) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/delete/media/${imageId}`,
      {
        method: 'DELETE',
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

  const disabledSubmitButton = () => {
    if (
      isSlugValid &&
      slug.length > 0 &&
      categoryName.length > 0 &&
      description.length > 0 &&
      seoTitle.length > 0 &&
      seoSlug.length > 0 &&
      seoDescription.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  const changeSlugFromCategoryName = () => {
    setSlug(slugifyString(categoryName));
  };

  const handleEnableCoverUploader = () => {
    if (categoryName.length > 0) {
      setTimeout(() => {
        setEnableCoverUploader(true);
      }, 0);
    } else if (categoryName.length === 0 || categoryName === '') {
      setTimeout(() => {
        setEnableCoverUploader(false);
      }, 0);
    }
  };

  const handleSubmit = async () => {
    if (allFieldsFilled) {
      setImagesArrayLength(imagesArray.length);
      setLoading(true);
      if (isNewImagesUploaded) {
        await childRef.current.handleStartUploadingFiles();
      } else {
        onSubmit();
      }
    }
  };

  const onSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      let categoryInfo = {};
      if (isNewImagesUploaded) {
        let imagesArrayObj = [];
        imagesArray.map((image) => {
          imagesArrayObj.push(image.data._id);
        });
        categoryInfo = {
          id: category._id,
          isSlugValid,
          slug,
          media: imagesArrayObj,
          categoryName,
          description,
          featured,
          seo: {
            title: seoTitle,
            slug: seoSlug,
            description: seoDescription,
          },
        };
      } else {
        categoryInfo = {
          id: category._id,
          isSlugValid,
          slug,
          categoryName,
          description,
          featured,
          seo: {
            title: seoTitle,
            slug: seoSlug,
            description: seoDescription,
          },
        };
      }

      console.log(categoryInfo);

      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await editCategory(categoryInfo);
        // if (isNewImagesUploaded) {
        //   toDeleteImagesArray.map(async (image) => {
        //     await deleteCategoryMedia(image.data._id);
        //   });
        // }
        Router.push(`/`);
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    setGlobalVariable();
  }, [categoryName]);

  return (
    <>
      <Head>
        <title>Edit Category | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <BannerNameDescription
              MainIcon={<FaListUl className='mainIcon' />}
              PlusIcon={<FaPen className='plus' />}
              title='Edit Category'
              itemName='Category Name'
              itemNameInput={categoryName}
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
          Edit Category
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

EditCategory.propTypes = {
  category: PropTypes.shape().isRequired,
};

EditCategory.getInitialProps = async ({ ctx }) => {
  const { store, asPath } = ctx;

  const slug = asPath.substring(15, asPath.length);

  store.dispatch(getCategory(slug));
};

export default connect(mapStateToProps)(EditCategory);
