import { Types } from "mongoose";

export interface QueryInterface {
  page: number;
  limit: number;
  order: string;
  sort: string;
  search?: string;
  status?: string;
}