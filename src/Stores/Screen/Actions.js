import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    handleChangeScreenSize: ['height', 'width'],
});

export const ScreenTypes = Types;
export default Creators;
