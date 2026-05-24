import { NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/db"
import User from "@/models/user.model"
import Vehicle from "@/models/vehicle.model"

export async function POST(req: NextRequest) {
  try {
    await connectDb()

    const { latitude, longitude, vehicleType } = await req.json()

    if (!latitude || !longitude) {
      return NextResponse.json(
        { message: "Coordinates required" },
        { status: 400 }
      )
    }

    // 1️⃣ Find nearby vendors (within 5km)
    let vendors = await User.find({
      role: "vendor",
      isOnline: true,
      vendorStatus: "approved",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 5000
        }
      }
    }).select("_id")

    // 2️⃣ Fallback 1: If no vendors are within 5km, search within 100km
    if (!vendors.length) {
      vendors = await User.find({
        role: "vendor",
        isOnline: true,
        vendorStatus: "approved",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 100000 // 100km
          }
        }
      }).select("_id")
    }

    // 3️⃣ Fallback 2: If still no vendors, search for ANY online approved vendor (regardless of distance/location status)
    if (!vendors.length) {
      vendors = await User.find({
        role: "vendor",
        isOnline: true,
        vendorStatus: "approved"
      }).select("_id")
    }

    const vendorIds = vendors.map(v => v._id)

    if (!vendorIds.length) {
      return NextResponse.json({ success: true, vehicles: [] })
    }

    // 2️⃣ Get vehicles of those vendors
    const vehicles = await Vehicle.find({
      owner: { $in: vendorIds },
      status: "approved",
      isActive: true,
      ...(vehicleType && { type: vehicleType })
    }).lean()

    return NextResponse.json({
      success: true,
      vehicles
    })

  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}