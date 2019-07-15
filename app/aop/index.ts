import PassportIct from './passport';
import ValidateIct from './validate';

const passportIct = new PassportIct();
const validateIct = new ValidateIct();

const Passport = passportIct.getAop();
const Validate = validateIct.getAop();

export { Passport, Validate };
