import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(() => typeof window !== 'undefined' ? !sessionStorage.getItem("categories") : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const cached = sessionStorage.getItem("categories");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
          setIsLoading(false);
          return;
        }
      } catch (e) {
      }
    }

    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products/category-list");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        if (isMounted) {
          setCategories(data);
          sessionStorage.setItem("categories", JSON.stringify(data));
        }
      } catch (err: unknown) {
        if (isMounted) setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, isLoading, error };
}
