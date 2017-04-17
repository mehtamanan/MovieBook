import { Actions } from 'react-native-router-flux';
import { urls, params } from '../utils';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_AUTH,
  SET_AUTH_DETAILS,
  SET_CREDENTIALS,
  RESET_TOKEN,
  LOG_OUT
} from '../utils/types';

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    getToken({ username, password })
    .then(response => response.json())
    .then(data => {
      const { token_response, non_field_errors } = params;
      if (data[token_response] !== undefined) {
        loginUserSuccess(dispatch, { token: data[token_response], username, password });
      } else {
        loginUserFail(dispatch, data[non_field_errors][0]);
      }
    });
  }
}

const loginUserSuccess = (dispatch, { username, password, token }) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
  dispatch({ type: SET_CREDENTIALS, payload: { username, password } });
  getSelfDetails(dispatch, { username, password, token })
  Actions.home();
};

const loginUserFail = (dispatch, errors) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: errors });
};

export const getSelfDetails = (dispatch, { username, password, token }) => {
  testfunc(dispatch, requestUserDetails, setAuthDetails, { username, password, token });
}

// export const getSelfDetails = (dispatch, { username, password, token }) => {
//   requestUserDetails({ token })
//   .then(response => {
//     if (response.ok) {
//       response.json()
//       .then(data => {
//         setAuthDetails(dispatch, data);
//       })
//     } else {
//       getToken({ username, password })
//       .then(tokenresponse => {
//         if (tokenresponse.ok) {
//           tokenresponse.json()
//           .then(tokendata => {
//             const { token_response } = params;
//             dispatch({ type: RESET_TOKEN, payload: tokendata[token_response] });
//             requestUserDetails({ token: tokendata[token_response] })
//             .then(userresponse => userresponse.json())
//             .then(userdata => {
//               setAuthDetails(dispatch, userdata);
//             })
//           })
//         } else {
//           logout();
//         }
//       })
//     }
//   })
// }

// export const getSelfDetails = (dispatch, { username, password, token }) => {
//   requestUserDetails({ token })
//   .then(response => { console.log(response); return response.json(); })
//   .then(data => {
//     console.log('data received');
//     console.log(data);
//     const { id, detail, signature_expired } = params;
//     if (data[id] !== undefined) {
//       setAuthDetails(dispatch, data);
//     } else if (data[detail] === signature_expired) {
//       getToken({ username, password })
//       .then(tokenresponse => tokenresponse.json())
//       .then(tokendata => {
//         const { token_response } = params;
//         if (tokendata[token_response] !== undefined) {
//           dispatch({ type: RESET_TOKEN, payload: tokendata[token_response] });
//           requestUserDetails({ token: tokendata[token_response] })
//           .then(userresponse => userresponse.json())
//           .then(userdata => {
//             setAuthDetails(dispatch, userdata);
//           })
//         } else {
//           logout();
//         }
//       })
//     } else {
//       logout();
//     }
//   })
// }

export const testfunc = (dispatch, requestFunc, storeFunc, { username, password, token }) => {
  requestFunc({ token })
  .then(response => {
    if (response.ok) {
      response.json()
      .then(data => {
        storeFunc(dispatch, data);
      })
    } else {
      getToken({ username, password })
      .then(tokenresponse => {
        if (tokenresponse.ok) {
          tokenresponse.json()
          .then(tokendata => {
            const { token_response } = params;
            dispatch({ type: RESET_TOKEN, payload: tokendata[token_response] });
            requestFunc({ token: tokendata[token_response] })
            .then(userresponse => userresponse.json())
            .then(userdata => {
              storeFunc(dispatch, userdata);
            })
          })
        } else {
          logout();
        }
      })
    }
  })
}

const setAuthDetails = (dispatch, data) => {
  const { first_name, last_name, email, id } = params;
  dispatch({
    type: SET_AUTH_DETAILS,
    payload: {
      id: data[id],
      first_name: data[first_name],
      last_name: data[last_name],
      email: data[email]
    }
  });
}

const requestUserDetails = ({ token }) => {
  const requestParams = {
    method: 'GET',
    headers: { Authorization: params.token_request + token },
  }
  return fetch(urls.base_url + urls.self_user_details, requestParams) // eslint-disable-line
}

const getToken = ({ username, password }) => {
  const requestParams = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      [params.username]: username,
      [params.password]: password })
  }
  return fetch(urls.base_url + urls.token_auth, requestParams) // eslint-disable-line
}

export const clearAuth = () => {
  return { type: CLEAR_AUTH }
};

export const logout = () => {
  Actions.auth();
  return { type: LOG_OUT }
}
