import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/step-one.tsx"),
  route("step-two", "routes/step-two.tsx"),
  route("step-three", "routes/step-three.tsx")
] satisfies RouteConfig;
