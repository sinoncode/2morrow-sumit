import { NextResponse } from "next/server";

const apiUrl =
  process.env.PROPERTIES_API_URL ||
  `${process.env.API_BASE_URL || ""}/public/properties`;

interface PropertiesResponse {
  data: ApiProperty[];
  meta?: {
    last_page?: number;
  };
}

interface ApiProperty {
  id: number;
  classification?: {
    sub_type?: string | null;
    listing_status?: string | null;
  };
  title?: string | null;
  pricing?: {
    price?: number | string | null;
    currency?: string | null;
  };
  location?: {
    address_line_1?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    district?: string | null;
    coordinates?: {
      latitude?: number | string | null;
      longitude?: number | string | null;
    };
  };
  dimensions?: {
    living_area?: number | string | null;
    gross_floor_area?: number | string | null;
    bedrooms?: number | string | null;
    bathrooms?: number | string | null;
  };
  media?: {
    main_photo?: string | null;
  };
  documents?: Record<string, string | null>;
}

export async function GET() {
  if (!apiUrl) {
    return NextResponse.json(
      { error: "Properties API URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const properties: ApiProperty[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const separator = apiUrl.includes("?") ? "&" : "?";
      const response = await fetch(`${apiUrl}${separator}page=${page}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        throw new Error(`Properties API returned ${response.status}`);
      }

      const payload = (await response.json()) as PropertiesResponse;
      properties.push(...(Array.isArray(payload.data) ? payload.data : []));
      lastPage = Math.max(1, Number(payload.meta?.last_page) || 1);
      page += 1;
    } while (page <= lastPage);

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Unable to load properties:", error);
    return NextResponse.json(
      { error: "Properties could not be loaded." },
      { status: 502 }
    );
  }
}
