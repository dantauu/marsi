import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Locations } from "@/app/types/global.ts"

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/", //import.meta.env.VITE_BASE_URL
  }),
  endpoints: (builder) => ({
    getLocations: builder.query<
      Locations[],
      { search?: string; limit?: number }
    >({
      query: ({ search = "", limit = 10 }) => ({
        url: "locations",
        method: "GET",
        params: { search, limit },
      }),
    }),
  }),
})

export const { useGetLocationsQuery } = locationsApi
