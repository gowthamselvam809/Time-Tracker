import { selector } from 'recoil';
import { userName } from '../atoms/atom';

export const getUserName = selector({
    key: 'getUserName',
    get: ({ get }) => {
        return get(userName);
    },
});
