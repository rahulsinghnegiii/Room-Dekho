import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Parse form data with proper type checking
    const listingData = {
      title: formData.get("title") as string,
      price: formData.get("price") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string || "",
      city: formData.get("city") as string || "",
      facilities: formData.get("facilities") ? JSON.parse(formData.get("facilities") as string) : [],
      contactName: formData.get("contactName") as string || "",
      contactPhone: formData.get("contactPhone") as string || "",
      contactEmail: formData.get("contactEmail") as string || "",
      createdAt: new Date().toISOString(),
    };

    // Handle images if present
    let uploadedImageUrls: string[] = [];
    const imagesData = formData.get("images");
    if (imagesData) {
      try {
        const images = JSON.parse(imagesData as string) as string[];
        if (Array.isArray(images) && images.length > 0) {
          // Upload images to Cloudinary
          const uploadPromises = images.map(async (base64Image) => {
            try {
              const result = await cloudinary.uploader.upload(base64Image, {
                folder: "room-dekho",
                resource_type: "auto",
              });
              return result.secure_url;
            } catch (error) {
              console.error("Error uploading image to Cloudinary:", error);
              throw error;
            }
          });

          uploadedImageUrls = await Promise.all(uploadPromises);
        }
      } catch (error) {
        console.error("Error processing images:", error);
        throw new Error("Failed to process images");
      }
    }

    // Add listing to Firestore
    const docRef = await addDoc(collection(db, "listings"), {
      ...listingData,
      images: uploadedImageUrls,
    });

    return NextResponse.json({
      success: true,
      listingId: docRef.id,
      imageUrls: uploadedImageUrls,
    });
  } catch (error) {
    console.error("Error submitting listing:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit listing. Please try again.",
      },
      { status: 500 }
    );
  }
} 