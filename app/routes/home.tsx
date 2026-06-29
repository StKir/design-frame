import { Link } from "react-router";

import { frames } from "~/frames/registry";

export const meta = () => [
  { title: "Design Frames" },
  { name: "description", content: "Каталог дизайн-фреймов" },
];

const Home = () => (
  <main className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Design Frames
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Выберите фрейм для просмотра и редактирования
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {frames.map((frame) => (
          <Link
            key={frame.id}
            to={`/frames/${frame.id}`}
            className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {frame.name}
            </h2>
            {frame.description && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {frame.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  </main>
);

export default Home;
