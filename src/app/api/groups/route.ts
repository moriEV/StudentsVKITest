import { NextResponse } from 'next/server';
import { getGroupsDb } from '@/db/groupDb';
import { initializeDataSource } from '@/db/AppDataSource';

export async function GET() {
  try {
    await initializeDataSource();

    const groups = await getGroupsDb();
    return NextResponse.json(groups);
  } catch (error) {
    console.error('API /groups error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
