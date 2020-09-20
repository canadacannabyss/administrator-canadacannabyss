import _ from 'lodash';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { FaBox, FaPen, FaSpinner } from 'react-icons/fa';
import { connect } from 'react-redux';
import slugify from 'slugify';
import PropTypes from 'prop-types';
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
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';
import { getProduct } from '../../../store/actions/product/product';
import Media from '../../../components/UI/Edit/Media/Media';
import ItemNameDescription from '../../../components/UI/Edit/ItemNameDescription/ItemNameDescription';
import Pricing from '../../../components/UI/Edit/Pricing/Pricing';
import ExtraInfo from '../../../components/UI/Edit/ExtraInfo/ExtraInfo';
import Inventory from '../../../components/UI/Edit/Inventory/Inventory';
import Organization from '../../../components/UI/Edit/Organization/Organization';
import SEO from '../../../components/UI/Edit/SEO/SEO';
import Shipping from '../../../components/UI/Edit/Shipping/Shipping';
import Variants from '../../../components/UI/Edit/Variants/Variants';
import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import WithAuth from '../../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { product } = state;

  return {
    product,
  };
};

const EditProduct = (props) => {
  const { product } = props;

  const childRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isSlugValid, setIsSlugValid] = useState(true);

  const [id, setId] = useState();

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesArrayLength, setImagesArrayLength] = useState(0);
  const [toDeleteImagesArray, setToDeleteImagesArray] = useState([]);
  const [isNewImagesUploaded, setIsNewImagesUploaded] = useState(false);

  const [slug, setSlug] = useState('');

  const [price, setPrice] = useState(0);
  const [compareTo, setCompareTo] = useState(0);
  const [taxableProduct, setTaxableProduct] = useState(false);

  const [extraInfo, setExtraInfo] = useState([]);

  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [allowPurchaseOutOfStock, setAllowPurchaseOutOfStock] = useState(false);

  const [physicalProduct, setPhysicalProduct] = useState(false);
  const [weightAmount, setWeightAmount] = useState(0.0);
  const [weightUnit, setWeightUnit] = useState('kg');

  const [variants, setVariants] = useState([]);
  const [variantsOptionNames, setVariantsOptionNames] = useState([]);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const [categories, setCategories] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [tags, setTags] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  const setGlobalVariable = async () => {
    const bodyRequest = {
      type: 'products',
      title: productName,
    };
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/set/global-variable`,
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
      `${process.env.MAIN_API_ENDPOINT}/admin/products/validation/slug/${slug}`,
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

  const deleteProductImage = async (imageId) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/delete/cover/${imageId}`,
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
      productName.length > 0 &&
      price > 0 &&
      compareTo > 0 &&
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
      !_.isEmpty(categoriesArray) &&
      !_.isEmpty(tagsArray)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  const editProduct = async (product) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/products/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  };

  const onSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      let productInfo = {};
      if (isNewImagesUploaded) {
        const imagesArrayObj = [];
        imagesArray.map((image) => {
          imagesArrayObj.push(image.data._id);
        });
        productInfo = {
          isSlugValid,
          media: imagesArrayObj,
          variants: {
            variantsOptionNames,
            values: variants,
          },
          productName,
          prices: {
            price,
            compareTo,
          },
          taxableProduct,
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
      } else {
        productInfo = {
          isSlugValid,
          variants: {
            variantsOptionNames,
            values: variants,
          },
          productName,
          prices: {
            price,
            compareTo,
          },
          taxableProduct,
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
      }

      const isSlugValidRes = await verifySlug(slug);
      if (isSlugValidRes.valid) {
        const res = await editProduct(productInfo);
        if (isNewImagesUploaded) {
          toDeleteImagesArray.map(async (image) => {
            await deleteProductImage(image.data._id);
          });
        }
        await Router.push('/products');
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
      setLoading(true);
      if (isNewImagesUploaded) {
        await childRef.current.handleStartUploadingFiles();
      } else {
        onSubmit();
      }
    }
  };

  const handleSetImagesArray = (images) => {
    setImagesArray(images);
  };

  const handleGetExtraInfo = (extraInfoArray) => {
    setExtraInfo(extraInfoArray);
  };

  const handleGetVariants = (variantsArray) => {
    setVariants(variantsArray);
  };

  const handleGetVariantsOptionNames = (variantsOptionNamesArray) => {
    setVariantsOptionNames(variantsOptionNamesArray);
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
    if (!_.isEmpty(product.data)) {
      const imagesObj = [];
      product.data.media.map((image) => {
        imagesObj.push({
          data: image,
        });
      });
      handleSetImagesArray(imagesObj);
      setToDeleteImagesArray(imagesObj);
      setId(product.data._id);
      setSlug(product.data.slug);
      setProductName(product.data.productName);
      setPrice(product.data.prices.price);
      setCompareTo(product.data.prices.compareTo);
      setTaxableProduct(product.data.taxableProduct);
      setDescription(product.data.description);
      setSku(product.data.inventory.sku);
      setBarcode(product.data.inventory.barcode);
      setQuantity(product.data.inventory.quantity);
      setAllowPurchaseOutOfStock(
        product.data.inventory.allowPurchaseOutOfStock
      );
      setPhysicalProduct(product.data.shipping.physicalProduct);
      setWeightAmount(product.data.shipping.weight.amount);
      setWeightUnit(product.data.shipping.weight.unit);
      setVariants(product.data.variants.values);
      setVariantsOptionNames(product.data.variants.variantsOptionNames);
      setSeoTitle(product.data.seo.title);
      setSeoSlug(product.data.seo.slug);
      setSeoDescription(product.data.seo.description);
      setCategories(
        categoriesArrayToString(product.data.organization.categories)
      );
      setCategoriesArray(
        editCategoriesToArray(product.data.organization.categories)
      );
      setTags(tagsArrayToString(product.data.organization.tags));
      setTagsArray(editTagsToArray(product.data.organization.tags));
      setExtraInfo(product.data.extraInfo);
      handleGetExtraInfo(product.data.extraInfo);
    }
  }, [product]);

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
    tags,
    tagsArray,
  ]);

  useEffect(() => {
    if (slug.length > 0) {
      const checkSlugValid = async () => {
        const isSlugValidRes = await verifySlug(slug);
      };
      checkSlugValid();
      setGlobalVariable();
    }
  }, [productName]);

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

  useEffect(() => {
    if (slug.length > 0) {
      verifySlug();
    }
  }, [slug]);

  useEffect(() => {
    changeSlugFromProductName(productName);
  }, [productName, price]);

  // Input Handlers
  const onChangeProductName = (e) => {
    if (productName.length <= 100) {
      setProductName(e.target.value);
    } else {
      setProductName(productName.substring(0, productName.length - 1));
    }
  };

  const onChangePrice = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const onChangeCompareTo = (e) => {
    setCompareTo(parseFloat(e.target.value));
  };

  const handleCheckTaxableProduct = () => {
    setTaxableProduct(!taxableProduct);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.getContent());
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
    setWeightAmount(parseFloat(e.target.value));
  };

  const handleWeightUnit = (e) => {
    setWeightUnit(e.target.value);
  };

  const onChangeSeoTitle = (e) => {
    setSeoTitle(e.target.value);
  };

  const onChangeSeoSlug = (e) => {
    setSeoSlug(slugify(e.target.value.toLowerCase()));
  };

  const onChangeSeoDescription = (e) => {
    setSeoDescription(e.target.value);
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

  const changeSlugFromProductName = () => {
    setSlug(slugifyString(productName));
  };

  return (
    <WithAuth>
      <Head>
        <title>Edit Product | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ItemNameDescription
              MainIcon={<FaBox className='mainIcon' />}
              PlusIcon={<FaPen className='plus' />}
              title='Edit Product'
              itemName='Product Name'
              itemNameInput={productName}
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
            {extraInfo.length > 0 && (
              <ExtraInfo
                handleGetExtraInfo={handleGetExtraInfo}
                editable
                extraInfo={extraInfo}
              />
            )}
            <Inventory
              handleSku={handleSku}
              handleBarcode={handleBarcode}
              handleQuantity={handleQuantity}
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
          Update Product
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

EditProduct.getInitialProps = async ({ ctx }) => {
  const { asPath, store, isServer } = ctx;

  const slug = asPath.substring(14, asPath.length);

  store.dispatch(getProduct(slug));
  return { isServer };
};

EditProduct.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(EditProduct);
