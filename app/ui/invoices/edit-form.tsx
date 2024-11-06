'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { State, updateInvoice } from '@/app/lib/actions';
import { useActionState } from 'react';


export function DeleteInvoice({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this invoice?');

    if (confirmed) {
      try {
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the invoice.');
        }

        alert('Invoice deleted successfully.');
        // Optionally, you can add logic to refresh the invoice list or update the UI here
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('An error occurred while deleting the invoice.');
      }
    }
  };

  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={handleDelete} // Use handleDelete function here
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}







export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={invoice.id} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Display error messages */}
        {state.errors && Object.keys(state.errors).length > 0 && (
          <div className="mb-4 text-red-600">
            {state.errors && Object.keys(state.errors).map((key) =>
              (state.errors as Record<string, string[]>)[key]?.map((error, index) => (
                // Provide a unique key for each error message
                <div key={`${key}-${index}`}>{error}</div>
              ))
            )}
          </div>
        )}

        {/* Display success message */}
        {state.message && (
          <div className="mb-4 text-green-600">
            {state.message}
          </div>
        )}

        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={invoice.customer_id}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}






// 'use client';

// import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { Button } from '@/app/ui/button';
// import { State, updateInvoice } from '@/app/lib/actions';
// import { useActionState } from 'react';

// export default function EditInvoiceForm({
//   invoice,
//   customers,
// }: {
//   invoice: InvoiceForm;
//   customers: CustomerField[];
// }) {
//   const initialState: State = { message: null, errors: {} };
//   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
//   const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

//   return (
//     <form action={formAction}>
//       <input type="hidden" name="id" value={invoice.id} />

//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Display error messages */}
//         {state.errors && Object.keys(state.errors).length > 0 && (
//           <div className="mb-4 text-red-600">
//             {state.errors && Object.keys(state.errors).map((key) =>
//               (state.errors as Record<string, string[]>)[key].map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))
//             )}
//           </div>
//         )}

//         {/* Display success message */}
//         {state.message && (
//           <div className="mb-4 text-green-600">
//             {state.message}
//           </div>
//         )}

//         {/* Customer Name */}
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
//             Choose customer
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue={invoice.customer_id}
//             >
//               <option value="" disabled>
//                 Select a customer
//               </option>
//               {customers.map((customer) => (
//                 <option key={customer.id} value={customer.id}>
//                   {customer.name}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
//             Choose an amount
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 step="0.01"
//                 defaultValue={invoice.amount}
//                 placeholder="Enter USD amount"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//           </div>
//         </div>

//         {/* Invoice Status */}
//         <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//             Set the invoice status
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   id="pending"
//                   name="status"
//                   type="radio"
//                   value="pending"
//                   defaultChecked={invoice.status === 'pending'}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="pending"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                   Pending <ClockIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="paid"
//                   name="status"
//                   type="radio"
//                   value="paid"
//                   defaultChecked={invoice.status === 'paid'}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 />
//                 <label
//                   htmlFor="paid"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Paid <CheckIcon className="h-4 w-4" />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </fieldset>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Edit Invoice</Button>
//       </div>
//     </form>
//   );
// }









// // 'use client';

// // import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
// // import {
// //   CheckIcon,
// //   ClockIcon,
// //   CurrencyDollarIcon,
// //   UserCircleIcon,
// // } from '@heroicons/react/24/outline';
// // import Link from 'next/link';
// // import { Button } from '@/app/ui/button';
// // import { State, updateInvoice } from '@/app/lib/actions';
// // import { useActionState } from 'react';



// // export default function EditInvoiceForm({
// //   invoice,
// //   customers,
// // }: {
// //   invoice: InvoiceForm;
// //   customers: CustomerField[];
// // }) {
// //   const initialState: State = { message: null, errors: {} };
// //   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
// //   const [state, formAction] = useActionState(updateInvoiceWithId, initialState);
 
// //   return (

// //     <form  action={formAction}>
// //     <input type="hidden" name="id" value={invoice.id} />
 
// //       <div className="rounded-md bg-gray-50 p-4 md:p-6">
// //         {/* Customer Name */}
// //         <div className="mb-4">
// //           <label htmlFor="customer" className="mb-2 block text-sm font-medium">
// //             Choose customer
// //           </label>
// //           <div className="relative">
// //             <select
// //               id="customer"
// //               name="customerId"
// //               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               defaultValue={invoice.customer_id}
// //             >
// //               <option value="" disabled>
// //                 Select a customer
// //               </option>
// //               {customers.map((customer) => (
// //                 <option key={customer.id} value={customer.id}>
// //                   {customer.name}
// //                 </option>
// //               ))}
// //             </select>
// //             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
// //           </div>
// //         </div>

// //         {/* Invoice Amount */}
// //         <div className="mb-4">
// //           <label htmlFor="amount" className="mb-2 block text-sm font-medium">
// //             Choose an amount
// //           </label>
// //           <div className="relative mt-2 rounded-md">
// //             <div className="relative">
// //               <input
// //                 id="amount"
// //                 name="amount"
// //                 type="number"
// //                 step="0.01"
// //                 defaultValue={invoice.amount}
// //                 placeholder="Enter USD amount"
// //                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
// //               />
// //               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Invoice Status */}
// //         <fieldset>
// //           <legend className="mb-2 block text-sm font-medium">
// //             Set the invoice status
// //           </legend>
// //           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
// //             <div className="flex gap-4">
// //               <div className="flex items-center">
// //                 <input
// //                   id="pending"
// //                   name="status"
// //                   type="radio"
// //                   value="pending"
// //                   defaultChecked={invoice.status === 'pending'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="pending"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
// //                 >
// //                   Pending <ClockIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   id="paid"
// //                   name="status"
// //                   type="radio"
// //                   value="paid"
// //                   defaultChecked={invoice.status === 'paid'}
// //                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
// //                 />
// //                 <label
// //                   htmlFor="paid"
// //                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
// //                 >
// //                   Paid <CheckIcon className="h-4 w-4" />
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         </fieldset>
// //       </div>
// //       <div className="mt-6 flex justify-end gap-4">
// //         <Link
// //           href="/dashboard/invoices"
// //           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
// //         >
// //           Cancel
// //         </Link>
// //         <Button type="submit">Edit Invoice</Button>
// //       </div>
// //     </form>
// //   );
// // }
