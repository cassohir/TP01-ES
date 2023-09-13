import express from 'express';
export const AuthRouter = express.Router();
import crypto from 'crypto';

const userExists = async (email: string, password: string) => { 
  return false;
  /// A gente muda pra fazer a consulta no banco de dados e importa o método do repositorio....
}

AuthRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.info("Server - Authentication - Login")
    
    const isValidUser = await userExists(email as string, password as string);
    if (!isValidUser) {
      console.log('Acesso não autorizado!');
      return res.status(401).json({
        message: 'Acesso não autorizado!',
        status: 'error'
      });
    }


    const randomRash = crypto.randomBytes(16).toString('hex');
    res.json(randomRash);
  } catch (error) {
    console.error('Erro ao processar a rota de Login:', error);
    res.status(500).json({
      message: 'Ocorreu um erro ao processar a rota de Login',
      status: 'error'
    });
  }
});