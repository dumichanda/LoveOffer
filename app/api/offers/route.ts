import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const offers = await prisma.offer.findMany({
      where: {
        isPublished: true,
        status: "ACTIVE",
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            isVerified: true,
          },
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    })

    return NextResponse.json({
      success: true,
      data: offers,
    })
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()

    const offer = await prisma.offer.create({
      data: {
        ...body,
        hostId: session.user.id,
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            image: true,
            isVerified: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: offer,
    })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json({ success: false, error: "Failed to create offer" }, { status: 500 })
  }
}
