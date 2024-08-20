import { Branded } from "../utils";

export type StreamUrl = Branded<string, "stream-url">;
export type Tag = Branded<string, "tag">;

export type Station = {
  description: string;
  id: string;
  imgUrl: string;
  name: string;
  popularity: number;
  reliability: number;
  streamUrl: StreamUrl;
  tags: Array<Tag>;
};
