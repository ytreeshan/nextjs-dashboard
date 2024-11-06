// app/dashboard/invoices/[id]/route.ts
import { NextResponse } from 'next/server';
import { deleteInvoice } from '@/app/lib/actions'; // Adjust this path as needed

// Define the DELETE function
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the ID from the params
  try {
    // Call the delete function from your actions to remove the invoice
    await deleteInvoice(id);
    return NextResponse.json({ message: 'Invoice deleted successfully.' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json({ error: 'Failed to delete the invoice.' }, { status: 500 });
  }
}
