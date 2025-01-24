import pool from "../config/db.mysql.config.js";

class ProductRepository{

    static async createProduct (product_data) {
        const {
            title,
            price,
            stock,
            description,
            category,
            image_base64
        } = product_data

        const query = `
        INSERT INTO products (title, price, stock, description, category, image_base64) 
        VALUES (?, ?, ?, ?, ?, ?)
        `

        const [result] = await pool.execute(query, [title, price, stock, description, category, image_base64])
        if(result.affectedRows > 0){
            return {title, price, stock, description, category, image_base64, id: result.insertId}
        }
        else{
            return console.log(result)
        }
    }

    static async getProducts () {
        const [rows] = await pool.execute(`SELECT * FROM products WHERE active = true`)
        return rows
    }

    static async getProductById (product_id) {
        const [rows] = await pool.execute(`SELECT * FROM products WHERE id = ?`, [product_id])
        return rows.length > 0 ? rows[0] : null
    }

    static async deleteProduct (product_id) {
        const [rows] = await pool.execute(`UPDATE products SET active = false WHERE id = ?`, [product_id])
        return rows
    }

    static async getProductsBySeller(sellerId) {
        const query = 'SELECT * FROM products WHERE seller_id = ? AND active = TRUE'
        const [rows] = await pool.execute(query, [sellerId])
        return rows
    }

    static async getCategories() {
        const query = 'SELECT DISTINCT category FROM products WHERE active = TRUE'
        const [rows] = await pool.execute(query)
        return rows
    }

    static async getProductsByCategory(category) {
        const query = 'SELECT * FROM products WHERE category = ? AND active = TRUE'
        const [rows] = await pool.execute(query, [category])
        return rows
    }
}

export default ProductRepository