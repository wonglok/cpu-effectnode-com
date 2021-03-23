import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: process.env.JWT_SECRET,
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token, maxAge }) {},
  },

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.uid = user.id;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user.uid = user.uid;

      let adminIDS = [
        process.env.ADMIN_UID,
        process.env.ADMIN_UID_1,
        process.env.ADMIN_UID_2,
        process.env.ADMIN_UID_3,
        process.env.ADMIN_UID_4,
        process.env.ADMIN_UID_5,
      ].filter((e) => e);

      session.user.isAdmin = adminIDS.includes(user.uid);
      return Promise.resolve(session);
    },
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: null, // If set, new users will be directed here on first sign in
  // },
});

//-----

//-----

//-----
