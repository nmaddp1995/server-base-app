import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../model/UserModel';
import { JWT_SECRET, TOKEN_EXPIRED_TIME } from '../config/envConfig';
import auth from '../middleware/auth';

const router = Router();
router.post(
    '/signup',
    [
        check('username', 'Username can\'t be empty')
        .not()
        .isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            username,
            email,
            password
        } = req.body;
        try {
            const userInDB = await User.findOne({
                username
            });
            if (userInDB) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }
            
            const emailInDB = await User.findOne({
                email
            });
            if (emailInDB) {
                return res.status(400).json({
                    message: "Email has already used"
                })
            }
            
            const newUser = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);

            await newUser.save();
            const payload = {
                user: {
                    id: newUser.id
                }
            };
            jwt.sign(
                payload,
                JWT_SECRET,
                {
                    expiresIn: TOKEN_EXPIRED_TIME
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        username,
                        email
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Error when saving')
        }
    }
);

router.post(
    '/login',
    [
        check('username', 'Please enter a valid username').not().isEmpty(),
        check('password', 'Please enter a valid password').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { username, password } = req.body;
        try {
            const userInDB = await User.findOne({
                username
            })
            console.log('userInDB', userInDB);
            if (!userInDB) {
                return res.status(400).json({
                    message: 'Username or password is incorrect'
                })
            }
            const isMatchPass = await bcrypt.compare(password, userInDB.password);
            if (!isMatchPass) {
                return res.status(400).json({
                    message: 'Username or password is incorrect'
                })
            }
            const payload = {
                user: {
                    id: userInDB.id
                }
            };

            jwt.sign(
                payload,
                JWT_SECRET,
                {
                    expiresIn: TOKEN_EXPIRED_TIME
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token,
                        username
                    });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error when login"
            })
        }
    }
)

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            username: user.username,
            email: user.email
        });
    } catch (err) {
        res.send({ message: "Error when fetching user"});
    }
})

export default router;