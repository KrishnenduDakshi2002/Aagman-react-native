export const QUERY_INITIAL_STATE = {
    id:"#3123234",
    question : "",
    description :"",
    author : "User#6222",
    postDate :"",
    likes :"0",
    tags :[],
    answers :[]
};

export const POST_QUERY_ACTION_TYPE ={
    ID: "ID",
    QUESTION : "QUESTION",
    DESCRIPTION : "DESCRIPTION",
    TAG : "TAG",
    POSTDATE : "POSTDATE",
    LIKES : "LIKES",
    ANSWER : "ANSWER",
    CLEAR : "CLEAR",
    CLEAR_TAG : "CLEAR_TAG"

}

export const PostQueryReducer = (state,action)=>{
    switch(action.type){
        case POST_QUERY_ACTION_TYPE.QUESTION:
            return {
                ...state,
                question : action.payload
            }
        case POST_QUERY_ACTION_TYPE.ID:
            return {
                ...state,
                id : action.payload
            }
        case POST_QUERY_ACTION_TYPE.DESCRIPTION:
            return {
                ...state,
                description : action.payload
            }
        case POST_QUERY_ACTION_TYPE.POSTDATE:
            return {
                ...state,
                postDate : action.payload.postDate,
            }
        case POST_QUERY_ACTION_TYPE.TAG:
            return {
                ...state,
                tags : [...state.tags,action.payload]
            }
        case POST_QUERY_ACTION_TYPE.LIKES:
            return{
                ...state, likes : action.payload
            }

        case POST_QUERY_ACTION_TYPE.ANSWER:
            return{
                ...state,
                answers : [...state.answers,action.payload]
            }
        case POST_QUERY_ACTION_TYPE.CLEAR:
            return QUERY_INITIAL_STATE;
        case POST_QUERY_ACTION_TYPE.CLEAR_TAG:
            return{
                ...state,
                tags : state.tags.filter(val => val !== action.payload)
            }
        default : 
            return state;
    }
}