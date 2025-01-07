import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const SuppliersApi = createApi({
  reducerPath: 'suppliersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://northwind.vercel.app/api/' }),
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => `suppliers`,
    }),
    addSuppliers:builder.mutation({
        query:(newSuppliers)=>({
            url:`suppliers`,    
            method:"POST",
            body:newSuppliers,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }),
    deleteSuppliers:builder.mutation({
        query:(id)=>({
            url:`suppliers/${id}`,
            method:"DELETE"
        })
    }),
    editSupplier:builder.mutation({
        query:(id,newSuppliers) =>({
            url:`suppliers/${id}`,
            method:"PUT",
            body:newSuppliers,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    })
  }),
})

export const { useGetSuppliersQuery ,useAddSuppliersMutation,useDeleteSuppliersMutation,useEditSupplierMutation} = SuppliersApi