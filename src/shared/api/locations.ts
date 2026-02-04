import { baseApi } from "@/redux/api/base-api.ts"
import type { Locations } from "@/app/types/global.ts"

export const locationsApi = baseApi.injectEndpoints({
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
