import { pipelineCourseFileLoader } from '~/origami_app/pipeline/route.server';
import { mimeForArtifact } from '~/origami_app/pipeline/store.server';

import type { Route } from './+types/admin.pipeline.course.$slug.$filename';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug, filename } = params;

  if (!slug || !filename || filename.includes('..') || filename.includes('/')) {
    throw new Response('Not found', { status: 404 });
  }

  try {
    const buffer = await pipelineCourseFileLoader(slug, filename);

    return new Response(buffer, {
      headers: {
        'Content-Type': mimeForArtifact(filename),
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    throw new Response('Not found', { status: 404 });
  }
};
