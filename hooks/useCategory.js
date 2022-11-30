import { useGetCategoriesQuery } from "app/api/categoryApi";
import { useEffect, useState } from "react";

export default function useCategory(parent) {
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const { data, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (data && data.categories.length > 0) {
      setCategories(data.categories);
      if (parent)
        setChildCategories(
          data.categories.filter((cat) => cat.parent === parent)
        );
    }
  }, [data, parent]);

  return {
    categories,
    childCategories,
    isLoading,
  };
}
