export const QUERY_INITIAL_STATE = {
    id:"#3123234",
    question : "",
    description :"",
    author : "User#6222",
    postDate :"",
    likes :"0",
    tags :["javascript"],
    answers :[]
};

export const POST_QUERY_ACTION_TYPE ={
    QUESTION : "QUESTION",
    DESCRIPTION : "DESCRIPTION",
    TAG : "TAG",
    POSTDATE : "POSTDATE",
    LIKES : "LIKES",
    ANSWER : "ANSWER",
    CLEAR : "CLEAR"

}

export const PostQueryReducer = (state,action)=>{
    switch(action.type){
        case POST_QUERY_ACTION_TYPE.QUESTION:
            return {
                ...state,
                question : action.payload
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
            return {
                ...state,
                question : "",
                description :"",
                postDate:"",
                likes:"",
                tags :[],
                answers :[]
            }

        default : 
            return state;
    }
}