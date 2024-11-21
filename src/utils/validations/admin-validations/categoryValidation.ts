import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CategoryFormType } from '../../types/api-types';


 

export const CategorySchema = z.object({
    categoryName: z.string()
        .trim()
        .min(1, { message: 'Category name cannot be empty' })
        .regex(/^[A-Z][a-zA-Z ]*$/, { message: 'Category name start with capital and contain only alphabets' }),
    description: z.string()
        .trim()
        .min(1, { message: 'Category description cannot be empty' }),
    categoryImage: z.any() 
});


export const useCategoryForm = () => {
  const { reset, register, setValue , handleSubmit, formState: { errors } } = useForm<CategoryFormType>({
    resolver: zodResolver(CategorySchema),
  });
  return { register, setValue , handleSubmit, errors, reset, };
};