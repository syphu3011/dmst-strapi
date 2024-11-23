import React, { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectOption, Select, Option } from '@strapi/design-system/Select';
import axios from 'axios';

interface InputProps {
  value: string[];
  onChange: (value: string[]) => void;
  articleTypeId: number | null;
}

const Input: React.FC<InputProps> = ({ value, onChange, articleTypeId }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(value || []);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(25); // Kích thước trang
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn trang không
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

  // Hàm fetch dữ liệu với phân trang
  const fetchTags = async (currentPage: number) => {
    if (!articleTypeId) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`/api/tags/by-article-type/${articleTypeId}`, {
        params: {
          'pagination[page]': currentPage,
          'pagination[pageSize]': pageSize,
        },
      });

      const result = response.data;
      const newTags = result.results.map((tag: any) => tag.tag); // Lấy giá trị 'tag'

      setTags((prev) => [...prev, ...newTags]); // Thêm tag mới vào danh sách
      setHasMore(currentPage < result.pagination.pageCount); // Kiểm tra còn trang để tải
    } catch (error) {
      console.error('Error fetching tags:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (articleTypeId) {
      setPage(1); // Reset trang về 1 khi thay đổi loại bài viết
      setTags([]); // Xóa danh sách tag cũ
      fetchTags(1); // Tải trang đầu tiên
    } else {
      setTags([]);
      setSelectedTags([]); // Xóa tag đã chọn nếu không có loại bài viết
    }
  }, [articleTypeId]);

  const handleTagSelection = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      onChange(newTags);
      return newTags;
    });
  };

  // Hàm tải thêm dữ liệu
  const loadMoreTags = () => {
    if (hasMore && !isLoading) {
      setPage((prev) => {
        const newPage = prev + 1;
        fetchTags(newPage); // Tải trang tiếp theo
        return newPage;
      });
    }
  };

  return (
    <div>
      <MultiSelect withTags multiple>
        <MultiSelectOption value="apple">Apple</MultiSelectOption>
        <MultiSelectOption value="avocado">Avocado</MultiSelectOption>
        <MultiSelectOption value="banana">Banana</MultiSelectOption>
        <MultiSelectOption value="kiwi">Kiwi</MultiSelectOption>
        <MultiSelectOption value="mango">Mango</MultiSelectOption>
        <MultiSelectOption value="orange">Orange</MultiSelectOption>
        <MultiSelectOption value="strawberry">Strawberry</MultiSelectOption>
      </MultiSelect>
      <MultiSelect
        withTags
        multiple
        label="Chọn tag"
        onChange={handleTagSelection}

      >
        {tags.map((tag) => (
          <MultiSelectOption key={tag} value={tag}>
            {tag}
          </MultiSelectOption>
        ))}
      </MultiSelect>

      {hasMore && (
        <button onClick={loadMoreTags} disabled={isLoading}>
          {isLoading ? 'Đang tải...' : 'Tải thêm'}
        </button>
      )}
    </div>
  );
};

export default Input;
