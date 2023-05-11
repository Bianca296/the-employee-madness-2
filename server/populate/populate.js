/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const equipmentsName = require("./equipmentsName.json");
const favoritesBrand = require("./favoritesBrand.json");
const types = require("./types.json");
const amounts = require("./amounts.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const BrandModel = require("../db/brand.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const equipmentsName = await EquipmentModel.find().lean();
  const favoritesBrand = await BrandModel.find().lean();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: false,
    equipment: pick(equipmentsName),
    brand: pick(favoritesBrand),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = equipmentsName.map((name) => ({
    name,
    type: pick(types),
    amount: pick(amounts),
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const populateBrands = async () => {
  await BrandModel.deleteMany({});

  const brands = favoritesBrand.map((name) => ({
    name,
  }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands();
  await populateEquipments();
  await populateEmployees();
 
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
