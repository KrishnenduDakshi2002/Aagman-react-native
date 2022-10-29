export const INITIAL_STATE = {
  //status
  ongoing: false,
  upcoming: false,
  finished: false,
  //mode
  online: false,
  offline: false,
  //type
  hackathon: false,
  techfest: false,
  devfest: false,
  webinar: false,
  seminar: false,
  competition: false,
  recruitment: false,
};

export const EVENT_STATUS = ["ongoing","upcoming","finished"]
export const EVENT_MODE = ["online","offline"]
export const EVENT_TYPE = ["hackathon","techfest","devfest","webinar","seminar","competition","recruitment"]

export const ACTION_TYPES = {
  ONGOING: "ONGOING",
  UPCOMING: "UPCOMING",
  FINISHED: "FINISHED",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  HACKATHON: "HACKATHON",
  TECHFEST: "TECHFEST",
  DEVFEST: "DEVFEST",
  WEBINAR: "WEBINAR",
  SEMINAR: "SEMINAR",
  COMPETITION: "COMPETITION",
  RECRUITMENT: "RECRUITMENT",
};

export const CheckBoxReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ONGOING:
      return { ...state, ongoing: action.payload };
    case ACTION_TYPES.UPCOMING:
      return { ...state, upcoming: action.payload };
    case ACTION_TYPES.FINISHED:
      return { ...state, finished: action.payload};
    case ACTION_TYPES.ONLINE:
      return { ...state, online: action.payload};
    case ACTION_TYPES.OFFLINE:
      return { ...state, offline: action.payload};
    case ACTION_TYPES.HACKATHON:
      return { ...state, hackathon: action.payload};
    case ACTION_TYPES.TECHFEST:
      return { ...state, techfest: action.payload};
    case ACTION_TYPES.DEVFEST:
      return { ...state, devfest: action.payload};
    case ACTION_TYPES.WEBINAR:
      return { ...state, webinar: action.payload};
    case ACTION_TYPES.SEMINAR:
      return { ...state, seminar: action.payload};
    case ACTION_TYPES.COMPETITION:
      return { ...state, competition: action.payload};
      case ACTION_TYPES.RECRUITMENT:
        return { ...state, recruitment: action.payload};

    default:
      return state;
  }
};
