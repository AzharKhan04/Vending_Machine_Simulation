import ACTIONS from './Constants/actions';


let initialState = {

    productSelected: []

}

function appReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case ACTIONS.PRODUCT_SELECTED:
            let newProductSelected = [...state.productSelected]
            newProductSelected.push(action.payload)
            return {...state, productSelected: [...newProductSelected] }
            break;

        case ACTIONS.PRODUCT_UNSELECTED:
            let _newProductSelected = [...state.productSelected]
            let i = null
            _newProductSelected.some((ps, index) => {
                if (ps.id == action.payload.id) {
                    i = index
                }

            })

            console.log(i)
            _newProductSelected.splice(i, 1)
            console.log("hh", _newProductSelected)

            return {...state, productSelected: [..._newProductSelected] }


        default:
            return state;
    }
}

export default appReducer;