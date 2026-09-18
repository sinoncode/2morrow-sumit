import { PropertyLocation, PropertyImage, PropertyCharacteristics } from "./property";

export type ProjectStatus = "planning" | "under_construction" | "completed";

export interface ProjectUnit {
  id: string;
  title: string;
  type: string;
  characteristics: PropertyCharacteristics;
  price: number;
  priceOnRequest: boolean;
  status: "available" | "reserved" | "sold";
  floorPlanUrl?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  completionDate?: string;
  location: PropertyLocation;
  images: PropertyImage[];
  units: ProjectUnit[];
  agentId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
