import mongoose from "mongoose";
import { countries } from "countries-list";
import Country from "./models/Country.js";
import dotenv from "dotenv";
import { logInfo, logError } from "./util/logging.js";

dotenv.config();

const seedCountries = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const countryData = Object.entries(countries).map(([code, data]) => ({
      name: data.name,
      code,
    }));

    await Country.deleteMany({});
    await Country.insertMany(countryData);

    logInfo(`Successfully seeded ${countryData.length} countries.`);
  } catch (error) {
    logError(error);
  } finally {
    await mongoose.disconnect();
  }
};

seedCountries();
