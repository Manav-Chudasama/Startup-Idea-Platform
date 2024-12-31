import StartupCard, { StartupTypecard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { startups_query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "../auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const session = await auth();
  console.log(session?.id);
  
  //const posts = await client.fetch(startups_query, params); // This is the old way of fetching data
  const { data: posts } = await sanityFetch({ query: startups_query, params }); // This is the new way of fetching data

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on pitches, and get noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypecard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
