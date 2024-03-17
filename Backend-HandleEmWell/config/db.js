import mongoose from "mongoose";

export const connectToDb = async () => {
  const pass = encodeURIComponent(process.env.MONGO_PASS);

  const res = await mongoose.connect(
    `mongodb+srv://newcriminal:${pass}@darkdementor.rhallfz.mongodb.net/HandleEmWell?retryWrites=true&w=majority&appName=DarkDementor`
  );
  console.log(
    `MongoDB Connected: ${res.connection.host}`.bgYellow.underline.bold
  );
};
