import { formatDateString } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  startup_by_id_query,
} from "@/sanity/lib/queries";
import { Link } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypecard } from "@/components/StartupCard";

export const experimental_ppr = true;
const md = markdownit();
const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const [post, editorPosts] = await Promise.all([
  //   client.fetch(startup_by_id_query, { id }),
  //   client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  // ]);
  const post = await client.fetch(startup_by_id_query, { id });
  const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: "editor-picks",
  });
  if (!post) notFound();
  const pasredContent = md.render(post.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[239px]">
        <p className="tag">{formatDateString(post._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="image"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <a
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image || "/path/to/default/image.jpg"}
                alt="author image"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-60-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </a>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {pasredContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: pasredContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No content</p>
          )}
        </div>
        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid">
              {editorPosts.map((post: StartupTypecard, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
