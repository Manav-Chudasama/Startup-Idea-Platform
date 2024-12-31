import { client } from "@/sanity/lib/client";
import { startups_by_author_query } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypecard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(startups_by_author_query, { id });
  return (
    <>
      {startups?.length > 0 ? (
        startups.map((startup: StartupTypecard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p>No startups found</p>
      )}
    </>
  );
};

export default UserStartups;
