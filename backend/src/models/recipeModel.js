const pool = require('../config/mysql');

exports.saveRecipe = async (recipe) => {
  const { recipe_id, title, description, category, image_url, ingredient_groups, instructions, ratings, status, total_time, yields, uid } = recipe;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const query = `
      INSERT INTO recipes (recipe_id, title, description, category, image_url, ingredient_groups, instructions, ratings, status, total_time, yields)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      description = VALUES(description),
      category = VALUES(category),
      image_url = VALUES(image_url),
      ingredient_groups = VALUES(ingredient_groups),
      instructions = VALUES(instructions),
      ratings = VALUES(ratings),
      status = VALUES(status),
      total_time = VALUES(total_time),
      yields = VALUES(yields);
    `;
    await connection.query(query, [recipe_id, title, description, category, image_url, ingredient_groups, instructions, ratings, status, total_time, yields]);

    const historyQuery = `
      INSERT INTO recipe_histories (uid, recipe_id, created_at)
      VALUES (?, ?, NOW());
    `;
    await connection.query(historyQuery, [uid, recipe_id]);

     
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getSavedRecipes = async (uid) => {
    const query = `
      SELECT r.*
      FROM recipes r
      JOIN recipe_histories rh ON r.recipe_id = rh.recipe_id
      WHERE rh.uid = ?
      ORDER BY rh.created_at DESC;
    `;
    const [rows] = await pool.execute(query, [uid]);
    return rows;
  };

exports.deleteRecipe = async (recipe_id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const query = 'DELETE FROM recipes WHERE recipe_id = ?';
    await connection.query(query, [recipe_id]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};