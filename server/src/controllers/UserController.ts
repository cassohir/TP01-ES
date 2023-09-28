import express from 'express';
import UserService from '../service/UserService';
import { UserModelInterface } from '../models/UserModel';



export const UserRouter = express.Router();


// Tem que fazer a verificação se está autenticado ... 

const userService = new UserService();

UserRouter.post('/', async (req, res) => {
  try {
    const { email, password, name  } = req.body as UserModelInterface;
  
    const dbResponse = await userService.createUser({ email, password, name });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      status: 'success',
      data: dbResponse,
    });
  } catch (error) {
    console.error('Erro ao processar ', error);
    const errorMessage = error instanceof Error && error.message ? error.message : 'Ocorreu um erro ao processar a solicitação';

    res.status(400).json({
      message: errorMessage,
      status: 'error',
    });
  }
});
UserRouter.delete('/:id', async (req, res) => {
  try {
    
    const { id } = req.params;
  
    const dbResponse = await userService.deleteUser(id);

    res.status(201).json({
      message: 'Usuário deletado com sucesso!',
      status: 'success',
      data: dbResponse,
    });
  } catch (error) {
    console.error('Erro ao processar ', error);
    const errorMessage = error instanceof Error && error.message ? error.message : 'Ocorreu um erro ao processar a solicitação';

    res.status(400).json({
      message: errorMessage,
      status: 'error',
    });
  }
});
 
UserRouter.get('/', async (req, res) => {
  try {
    
  
    const dbResponse = await userService.findMany();

    res.status(201).json({
      message: 'Usuários encontrados com sucesso!',
      status: 'success',
      data: dbResponse,
    });
  } catch (error) {
    console.error('Erro ao processar ', error);
    const errorMessage = error instanceof Error && error.message ? error.message : 'Ocorreu um erro ao processar a solicitação';

    res.status(400).json({
      message: errorMessage,
      status: 'error',
    });
  }
});