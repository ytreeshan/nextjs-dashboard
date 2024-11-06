// Add this line at the top of your file
'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

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
        // Optionally, add logic to refresh the invoice list or update the UI
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
