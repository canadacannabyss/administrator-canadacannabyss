import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {
  Container,
  ContentContainer,
  Content,
  InputGroupTitle
} from '../../../../styles/Pages/Add/Product';

import {
  Input,
  ExtraInfoFieldsDiv,
  ButtonsDiv,
  AddFieldButton,
  RemoveFieldButton
} from '../../../../styles/Pages/Add/ExtraInfo';

const ExtraInfo = (props) => {
  const { handleGetExtraInfo, extraInfo, editable } = props;

  const [inputFields, setInputFields] = useState(extraInfo);

  useEffect(() => {
    handleGetExtraInfo(inputFields);
  }, [inputFields]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ title: '', description: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, e) => {
    const values = [...inputFields];
    if (e.target.name === 'title') {
      values[index].title = e.target.value;
    } else {
      values[index].description = e.target.getContent();
    }
    setInputFields(values);
  };

  return (
    <Container>
      <ContentContainer>
        <Content>
          <InputGroupTitle>Extra Information</InputGroupTitle>
          <ExtraInfoFieldsDiv>
            {inputFields.length > 0 && (
              <>
                {inputFields.map((inputField, index) => (
                  <div key={`${inputFields}-${index}`}>
                    <Input
                      onChange={(e) => {
                        handleInputChange(index, e);
                      }}
                      value={inputField.title}
                      placeholder='Title'
                      name='title'
                    />
                    <Editor
                      apiKey='z1imaefgqfqi5gkj9tp9blogndyf2gp0aj3fgubdtz73p658'
                      name='description'
                      initialValue={inputField.description}
                      init={{
                        height: 320,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                      }}
                      onChange={(e) => {
                        handleInputChange(index, e);
                      }}
                    />
                    <ButtonsDiv>
                      <AddFieldButton onClick={() => handleAddFields()}>
                        <FaPlus />
                      </AddFieldButton>
                      {inputFields.length > 1 && (
                        <RemoveFieldButton onClick={() => handleRemoveFields()}>
                          <FaMinus />
                        </RemoveFieldButton>
                      )}
                    </ButtonsDiv>
                  </div>
                ))}
              </>
            )}
          </ExtraInfoFieldsDiv>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default ExtraInfo;
