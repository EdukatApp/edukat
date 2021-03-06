import toUpperCase from '~/utils/toUpperCase';

import BadRequestException from './BadRequestException';

export default class InvalidCredentialsException extends BadRequestException {
  constructor(credential: string) {
    super(`${credential} mismatch`, `INVALID_${toUpperCase(credential)}`);
  }
}
