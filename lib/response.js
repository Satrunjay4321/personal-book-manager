import { NextResponse } from "next/server";

export const successResponse = (
  message,
  data = {},
  status = 200
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const errorResponse = (
  message,
  status = 500
) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
};