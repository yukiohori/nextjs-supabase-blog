'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@clerk/nextjs';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { Loading } from '@/components/atoms/Loading';
import { ConfirmDialog } from '@/components/organisms/AlertDialog';
import { CategoryForm } from '@/components/pages/dashboard/category/Form/CategoryForm';
import { columns } from '@/components/pages/dashboard/category/Table/Columns';
import { DataTable } from '@/components/pages/dashboard/category/Table/DataTable';
import { Button } from '@/components/ui/Button';
import { useCategory } from '@/hooks/useCategory';
import { RequestFormType } from '@/libs/constants';
import type {
  Category,
  CategoryInsert,
  CategoryUpdate,
} from '@/types/database';

const DashboardCategory = () => {
  const { userId } = useAuth();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [upsertType, setUpsertType] = useState<RequestFormType>(
    RequestFormType.Insert,
  );

  const {
    insertCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    categoryList,
  } = useCategory(true);

  const upsertCategory = async (category: CategoryInsert | CategoryUpdate) => {
    if (upsertType === RequestFormType.Insert) {
      return insertCategory(category as CategoryInsert);
    }
    return updateCategory(category as CategoryUpdate);
  };

  const openInsertCategoryForm = useCallback(() => {
    setUpsertType(RequestFormType.Insert);
    setSelectedCategory(undefined);
    setOpenFormDialog(true);
  }, []);

  const openUpdateCategoryForm = useCallback(() => {
    setUpsertType(RequestFormType.Update);
    setOpenFormDialog(true);
  }, []);

  const categoryListTableData = useMemo(() => {
    return categoryList.map((category) => {
      console.log(category);

      return {
        ...category,
        delete: () => {
          setSelectedCategory(category);
          setOpenConfirmDialog(true);
        },
        update: () => {
          setSelectedCategory(category);
          openUpdateCategoryForm();
        },
        hide: () => {
          updateCategory({
            ...category,
            show: !category.show,
          });
        },
        disabled: userId !== category.user_id,
      };
    });
  }, [categoryList, deleteCategory]);

  const deleteSelectedCategory = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
      setSelectedCategory(undefined);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold">CATEGORY</h1>
      <div className="mt-6">
        <Button onClick={openInsertCategoryForm}>
          <Plus />
        </Button>
      </div>
      <div className="relative mt-6 min-h-[140px] w-full overflow-hidden">
        {isLoading && (
          <div
            className={clsx(
              'absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center',
              categoryList.length && 'bg-black/40',
            )}
          >
            <Loading />
          </div>
        )}
        {categoryList.length > 0 && (
          <DataTable columns={columns} data={categoryListTableData} />
        )}
        <CategoryForm
          open={openFormDialog}
          defaultValues={selectedCategory}
          setOpen={setOpenFormDialog}
          onFormSubmit={upsertCategory}
          upsertType={upsertType}
        />
        <ConfirmDialog
          title="Are you absolutely sure?"
          description="  This action cannot be undone. This will permanently delete the category."
          open={openConfirmDialog}
          onOpenChange={setOpenConfirmDialog}
          confirmAction={deleteSelectedCategory}
        />
      </div>
    </>
  );
};

export default DashboardCategory;
