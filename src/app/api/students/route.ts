import { NextRequest, NextResponse } from 'next/server';
import { getStudentsDb } from '@/db/studentDb';
import { createStudentDb } from '@/db/studentDb';

export async function GET() {
  const students = await getStudentsDb();
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.first_name || !body.last_name) {
      return NextResponse.json(
        { error: 'Поля first_name и last_name обязательны' },
        { status: 400 }
      );
    }

    const newStudent = await createStudentDb(body);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании студента:', error);
    return NextResponse.json(
      { error: 'Не удалось добавить студента' },
      { status: 500 }
    );
  }
}