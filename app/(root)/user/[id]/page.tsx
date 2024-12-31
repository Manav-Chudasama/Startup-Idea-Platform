import { auth } from "@/app/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { author_by_id_query } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(author_by_id_query, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            className="profile_image"
            width={200}
            height={200}
          />
          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="text-14-normal mt-1 text-center">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
