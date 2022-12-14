import { atom } from "recoil";
import { recoilPersist} from "recoil-persist"

const { persistAtom } = recoilPersist();


export const loginState = atom({
    key : 'loginState',
    default: 'false',
    effects_UNSTABLE: [persistAtom],

});



export const userState = atom ({
    key : 'userState',
    default : '',
    effects_UNSTABLE: [persistAtom],

});

export const IdState = atom ({
    key : 'IdState',
    default : '',
    effects_UNSTABLE: [persistAtom],

}); 

export const modalState = atom ({
    key : 'modalState',
    default : false,
    effects_UNSTABLE: [persistAtom],

});

export const PostModalState = atom ({
    key : 'PostModalState',
    default : false,
    effects_UNSTABLE: [persistAtom],
});

export const ModifyModalState = atom ({
    key : 'ModifyModalState',
    default : false,
    effects_UNSTABLE: [persistAtom],
});

export const ChangePwModalState = atom ({
    key : 'ChangePwModalState',
    default : false,
    effects_UNSTABLE: [persistAtom],
});

export const postState = atom({
    key : 'postState',
    default : "",
    effects_UNSTABLE: [persistAtom],

});

export const reservationState = atom({
    key : 'reservationState',
    default : "",
    effects_UNSTABLE: [persistAtom],

});


 