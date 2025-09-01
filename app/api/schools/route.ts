import { NextRequest, NextResponse } from "next/server";
import { createPool } from "mysql2/promise";
import { v2 as cloudinary } from "cloudinary";

// Remove fs/promises and path imports, not needed for Cloudinary

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

type CloudinaryUploadResponse = { secure_url: string; [key: string]: unknown };

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
      const arrayBuffer = await schoolImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const uploadRes = await new Promise<CloudinaryUploadResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "schoolImages",
                public_id:
                  `${schoolName}_${emailAddress}_${contactNumber}`.replace(
                    /[^a-zA-Z0-9]/g,
                    "_"
                  ),
                resource_type: "image",
              },
              (error, result) => {
                if (error) reject(error);
                else if (result) resolve(result as CloudinaryUploadResponse);
                else reject(new Error("No result from Cloudinary upload"));
              }
            )
            .end(buffer);
        }
      );

      imagePath = uploadRes.secure_url;
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
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
    return NextResponse.json({ success: true, schools: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
