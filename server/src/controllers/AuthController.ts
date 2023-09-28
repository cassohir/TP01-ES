import express from 'express';
export const AuthRouter = express.Router();
import crypto from 'node:crypto';
import UserService from '../service/UserService';

const userService = new UserService();

AuthRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.info("Server - Authentication - Login")
    
    const isValidUser = await userService.userExists(email as string, password as string);
    if (!isValidUser) {
      return res.status(401).json({
        message: 'Acesso não autorizado!',
        status: 'error'
      });
    }


    const randomRash = crypto.randomBytes(16).toString('hex');
    return res.status(401).json({
        message: 'Usuário Autenticado',
        status: 'success',
        token: randomRash
      });

  } catch (error) {
    console.error('Erro ao processar a rota de Login:', error);
    res.status(500).json({
      message: 'Ocorreu um erro ao processar a rota de Login',
      status: 'error'
    });
  }
});