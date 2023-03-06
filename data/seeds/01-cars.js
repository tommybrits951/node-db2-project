/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').truncate()
  await knex('cars').insert([
    {id: 1, vin: '1e4rt57896w758789', make: 'honda', model: "civic", mileage: 70000, title: 'salvage', transmission: "auto" },
    {id: 2, vin: '1e4rt57896w718789', make: 'honda', model: "crv", mileage: 5000, title: 'clean', transmission: "auto" },
    {id: 3, vin: '1e4rt57896w764789', make: 'honda', model: "pilot", mileage: 400, title: 'clean', transmission: "auto" }
  ]);
};
