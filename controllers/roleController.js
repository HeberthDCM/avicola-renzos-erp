const db = require('../config/db')

exports.index = async (req, res) => {

    try {

        const [roles] = await db.query(`
            SELECT * FROM roles
            ORDER BY id DESC
        `)

        res.render('roles/index', {
            user: req.session.user,
            roles
        })

    } catch (error) {

        console.log(error)

        res.send("Error cargando roles")

    }

}


exports.create = (req, res) => {

    res.render('roles/create', {
        user: req.session.user
    })

}


exports.store = async (req, res) => {

    try {

        const { name } = req.body

        await db.query(`
            INSERT INTO roles (name)
            VALUES (?)
        `,[name])

        res.redirect('/roles')

    } catch (error) {

        console.log(error)

        res.send("Error creando rol")

    }

}


exports.edit = async (req, res) => {

    try {

        const { id } = req.params

        const [rows] = await db.query(`
            SELECT * FROM roles WHERE id=?
        `,[id])

        res.render('roles/edit',{
            role: rows[0],
            user: req.session.user
        })

    } catch (error) {

        console.log(error)

    }

}


exports.update = async (req, res) => {

    try {

        const { id } = req.params
        const { name } = req.body

        await db.query(`
            UPDATE roles SET name=?
            WHERE id=?
        `,[name,id])

        res.redirect('/roles')

    } catch (error) {

        console.log(error)

    }

}


exports.delete = async (req, res) => {

    try {

        const { id } = req.params

        await db.query(`
            DELETE FROM roles
            WHERE id=?
        `,[id])

        res.redirect('/roles')

    } catch (error) {

        console.log(error)

    }

}