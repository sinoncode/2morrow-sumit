import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  const { id } = await params;
  const baseUrl =
    process.env.PROPERTIES_API_URL ||
    `${process.env.API_BASE_URL || ""}/public/properties`;

  if (!baseUrl || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid property ID." }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/${id}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: response.status === 404 ? "Property not found." : "Property could not be loaded." },
        { status: response.status === 404 ? 404 : 502 }
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload.data ?? payload);
  } catch (error) {
    console.error(`Unable to load property ${id}:`, error);
    return NextResponse.json(
      { error: "Property could not be loaded." },
      { status: 502 }
    );
  }
}
