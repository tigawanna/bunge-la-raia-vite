import { routeTree } from "@/routeTree.gen";
import { ParseRoute } from "@tanstack/react-router";

export type Nullable<T> = T | null;
export type IsNullable<T> = [null] extends [T] ? true : false;
export type ValidRoutes = ParseRoute<typeof routeTree>["fullPath"];
