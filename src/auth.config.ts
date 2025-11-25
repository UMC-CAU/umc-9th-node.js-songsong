import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken"; // JWT 생성을 위해 import 

dotenv.config();
const secret = process.env.JWT_SECRET; // .env의 비밀 키 

export const generateAccessToken = (user:Record<string, any>) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    secret as string,                           
    { expiresIn: '1h' }                 
  );
};

export const generateRefreshToken = (user:Record<string, any>) => {
  return jwt.sign(
    { id: user.id },                   
    secret as string,
    { expiresIn: '14d' }                
  );
};

// GoogleVerify 
const googleVerify = async (profile: any) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: Number(user.id), email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: null,
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: Number(created.id), email: created.email, name: created.name };
};

// GoogleStrategy 

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/oauth2/callback/google",
        scope: ["email", "profile"],
    },

    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
            const user = await googleVerify(profile);

            const jwtAccessToken = generateAccessToken(user);
            const jwtRefreshToken = generateRefreshToken(user);

            // Passport에 넘길 사용자 정보(또는 토큰)를 반환
            return done(null, {
                user,
                accessToken: jwtAccessToken,
                refreshToken: jwtRefreshToken,
            });
        } catch (err) {
            return done(err);
        }
    }
);


import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
  // 요청 헤더의 'Authorization'에서 'Bearer <token>' 토큰을 추출
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(jwtOptions as any, async (payload, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: payload.id } });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});