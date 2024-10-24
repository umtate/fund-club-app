import { JWTPayload, SignJWT } from "jose";

const APP_SECRET: string = process.env.APP_SECRET || "";
const ALGO : string = "HS256"

const DUMMY_USER = "0a0100ba-92bf-19c9-8192-bf876b110001"

const key = new TextEncoder().encode(APP_SECRET);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGO })
    .setIssuedAt()
    .setExpirationTime("30 mins")
    .sign(key);
}

export async function decrypt(input: string) {
  console.log(input)
  // const { payload } = await jwtVerify(input, key, {
  //   algorithms: [ALGO],
  // });
  return {id :DUMMY_USER};
}