import { NextRequest, NextResponse } from "next/server";
import { createPool } from "mysql2/promise";
import { writeFile } from "fs/promises";
import path from "path";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // Convert to number
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const schoolName = formData.get("schoolName") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const schoolImage = formData.get("schoolImage") as File | null;

    let imagePath = null;

    if (schoolImage && schoolImage.size > 0) {
      // Generate a unique filename
      const ext = path.extname(schoolImage.name) || ".jpg";
      const safeName = `${schoolName}_${emailAddress}_${contactNumber}`.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      );
      const fileName = `${safeName}${ext}`;
      const filePath = path.join(
        process.cwd(),
        "public",
        "schoolImages",
        fileName
      );

      // Read the file as ArrayBuffer and write to disk
      const buffer = Buffer.from(await schoolImage.arrayBuffer());
      await writeFile(filePath, buffer);

      imagePath = `/schoolImages/${fileName}`;
    }

    await pool.query(
      "INSERT INTO schools (name, email, address, city, state, contact, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [schoolName, emailAddress, address, city, state, contactNumber, imagePath]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");
    return NextResponse.json({ success: true, schools: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
