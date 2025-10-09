import { getGroupsDb } from '@/db/groupDb';
import { NextResponse } from 'next/server';

export async function GET() {
  const groups = await getGroupsDb();
  return NextResponse.json(groups);
}
