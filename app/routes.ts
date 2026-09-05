import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("frames/:frameId", "routes/frames.$frameId.tsx"),
  route("admin/pipeline", "routes/admin.pipeline.tsx"),
  route("admin/pipeline/file/:runId/:filename", "routes/admin.pipeline.file.$runId.$filename.tsx"),
  route("admin/pipeline/course/:slug/:filename", "routes/admin.pipeline.course.$slug.$filename.tsx"),
] satisfies RouteConfig;
