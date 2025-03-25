const db = require('../config/db'); // Ensure this imports the connection pool

const JobSeeker = {
  create: async (data) => {
    const sql = `
      INSERT INTO jobseekers 
      (email, password, first_name, sur_name, phone_number, district, 
       date_of_birth, age, gender_type, id_no) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.email, 
      data.password, 
      data.first_name, 
      data.sur_name, 
      data.phone_number, 
      data.district,
      data.date_of_birth, 
      data.age, 
      data.gender_type, 
      data.id_no
    ];
    
    const [result] = await db.execute(sql, values);
    return result;
  },

  // Check if an email already exists
  findByEmail: async (email) => {
    const query = 'SELECT * FROM jobseekers WHERE email = ?';
    const [results] = await db.execute(query, [email]);
    return results.length > 0 ? results[0] : null;
  }
};

module.exports = JobSeeker;
