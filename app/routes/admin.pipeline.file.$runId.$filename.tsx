import { pipelineFileLoader } from '~/origami_app/pipeline/route.server';
import { mimeForArtifact } from '~/origami_app/pipeline/store.server';

import type { Route } from './+types/admin.pipeline.file.$runId.$filename';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { runId, filename } = params;

  if (!runId || !filename || filename.includes('..') || filename.includes('/')) {
    throw new Response('Not found', { status: 404 });
  }

  const buffer = await pipelineFileLoader(runId, filename);
  const isImage = /\.(png|jpe?g|webp|svg)$/i.test(filename);

  return new Response(buffer, {
    headers: {
      'Content-Type': mimeForArtifact(filename),
      'Content-Disposition': isImage
        ? `inline; filename="${filename}"`
        : `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
};
