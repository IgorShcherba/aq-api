const axios = require("axios");

const RECAPTCHA_SECRET = "6LcPW8saAAAAAAndNM1Sxgye-ShXbF_5ONnaDw7F";
const RECAPTCHA_MIN_SCORE = 0.5;
const verifyToken = async (token) => {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`
    );
    return response.data;
  } catch (error) {
    console.log("recaptcha verify error", error);
  }
};
module.exports = async (ctx, next) => {
  const token = ctx.request.body?.token;

  if (!token) {
    return ctx.badRequest(null, "Recaptcha token is required");
  }
  const verificationResult = await verifyToken(token);
  if (
    verificationResult?.success &&
    verificationResult?.score > RECAPTCHA_MIN_SCORE
  ) {
    ctx.request.body.recaptcha_score = verificationResult?.score;
    return await next();
  }
  return ctx.badRequest(null, "Recaptcha verification is not passed");
};
