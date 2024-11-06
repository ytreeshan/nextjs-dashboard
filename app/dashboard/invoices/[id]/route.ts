// app/api/invoices/[id]/route.ts
import { NextResponse } from 'next/server';
import { deleteInvoice } from '@/app/lib/actions'; // Adjust this path as needed

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await deleteInvoice(id);
    return NextResponse.json({ message: 'Invoice deleted successfully.' });
  } catch (err) {
    console.error('Error deleting invoice:', err);
    return NextResponse.json({ error: 'Failed to delete the invoice.' }, { status: 500 });
  }
}
