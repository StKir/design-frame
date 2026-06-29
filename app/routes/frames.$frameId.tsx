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

const FramePage = ({ params }: Route.ComponentProps) => {
  const frame = getFrameById(params.frameId);

  if (!frame) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">404</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Фрейм не найден</p>
        </div>
      </main>
    );
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
