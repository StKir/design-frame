import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("frames/:frameId", "routes/frames.$frameId.tsx"),
] satisfies RouteConfig;
