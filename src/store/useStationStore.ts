import { create } from "zustand";
import { Station, Tag } from "../types";

type SortType = (typeof sortTypes)[number];

type StationSlice = {
  fetchData: (url: string) => void;

  data: Array<Station>;
  isLoading: boolean;
  error: string | null;

  selectedStation: Station | null;
  setSelectedStation: (item: Station | null) => void;

  sortBy: SortType;
  setSortBy: (sortBy: SortType) => void;
  getSortedData: () => Array<Station>;

  getRecommendationsForTags: (tags: Array<Tag>) => Array<Station>;
};

export const sortTypes = ["default", "popularity"] as const;

const sortByPopularityDESC = (a: Station, b: Station) =>
  b.popularity - a.popularity;

const filterUnreliable = (station: Station) => station.reliability > 0;

export const useStationStore = create<StationSlice>((set, get) => ({
  fetchData: async (url: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(url);

      if (!response.ok) {
        set({ error: "Network response was not ok", isLoading: false });
      }

      const data = await response.json().then((data) => data.data);
      set({ data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  data: [],
  isLoading: false,
  error: null,

  selectedStation: null,
  setSelectedStation: (item) => set({ selectedStation: item }),

  sortBy: "default",
  setSortBy: (sortBy: SortType) => {
    set({ sortBy });
  },
  getSortedData: () => {
    switch (get().sortBy) {
      case "popularity":
        return [...get().data]
          .filter(filterUnreliable)
          .sort(sortByPopularityDESC);

      case "default":
      default:
        return get().data.filter(filterUnreliable);
    }
  },

  getRecommendationsForTags: (providedTags: Array<Tag>) => {
    return [...get().data]
      .filter((station) => station.id !== get().selectedStation?.id)
      .map((station) => {
        const tagMatches = station.tags.filter((tag) =>
          providedTags.includes(tag)
        ).length;

        return { station, tagMatches };
      })
      .filter(({ tagMatches }) => tagMatches > 0)
      .sort((a, b) =>
        b.tagMatches === a.tagMatches
          ? sortByPopularityDESC(a.station, b.station)
          : b.tagMatches - a.tagMatches
      )
      .map(({ station }) => station);
  },
}));
