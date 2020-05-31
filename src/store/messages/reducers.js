import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESSS,
  FETCH_MESSAGE_FAILED,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESSS,
  SEND_MESSAGE_FAILED,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESSS,
  EDIT_MESSAGE_FAILED,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESSS,
  DELETE_MESSAGE_FAILED,
} from "./actionTypes";

const initialState = {
  loading: false,
  messages: [],
  error: "",
};

// {
//       id:'',
//       conversation_id: '',
//       sender_id: '',
//       message_body: '',
//       created_at: new Date(Date.now()),
//       updated_at: new Date(Date.now()),
//       sent: false,
//       delivered: false,
//       read_by: []  containers {user_id: Number, read_date: Date}
//   }

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MESSAGE_SUCCESSS:
      return {
        loading: false,
        messages: action.payload,
        error: "",
      };
    case FETCH_MESSAGE_FAILED:
      return {
        loading: false,
        messages: [],
        error: action.payload,
      };
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESSS:
      return {
        loading: false,
        messages: action.payload,
        error: "",
      };
    case SEND_MESSAGE_FAILED:
      return {
        loading: false,
        messages: [],
        error: action.payload,
      };
    case EDIT_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_MESSAGE_SUCCESSS:
      return {
        loading: false,
        messages: action.payload,
        error: "",
      };
    case EDIT_MESSAGE_FAILED:
      return {
        loading: false,
        messages: [],
        error: action.payload,
      };
    case DELETE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MESSAGE_SUCCESSS:
      return {
        loading: false,
        messages: action.payload,
        error: "",
      };
    case DELETE_MESSAGE_FAILED:
      return {
        loading: false,
        messages: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
