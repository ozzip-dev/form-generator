import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendEmail } from "@/lib/email";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/mongo";
import { UserRole } from "../mongo/models";

const getAuthEmailTemplate = (
  userName: string,
  headerText: string,
  url: string,
  buttonText: string,
): string =>
  `
    <div>
      <div style="margin-bottom: 10px;">Cześć, <b>${userName}</b></div>
      <div>${headerText}</div>

      <a
        href=${url}
        style="
          display: inline-block;
          background: #c00000;
          color: #fff;
          padding: 8px 14px;
          margin: 16px 0;
          border-radius: 6px;
          text-decoration: none;
        "
      >
        ${buttonText}
      </a>

      <div>
        <img src="https://formypracy.org/images/fp_logo.png" />
        <div>
          <a
            href="https://formypracy.org/"
            style="
              margin-top: 24px;
              text-decoration: none;
              font-weight: bold;
            "
          >
            www.formypracy.org
          </a>
        </div>
      </div>
    </div>
  `;

export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustHost: true,
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.MODERATOR as string,
        input: false /* may add other roles than 'admin' and 'moderator' later (eg. 'user' for reports only?)  */,
      },
      // TODO: consider changing to 'committeeId' and adding a committee collection
      committeeName: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      committeeEmail: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      committeePhone: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      committeeUnion: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      privacyPolicyConfirmed: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "OZZIP zmień swoje hasło",
        html: getAuthEmailTemplate(
          user?.name || "",
          "Kliknij przycisk poniżej, aby zmienić hasło.",
          url,
          "Zmień hasło",
        ),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
    cookie: {
      sameSite: "lax",
      httpOnly: false,
      secure: false,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmail({
        to: user.email,
        subject: "Potwierdź email",
        html: getAuthEmailTemplate(
          user?.name || "",
          "Kliknij przycisk poniżej, aby zweryfikować email.",
          verificationUrl,
          "Weryfikuj",
        ),
      });
    },
  },
  plugins: [nextCookies()],
});
