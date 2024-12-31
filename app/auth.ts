import { client } from "@/sanity/lib/client";
import { author_by_github_id_query } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const { id, login, bio } = profile;
      const { name, email, image } = user;

      try {
        const existingUser = await client.fetch(author_by_github_id_query, {
          id,
        });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id,
            name,
            username: login,
            email,
            bio: bio || "",
            image,
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client.fetch(author_by_github_id_query, {
            id: profile?.id,
          });

          if (user) {
            token.id = user?._id;
          }
        } catch (error) {
          console.error("Error in jwt callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.id = token.id;
      }
      return session;
    },
  },
});
