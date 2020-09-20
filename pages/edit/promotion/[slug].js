import Head from 'next/head';
import React, { useState, useRef, useEffect } from 'react';
import { FaTags, FaPen, FaSpinner } from 'react-icons/fa';
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
import ItemNameDescription from '../../../components/UI/Edit/ItemNameDescription/ItemNameDescription';
import Media from '../../../components/UI/Edit/Media/Media';
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
import { getPromotion } from '../../../store/actions/promotion/promotion';
import WithAuth from '../../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { user, promotion } = state;

  return {
    user,
    promotion,
  };
};

const EditPromotion = (props) => {
  const { promotion } = props;

  const childRef = useRef();

  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [id, setId] = useState('');

  const [promotionName, setPromotionName] = useState('');
  const [description, setDescription] = useState('');

  const [productsOnPromotion, setProductsOnPromotion] = useState([]);
  const [bundlesOnPromotion, setBundlesOnPromotion] = useState([]);
  const [productList, setProductList] = useState([]);
  const [bundleList, setBundleList] = useState([]);

  const [slug, setSlug] = useState('');

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);
  const [toDeleteImagesArray, setToDeleteImagesArray] = useState([]);
  const [isNewImagesUploaded, setIsNewImagesUploaded] = useState(false);

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

  useEffect(() => {
    if (imagesArray.length > 0 && toDeleteImagesArray.length > 0) {
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
    }
  }, [imagesArray, toDeleteImagesArray]);

  useEffect(() => {
    if (
      !_.isEmpty(promotion.data) &&
      promotion.fetched &&
      !promotion.loading &&
      !promotion.error
    ) {
      const imagesObj = [];
      imagesObj.push({
        data: promotion.data.media,
      });
      handleSetImagesArray(imagesObj);
      setToDeleteImagesArray(imagesObj);
      setId(promotion.data._id);
      setSlug(promotion.data.slug);
      setPromotionName(promotion.data.promotionName);
      setDescription(promotion.data.description);
      setSeoTitle(promotion.data.seo.title);
      setSeoSlug(promotion.data.seo.slug);
      setSeoDescription(promotion.data.seo.description);
      setCategories(
        categoriesArrayToString(promotion.data.organization.categories)
      );
      setCategoriesArray(
        editCategoriesToArray(promotion.data.organization.categories)
      );
      setTags(tagsArrayToString(promotion.data.organization.tags));
      setTagsArray(editTagsToArray(promotion.data.organization.tags));
    }
  }, [promotion]);

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
    console.log('data:', data);
    setProductList(data);
  };

  const fetchAllBundles = async () => {
    const res = await fetch(`${process.env.MAIN_API_ENDPOINT}/admin/bundles`, {
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

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'promotions',
      title: promotionName,
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

  const changeSlugFromPromotionName = () => {
    setSlug(slugifyString(promotionName));
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllBundles();
  }, []);

  useEffect(() => {
    changeSlugFromPromotionName(promotionName);
  }, [promotionName]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        const isSlugValidRes = await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [promotionName]);

  useEffect(() => {
    setCategoriesArray(categoriesToArray(categories));
  }, [categories]);

  useEffect(() => {
    setTagsArray(tagsToArray(tags));
  }, [tags]);

  useEffect(() => {
    setSeoSlug(slug);
  }, [slug]);

  // Input Handlers
  const onChangePromotionName = (e) => {
    if (promotionName.length <= 100) {
      setPromotionName(e.target.value);
    } else {
      setPromotionName(promotionName.substring(0, promotionName.length - 1));
    }
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
        setProductsOnPromotion((pOnPromotion) =>
          pOnPromotion.concat(element.id)
        );
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setProductsOnPromotion(
          removeElementFromArray(productsOnPromotion, element.id)
        );
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    } else if (element.classList[2] === 'bundle') {
      if (!bundlesOnPromotion.includes(element.id)) {
        setBundlesOnPromotion((bOnPromotion) =>
          bOnPromotion.concat(element.id)
        );
        element.style.backgroundColor = '#18840f';
        element.style.border = '1px solid #18840f';
        element.querySelector('.name').style.color = '#fff';
      } else {
        setBundlesOnPromotion(
          removeElementFromArray(bundlesOnPromotion, element.id)
        );
        element.style.backgroundColor = '#efefef';
        element.style.border = '1px solid #efefef';
        element.querySelector('.name').style.color = '#18840f';
      }
    }
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

  const editPromotion = async (promotion) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      }
    );
    const data = await response.json();
    return data;
  };

  const deletePromotionImage = async (imageId) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/delete/cover/${imageId}`,
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
      (!_.isEmpty(productsOnPromotion) || !_.isEmpty(bundlesOnPromotion)) &&
      isSlugValid &&
      slug.length > 0 &&
      promotionName.length > 0 &&
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

  const onSubmit = async (e) => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      let promotionInfo = {};
      if (isNewImagesUploaded) {
        const imagesArrayObj = [];
        imagesArray.map((image) => {
          imagesArrayObj.push(image.data._id);
        });
        promotionInfo = {
          isSlugValid,
          media: imagesArrayObj,
          promotionName,
          description,
          products: productsOnPromotion,
          bundles: bundlesOnPromotion,
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
      } else {
        promotionInfo = {
          isSlugValid,
          promotionName,
          description,
          products: productsOnPromotion,
          bundles: bundlesOnPromotion,
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
      }

      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await editPromotion(promotionInfo);
        if (isNewImagesUploaded) {
          toDeleteImagesArray.map(async (image) => {
            await deletePromotionImage(image.data._id);
          });
        }
        await Router.push('/promotions');
      } else {
        console.log('Slug is invalid');
        setIsSlugValid(false);
      }
    } else {
      setWarning(true);
    }
  };

  const handleSubmit = async () => {
    if (allFieldsFilled) {
      setImagesArrayLength(imagesArray.length);
      if (isNewImagesUploaded) {
        setLoading(true);
        await childRef.current.handleStartUploadingFiles();
      } else {
        onSubmit();
      }
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    productsOnPromotion,
    bundlesOnPromotion,
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
  ]);

  useEffect(() => {
    if (imagesArray.length > 0) {
      if (imagesArray[0].data !== null && imagesArray[0].data !== undefined) {
        if (imagesArray.length === imagesArrayLength) {
          onSubmit();
        }
      }
    }
  }, [imagesArray]);

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
  };

  const onChangeCategories = (e) => {
    setCategories(e.target.value.toLowerCase());
  };

  const onChangeTags = (e) => {
    setTags(e.target.value.toLowerCase());
  };

  return (
    <WithAuth>
      <Head>
        <title>Edit Promotion | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ItemNameDescription
              MainIcon={<FaTags className='mainIcon' />}
              PlusIcon={<FaPen className='plus' />}
              title='Edit Promotion'
              itemName='Promotion Name'
              itemNameInput={promotionName}
              onChangeItemName={onChangePromotionName}
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
          Edit Promotion
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

EditPromotion.getInitialProps = async ({ ctx }) => {
  const { asPath, store } = ctx;

  const slug = asPath.substring(16, asPath.length);

  store.dispatch(getPromotion(slug));
};

EditPromotion.propTypes = {
  promotion: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(EditPromotion);
