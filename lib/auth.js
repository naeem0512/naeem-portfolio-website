// lib/auth.js - NextAuth configuration
import NextAuth from 'next-auth'
import LinkedInProvider from 'next-auth/providers/linkedin'

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'r_liteprofile r_emailaddress',
        },
      },
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.localizedFirstName + ' ' + profile.localizedLastName,
          email: profile.emailAddress,
          image: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
          linkedin: {
            headline: profile.localizedHeadline,
            industry: profile.industryName,
            location: profile.geoLocation?.name,
            publicProfileUrl: profile.publicProfileUrl
          }
        }
      },
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.linkedin = profile?.linkedin
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.linkedin = token.linkedin
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)