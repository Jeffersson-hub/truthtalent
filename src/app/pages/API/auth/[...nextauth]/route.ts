import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // ou ton provider préféré

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login', // facultatif si tu veux une page dédiée
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
