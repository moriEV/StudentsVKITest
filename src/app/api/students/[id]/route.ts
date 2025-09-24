import { deleteStudentDb } from '@/db/studentDb';

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const studentId = Number(params.id);
  const deleted = await deleteStudentDb(studentId);
  return new Response(JSON.stringify({ deleted }), {
    headers: { 'Content-Type': 'application/json' },
  });
}