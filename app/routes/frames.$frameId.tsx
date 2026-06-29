import { FrameShowcaseViewport } from "~/components/frame-showcase-viewport";
import { FrameViewport } from "~/components/frame-viewport";
import { getFrameById } from "~/frames/registry";

import type { Route } from "./+types/frames.$frameId";

export const meta = ({ params }: Route.MetaArgs) => {
  const frame = getFrameById(params.frameId);

  return [
    { title: frame ? `${frame.name} — Design Frame` : "Frame not found" },
    {
      name: "description",
      content: frame?.description ?? "Design frame preview",
    },
  ];
};

export const loader = ({ params }: Route.LoaderArgs) => {
  const frame = getFrameById(params.frameId);

  if (!frame) {
    throw new Response("Not Found", { status: 404 });
  }

  return { frameId: frame.id };
};

const FramePage = ({ loaderData }: Route.ComponentProps) => {
  const frame = getFrameById(loaderData.frameId);

  if (!frame) {
    return null;
  }

  const FrameComponent = frame.component;
  const Viewport =
    frame.layout === "showcase" ? FrameShowcaseViewport : FrameViewport;

  return (
    <Viewport>
      <FrameComponent />
    </Viewport>
  );
};

export default FramePage;
