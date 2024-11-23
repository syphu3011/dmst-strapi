import React, { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectOption, Select, Option } from '@strapi/design-system/Select';
import { TextInput } from '@strapi/design-system/TextInput';
import axios from 'axios';

interface InputProps {
  attribute: any, name: any, articleTypeId: number | null, selectedTags: string[], value: string
  onChange: (value: {target: {name: any, type: any, value: string}}) => void;
}

const Input: React.FC<InputProps> = (input: InputProps) => {
  const value = input
  const onChange = input.onChange

  const [articleTypes, setArticleTypes] = useState([]);
  const [tags, setTags] = useState([]);
  // const [selectedTags, setSelectedTags] = useState<any[]>(JSON.parse(value?.value)?.selectedTags.map((tag: any) => ({id: Number(tag)})) || []);
  const [selectedTags, setSelectedTags] = useState<any[]>(JSON.parse(value?.value ?? null)?.selectedTags || []);
  const [articleTypeId, setArticleTypeId] = useState<number | null>(JSON.parse(value?.value ?? null)?.articleTypeId || null);

  // Fetch Article Types
  useEffect(() => {
    axios.get(`/api/dmst-loai-bai-viets`).then(response => {
      setArticleTypes(response.data.data.map((item: any) => ({ id: item.id, label: item.attributes.loai })));
    });
  }, []);

  // Fetch Tags based on selected articleTypeId
  useEffect(() => {
    if (articleTypeId) {
      axios.get(`/api/dmst-tags?filters[dmst_loai_bai_viets]=${articleTypeId}`).then(response => {
        setTags(response.data.data.map((tag: any) => ({ id: tag.id, label: tag.attributes.tag })));
      });
    } else {
      setTags([]);
      setSelectedTags([]);
    }
  }, [articleTypeId]);

  const handleArticleTypeChange = (valueAI: any) => {
    valueAI = Number(valueAI)
    setArticleTypeId(valueAI);
    setSelectedTags([])
    onChange({
        target: {
          name: value.name,
          value: JSON.stringify({
            articleTypeId: valueAI,
            selectedTags: []
          }),
          type: value.attribute.type
        }
     }); // Reset tags on change of article type
  };

  const handleTagSelection = (tag: []) => {
    // setSelectedTags(prev => {
    //   const newTags = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag];
    //   onChange({
    //     target: {
    //       name: value.name,
    //       value: JSON.stringify({
    //         articleTypeId: articleTypeId,
    //         selectedTags: newTags
    //       }),
    //       type: value.attribute.type
    //     }
    //   });
    //   return newTags;
    // });
    setSelectedTags(tag)
    onChange({
      target: {
        name: value.name,
        value: JSON.stringify({
          articleTypeId: articleTypeId,
          selectedTags: tag
        }),
        type: value.attribute.type
      }
    });
  };
  const renderValue = (value: any) => {
    return value.map((tagId: any) => {
      const tag: any = tags.find((t: any) => t.id === tagId);
      return tag ? tag.label : '';
    });
  };
  return (
    <div>
      {/* Select for Article Type */}
      <Select label="Loại bài viết" onChange={handleArticleTypeChange} value={articleTypeId}>
        {articleTypes.map((type: any) => {
          return (<Option key={type.id} value={type.id}>
            {type.label}
          </Option>)
})}
      </Select>

      {/* Select for Tags */}
      {articleTypeId && (
        <MultiSelect label="Tags" onChange={handleTagSelection} renderValue={renderValue} withTags value={selectedTags}>
          {tags.map((tag: any) => (
            <MultiSelectOption key={tag.id} value={tag.id}>
              {tag.label}
            </MultiSelectOption>
          ))}
        </MultiSelect>
      )}
    </div>
  );
};

export default Input;
