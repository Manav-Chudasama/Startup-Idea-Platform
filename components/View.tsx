import React from "react";
import Ping from "./Ping";
import { starup_views_query } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { viewCount } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views: totalviews } = await client
    .withConfig({ useCdn: false })
    .fetch(starup_views_query, { id });

  await writeClient
    .patch(id)
    .set({ views: totalviews + 1 })
    .commit();

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{viewCount(totalviews)}</span>
      </p>
    </div>
  );
};

export default View;
