import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const emailRoutes = Router();

emailRoutes.post('/verify', createRequestHandler('VerifyEmail'));

export default emailRoutes;
