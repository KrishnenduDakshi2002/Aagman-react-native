export const POST_ANSWER_INITIAL_STATE = {
    answer : "",
    author : "User#4234",
    date : "",
}

export const POSTANSWER_ACTION_TYPES = {
    ANSWER : "ANSWER",
    DATE : "DATE",
    CLEAR : "CLEAR"
}

export function PostAnswerReducer(state,action) {
    switch(action.type){
        case POSTANSWER_ACTION_TYPES.ANSWER:
            return {
                ...state,
                answer : action.payload
            }
        case POSTANSWER_ACTION_TYPES.DATE:
            return{
                ...state,
                date : action.payload
            }
        case POSTANSWER_ACTION_TYPES.CLEAR:
            return POST_ANSWER_INITIAL_STATE

        default :
            return state
    }
}